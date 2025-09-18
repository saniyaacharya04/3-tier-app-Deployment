// backend/models/task.js
const pool = require('../db');

const Task = {
  create: async (task) => {
    const [result] = await pool.query('INSERT INTO tasks (task, completed) VALUES (?, ?)', [task.task, task.completed || false]);
    return { id: result.insertId, ...task };
  },

  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
  },

  update: async (id, task) => {
    await pool.query('UPDATE tasks SET task = ?, completed = ? WHERE id = ?', [task.task, task.completed, id]);
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },

  delete: async (id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = Task;
