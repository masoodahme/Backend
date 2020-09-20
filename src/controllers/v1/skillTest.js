const create = require('../create');
const SkillTest = require('../../models/SkillTest');
const SkillTestQuestion = require('../../models/SkillTestQuestion');
const validators = require('../../validators/skillTest');

module.exports = {
  postSkillTest: create(
    async (req, res) => {
      const { name, image, description } = req.body;

      const newSkillTest = new SkillTest({
        name,
        image,
        description,
      });

      const skillTest = await newSkillTest.save();

      res.json({ data: skillTest });
    },
    {
      validation: {
        validators: validators.postSkillTest,
        throwError: true,
      },
    },
  ),

  postSkillTestQuestion: create(
    async (req, res) => {
      const { testId } = req.params;
      const { question, options, correctIndex } = req.body;

      const newSkillTestQuestion = new SkillTestQuestion({
        question,
        options,
        correctIndex,
        testId,
      });

      const skillTestQuestion = await newSkillTestQuestion.save();

      res.json({ data: skillTestQuestion });
    },
    {
      validation: {
        validators: validators.postSkillTestQuestion,
        throwError: true,
      },
    },
  ),

  updateSkillTest: create(
    async (req, res) => {
      const { id } = req.params;
      const { name, image, description } = req.body;

      const skillTest = await SkillTest.findByIdAndUpdate(
        id,
        {
          name,
          image,
          description,
        },
        { new: true },
      );

      res.json({ data: skillTest });
    },
    {
      validation: {
        validators: validators.updateSkillTest,
        throwError: true,
      },
    },
  ),
};