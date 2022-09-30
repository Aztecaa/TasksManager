const { Task } = require('../Models/task.model');
const { User } = require('../Models/user.model');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = Task.findAll({
      attributes: ['id', 'userId', 'title', 'limitDate', 'startDate', 'finishDate', 'status'],
      include: { model: User, attributes: ['id', 'name', 'email', 'status'] },
    });
    res.status(200).json({
      status: 'success',
      data: { tasks },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTaskByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const string = status.toLowerCase();
    const statusValue = ['active', 'completed', 'late', 'cancelled'];

    if (statusValue.includes(string)) {
      const tasksByStatus = Task.findAll({
        attributes: ['id', 'userId', 'title', 'limitDate', 'startDate', 'finishDate', 'status'],
        include: { model: User },
        where: { status },
      });
      if (!tasksByStatus) {
        return res.status(404).json({
          status: 'error',
          message: 'Status task doesnt exist',
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          tasksByStatus,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Status task doesnt exist',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;

    const newTask = await Task.create({
      title,
      userId,
      startDate,
      limitDate,
    });

    res.status(201).json({
      status: 'success',
      data: {
        newTask,
      },
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

const updateTaskDate = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task } = req;

    await task.update({ finishDate });
    if (task.limitDate >= task.finishDate) {
      await task.update({ status: 'completed' });
    } else if (task.limitDate < task.finishDate) {
      await task.update({ status: 'late' });
    }
    res.status(200).json({
      status: 'success',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req,res) => {
  try {
    const {task} = req
    await task.update({status: 'cancelled'})
    res.status(200).json({
      status: 'success'
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllTasks,
  getTaskByStatus,
  createTask,
  updateTaskDate,
  deleteTask
};
