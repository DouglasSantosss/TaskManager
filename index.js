const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection configuration
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO USER (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, results) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'User registered successfully!', userId: results.insertId });
  });
});

// Login endpoint (simplified version)
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM USER WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful!', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Endpoint to create a new task
app.post('/add-task', (req, res) => {
  const { user_id, title, description, status } = req.body;
  const sql = 'INSERT INTO TASK (user_id, title, description, status) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, title, description, status], (err, results) => {
    if (err) {
      console.error('Add task error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json({ message: 'Task created successfully!', taskId: results.insertId });
  });
});

// Endpoint to get tasks for a specific user
app.get('/tasks/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const sql = 'SELECT * FROM TASK WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Get tasks error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
