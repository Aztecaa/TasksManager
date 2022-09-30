const express = require('express');

const {
  getAllTasks,
  createTask,
  getTaskByStatus,
  updateTaskDate,
  deleteTask,
} = require('../Controllers/task.controllers');

const { taskExist } = require('../Middlewares/task.middleware');

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:status', getTaskByStatus);
taskRouter.post('/', createTask);
taskRouter.patch('/:id', taskExist, updateTaskDate);
taskRouter.delete('/:id', taskExist, deleteTask);

module.exports = {
  taskRouter,
};
