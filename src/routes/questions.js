const express = require("express");
const router = express.Router();

const {
  getAllQuestionsFuncs,
  getQuestionFuncs,
  createQuestionFuncs,
  deleteQuestionFuncs,
} = require("../controllers/questionsController.js");

router.get("/", getAllQuestionsFuncs);
router.post("/", createQuestionFuncs);
router.get("/:id", getQuestionFuncs);
router.delete("/:id", deleteQuestionFuncs);

module.exports = router;
