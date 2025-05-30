const express = require('express');
const router = express.Router();
const db = require('../models/db_connect');

// REGISTER
router.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const username = `${firstName} ${lastName}`;

    const query = `
        INSERT INTO user (username, email, password, created_at)
        VALUES (?, ?, ?, NOW())
    `;

    db.query(query, [username, email, password], (err, result) => {
        if (err) {
            console.error('Registration error:', err);
            return res.status(500).json({ success: false, message: 'Registration failed' });
        }

        res.status(200).json({ success: true });
    });
});

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
  
      if (results.length > 0) {
        const user = results[0];
        return res.json({ success: true, user_id: user.user_id });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    });
  });
  
  

module.exports = router;
