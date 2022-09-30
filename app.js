const express = require('express');

const { userRouter } = require('./Routes/user.routes');
const { taskRouter } = require('./Routes/task.routes');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use('/api/v1/tasks', taskRouter);

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method}${req.url} doesn't exist in your server`,
  });
});

module.exports = {
  app,
};
