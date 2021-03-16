const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const app = express();

const choices = require("./routes/choices.js");
const questions = require("./routes/questions.js");

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/choices", choices);
app.use("/questions", questions);

app.listen(port, () => console.log(`listening on port ${port}`));
