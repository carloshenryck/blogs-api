const userService = require('../services/user.service');

const addUser = async (req, res, next) => {
  try {
    await userService.addUser(req.body);
    const token = userService.generateUserToken(req.body);
    console.log(req.body);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
};