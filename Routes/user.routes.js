const express = require('express');

const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../Controllers/user.constrollers');

const {userExist} = require('../Middlewares/user.middleware');

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.patch('/:id', userExist, updateUser);
userRouter.delete('/:id', userExist, deleteUser)

module.exports = {
  userRouter,
};
