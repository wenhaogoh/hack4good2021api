const db = require("../../models/index.js");
const Choice = db.Choice;

async function getAllChoices(req, res, next) {
  try {
    const choices = await Choice.findAll();
    res.status(200).json(choices);
  } catch (e) {
    next(e);
  }
}

async function getChoice(req, res, next) {
  try {
    const choice = await Choice.findByPk(req.params.id);
    req.choice = choice;
    next();
  } catch (e) {
    next(e);
  }
}

async function createChoice(req, res, next) {
  try {
    let choice = req.body;
    if (choice.count < 0) {
      throw Error("Count must be more than 0.");
    }
    choice = await Choice.create(choice);
    req.choice = choice;
    next();
  } catch (e) {
    next(e);
  }
}

async function updateChoice(req, res, next) {
  try {
    if (req.body.count && req.body.count < 0) {
      throw Error("Count must be more than 0.");
    }
    const updatedChoice = await req.choice.update(req.body);
    req.choice = updatedChoice;
    next();
  } catch (e) {
    next(e);
  }
}

async function deleteChoice(req, res, next) {
  try {
    await req.choice.destroy();
    next();
  } catch (e) {
    next(e);
  }
}

async function showChoice(req, res, next) {
  try {
    res.status(200).json(req.choice);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAllChoicesFuncs: [getAllChoices],
  getChoiceFuncs: [getChoice, showChoice],
  createChoiceFuncs: [createChoice, showChoice],
  updateChoiceFuncs: [getChoice, updateChoice, showChoice],
  deleteChoiceFuncs: [getChoice, deleteChoice, showChoice],
};
