const { User } = require('../Models/user.model');
const { Task } = require('../Models/task.model');

const initModels = () => {
  User.hasMany(Task, { foreignKey: 'userId' });
  Task.belongsTo(User);
};

module.exports = {
  initModels,
};
