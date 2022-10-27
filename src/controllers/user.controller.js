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

module.exports = {
  addUser,
  getAllUsers,
};