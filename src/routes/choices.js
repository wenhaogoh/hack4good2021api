const express = require("express");
const router = express.Router();
const db = require("../../models/index.js");
const {
  getAllChoicesFuncs,
  getChoiceFuncs,
  createChoiceFuncs,
  deleteChoiceFuncs,
  updateChoiceFuncs,
} = require("../controllers/choicesController.js");

router.get("/", getAllChoicesFuncs);
router.post("/", createChoiceFuncs);
router.get("/:id", getChoiceFuncs);
router.put("/:id", updateChoiceFuncs);
router.delete("/:id", deleteChoiceFuncs);

module.exports = router;
