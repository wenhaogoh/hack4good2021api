const db = require("../../models/index.js");
const Question = db.Question;
const Choice = db.Choice;

async function getAllQuestions(req, res, next) {
  try {
    const questions = await Question.findAll({
      include: [
        {
          model: Choice,
        },
      ],
    });
    res.status(200).json(questions);
  } catch (e) {
    next(e);
  }
}

async function getQuestion(req, res, next) {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [
        {
          model: Choice,
        },
      ],
    });
    req.question = question;
    next();
  } catch (e) {
    next(e);
  }
}

async function createQuestion(req, res, next) {
  try {
    const question = await Question.create(req.body);
    req.question = question;
    next();
  } catch (e) {
    next(e);
  }
}

async function updateQuestion(req, res, next) {
  try {
    const updatedQuestion = await req.question.update(req.body);
    req.question = updatedQuestion;
    next();
  } catch (e) {
    next(e);
  }
}

async function deleteQuestion(req, res, next) {
  try {
    await req.question.destroy();
    next();
  } catch (e) {
    next(e);
  }
}

async function showQuestion(req, res, next) {
  try {
    res.status(200).json(req.question);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllQuestionsFuncs: [getAllQuestions],
  getQuestionFuncs: [getQuestion, showQuestion],
  createQuestionFuncs: [createQuestion, showQuestion],
  updateQuestionFuncs: [getQuestion, updateQuestion, showQuestion],
  deleteQuestionFuncs: [getQuestion, deleteQuestion, showQuestion],
};
