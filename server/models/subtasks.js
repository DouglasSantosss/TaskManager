const { query } = require("./db_connect");

async function addSubtask(title, taskId) {
  const sql = "INSERT INTO subtasks (title, task_id) VALUES (?, ?)";
  return await query(sql, [title, taskId]);
}

module.exports = { addSubtask };
