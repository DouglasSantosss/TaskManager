const { query } = require("./db_connect")

async function createTable() {
  const sql = `
    CREATE TABLE user (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;
  query(sql);
}

async function getAllUsers() {
  const sql = "SELECT * FROM users ORDER BY id ASC";
  return query(sql);
}

async function register(user) {
  const sql = `INSERT INTO users (firstName, lastName, email, password)
  VALUES (?, ?, ?, ?)`;
  const params = [user.firstName, user.lastName, user.email, user.password];
  query(sql, params);
}

async function login(email, password) {
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const results = query(sql, [email, password]);
  return results[0];
}

module.exports = {
  createTable,
  getAllUsers,
  register,
  login,
};

