const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const userRoutes = require('./server/routes/user');
const taskRoutes = require('./server/routes/tasks');
const subtaskRoutes = require('./server/routes/subtasks');

app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/subtasks', subtaskRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
