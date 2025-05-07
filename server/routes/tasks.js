const db = require('../models/db_connect');
const express = require("express");
const router = express.Router();
const { getAllTasks} = require("../models/tasks");

router
.get("/", async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
})

router.post('/', async (req, res) => {
  try {
    const { title, description, status, user_id } = req.body;
    const created_at = new Date();

    db.query(
      'INSERT INTO task (title, description, status, user_id, created_at) VALUES (?, ?, ?, ?, ?)',
      [title, description, status, user_id, created_at],
      (err, results) => {
        if (err) {
          console.error("Insert error:", err.sqlMessage);
          return res.status(500).json({ success: false, message: "DB Insert failed" });
        }

        
        res.json({ success: true, message: "Task created", task_id: results.insertId });
      }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});






router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM task WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
    }
    res.json(results);
  });
});

// UPDATE 
router.put('/:taskId', (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.taskId;
  db.query(
    'UPDATE task SET title = ?, description = ?, status = ? WHERE task_id = ?',
    [title, description, status, taskId],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ success: true });
    }
  );
});

// DELETE
router.delete('/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  db.query(
    'DELETE FROM task WHERE task_id = ?',
    [taskId],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Delete failed' });
      res.json({ success: true });
    }
  );
});


module.exports = router;
