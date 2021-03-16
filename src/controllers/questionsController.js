const db = require("../../models/index.js");
const Question = db.Question;
const Choice = db.Choice;

async function getAllQuestions(req, res, next) {
  try {
    const questions = await Question.findAll();
    const questionIds = questions.map((question) => question.id);
    res.status(200).json(questionIds);
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
  deleteQuestionFuncs: [getQuestion, deleteQuestion, showQuestion],
};
