const express = require("express");
const router = express.Router();
const { addSubtask } = require("../models/subtasks");

router.post("/add", async (req, res) => {
  const { title, taskId } = req.body;
  await addSubtask(title, taskId);
  res.send("Subtask added successfully");
});

module.exports = router;
