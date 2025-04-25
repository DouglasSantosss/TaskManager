const express = require("express");
const router = express.Router();
const { getAllTasks, addTask } = require("../models/tasks");

router
.get("/", async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
})

.post("/add", async (req, res) => {
  const task = req.body;
  await addTask(task);
  res.send("Task added successfully");
});

module.exports = router;
