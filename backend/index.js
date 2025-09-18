const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tasks = require('./routes/tasks');
const users = require('./routes/users');

require('./config/db'); // initialize DB connection

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Backend is running ✅'));

app.get('/ok', (req, res) => res.send('ok'));

app.use('/api/tasks', tasks);
app.use('/api/users', users);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Backend listening on port ${port}...`));
