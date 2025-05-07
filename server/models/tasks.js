const { query } = require("./db_connect");

async function getAllTasks() {
<<<<<<< HEAD
  const sql = "SELECT * FROM tasks ORDER BY id DESC";
  return query(sql);
=======
  const sql = "SELECT * FROM tasks";
  return await query(sql);
>>>>>>> 62b1e76cc53312b987c73e06299bed531cf55b8e
}

async function addTask(task) {
  const sql = `INSERT INTO task (name, description, status) VALUES (?, ?, ?)`;
  const params = [task_id, description];
  return query(sql, params);
}

module.exports = { getAllTasks, addTask };
