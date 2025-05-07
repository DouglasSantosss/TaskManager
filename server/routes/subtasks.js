const express = require("express");
const router = express.Router();
const db = require("../models/db_connect");


router.post('/', (req, res) => {
  const { title, task_id } = req.body;
  db.query(
    'INSERT INTO subtask (title, task_id, completed) VALUES (?, ?, ?)',
    [title, task_id, 0],
    (err, result) => {
      if (err) {
        console.error("Insert subtask error:", err);
        return res.status(500).json({ success: false, message: "DB insert failed" });
      }
      res.json({ success: true, subtask_id: result.insertId });
    }
  );
});

//subtasks by parent task ID to load subtasks under a task
router.get('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  db.query(
    'SELECT * FROM subtask WHERE task_id = ?', 
    [taskId],
    (err, rows) => {
      if (err) {
        console.error(`Error fetching subtasks for task ${taskId}:`, err);
        return res.status(500).json({ error: 'Failed to fetch subtasks' });
      }
      
      res.json(rows);
    }
  );
});

// UPDATE 
router.put('/:subtaskId', (req, res) => {
  const { title, completed } = req.body;
  const subtaskId = req.params.subtaskId;
  db.query(
    'UPDATE subtask SET title = ?, completed = ? WHERE subtask_id = ?',
    [title, completed || 0, subtaskId],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ success: true });
    }
  );
});

// DELETE 
router.delete('/:subtaskId', (req, res) => {
  const subtaskId = req.params.subtaskId;
  db.query(
    'DELETE FROM subtask WHERE subtask_id = ?',
    [subtaskId],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Delete failed' });
      res.json({ success: true });
    }
  );
});

module.exports = router;
