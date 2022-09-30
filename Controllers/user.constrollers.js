const { Task } = require('../Models/task.model');
const { User } = require('../Models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: { model: Task },
      where: { status: 'active' },
    });

    res.status(200).json({
      status: 'success',
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      password,
    });

    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { user } = req;

    await user.update({ status: 'deleted' });
    return res.status(200).json({
      status: 'success',
    });
  } catch (error) {}
};
module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
