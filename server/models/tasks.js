const { query } = require("./db_connect");

async function getAllTasks() {
  const sql = "SELECT * FROM tasks ORDER BY id DESC";
  return query(sql);

}

async function addTask(task) {
  const sql = `INSERT INTO task (name, description, status) VALUES (?, ?, ?)`;
  const params = [task_id, description];
  return query(sql, params);
}

module.exports = { getAllTasks, addTask };
