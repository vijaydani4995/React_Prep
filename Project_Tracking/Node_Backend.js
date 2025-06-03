// server.js
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorHandler');
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* config/db.js */
// create a connection pool using mysql2/promise
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'project_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
module.exports = pool;

/* models/User.js */
const pool = require('../config/db');

const User = {
  async create({ name, email, password, role }) {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role]
    );
    return { id: result.insertId, name, email, role };
  },

  async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  }
};
module.exports = User;

/* models/Project.js */
const pool = require('../config/db');

const Project = {
  async create({ name, description, created_by }) {
    const [result] = await pool.execute(
      'INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)',
      [name, description, created_by]
    );
    return { id: result.insertId, name, description, created_by };
  },

  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM projects');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
  }
};
module.exports = Project;

/* models/Task.js */
const pool = require('../config/db');

const Task = {
  async create({ project_id, title, description, status, priority, assignee_id, due_date, created_by }) {
    const [result] = await pool.execute(
      `INSERT INTO tasks 
       (project_id, title, description, status, priority, assignee_id, due_date, created_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [project_id, title, description, status, priority, assignee_id, due_date, created_by]
    );
    return { id: result.insertId, project_id, title, description, status, priority, assignee_id, due_date, created_by };
  },

  async findByProject(project_id) {
    const [rows] = await pool.execute('SELECT * FROM tasks WHERE project_id = ?', [project_id]);
    return rows;
  },

  async updateStatus(id, status) {
    await pool.execute('UPDATE tasks SET status = ? WHERE id = ?', [status, id]);
  }
};
module.exports = Task;

/* controllers/authController.js */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/* controllers/projectController.js */
const Project = require('../models/Project');

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      created_by: req.user.id
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    next(err);
  }
};

/* controllers/taskController.js */
const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      created_by: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasksByProject = async (req, res, next) => {
  try {
    const tasks = await Task.findByProject(req.query.projectId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

/* routes/authRoutes.js */
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;

/* routes/projectRoutes.js */
const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/')
  .get(getProjects)
  .post(createProject);
router.get('/:id', getProjectById);

module.exports = router;

/* routes/taskRoutes.js */
const express = require('express');
const router = express.Router();
const { createTask, getTasksByProject } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.route('/')
  .get(getTasksByProject)
  .post(createTask);

module.exports = router;

/* middleware/authMiddleware.js */
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

/* middleware/errorHandler.js */
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
};
