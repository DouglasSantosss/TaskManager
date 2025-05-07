const { query } = require("./db_connect");

async function addSubtask(title, taskId, subtaskId) {
  const sql = "INSERT INTO subtask (title, task_id, subtask_id) VALUES (?, ?)";
  return query(sql, [title, taskId, subtaskId]);
}

module.exports = { addSubtask };
