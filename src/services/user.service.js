const { User } = require('../models');
const { validateUser } = require('./validations/valuesValidation');
const { createToken } = require('../utils/jwt.util');
const throwError = require('../utils/throwError');

const generateUserToken = (user) => {
  const { password, ...userWithoutPassword } = user;
  return createToken(userWithoutPassword);
};

const addUser = async (userInfo) => {
  const error = validateUser(userInfo);
  if (error) throwError(400, error.message);

  const user = await User.findOne({ where: { email: userInfo.email } });
  if (user) throwError(409, 'User already registered');

  const userData = await User.create(userInfo);
  return userData.dataValues;
};

module.exports = {
  generateUserToken,
  addUser,
};