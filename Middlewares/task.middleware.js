const { Task } = require('../Models/task.model');

const taskExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: [{ id }, { status: 'active' }] });
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'task not found',
      });
    }
    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  taskExist,
};
