// backend/index.js
const express = require('express');
const cors = require('cors');
const tasks = require('./routes/tasks');

require('./db'); // initialize DB connection

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ok', (req, res) => res.send('ok'));

app.use('/api/tasks', tasks);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
