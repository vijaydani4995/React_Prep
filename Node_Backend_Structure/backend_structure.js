// server.js
const app = require('./app');
const { connectDB } = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/checklists', checklistRoutes);

app.use(errorHandler);

module.exports = app;


// config/db.js
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let connection;

function connectDB() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error('MySQL connection failed:', err);
    } else {
      console.log('Connected to MySQL DB');
    }
  });
}

function getConnection() {
  return connection;
}

module.exports = { connectDB, getConnection };


// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;


// controllers/userController.js
const { getConnection } = require('../config/db');

const getUsers = (req, res) => {
  const conn = getConnection();
  conn.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB Error' });
    res.json(results);
  });
};

const createUser = (req, res) => {
  const conn = getConnection();
  const { name, email } = req.body;
  conn.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert Failed' });
    res.status(201).json({ message: 'User created' });
  });
};

module.exports = { getUsers, createUser };


// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
};


// .env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=testdb


// Directory Structure:
// backend/
// ├── config/
// │   └── db.js
// ├── controllers/
// │   └── userController.js
// ├── middleware/
// │   └── errorHandler.js
// ├── models/          // (Empty or can add userModel.js)
// ├── routes/
// │   └── userRoutes.js
// ├── uploads/         // (Empty initially)
// ├── utils/           // (Empty or add helper functions)
// ├── app.js
// ├── server.js
// └── .env
