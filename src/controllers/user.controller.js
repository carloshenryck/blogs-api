const userService = require('../services/user.service');

const addUser = async (req, res, next) => {
  try {
    await userService.addUser(req.body);
    const token = userService.generateUserToken(req.body);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req, res) => {
  const users = await userService.getAllUsers();
  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await userService.deleteUser(id);
  res.status(204).json();
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUser,
};