const { query } = require("./db_connect");

async function getAllTasks() {
  const sql = "SELECT * FROM tasks ORDER BY id DESC";
  return await query(sql);
}

async function addTask(task) {
  const sql = `INSERT INTO tasks (name, description, status) VALUES (?, ?, ?)`;
  const params = [task.name, task.description, task.status];
  return await query(sql, params);
}

module.exports = { getAllTasks, addTask };
