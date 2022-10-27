const jwtUtil = require('../utils/jwt.util');
const { User } = require('../models');
const throwError = require('../utils/throwError');
const { validateLogin: validateLoginData } = require('./validations/valuesValidation');

const BAD_REQUEST = 400;

const validateBody = (params) => {
  const error = validateLoginData(params);
  const conditions = ['required', 'empty'];

  // caso a menssagem do erro contenha as palavras required ou empty, então a mensagem irá ser trocada
  if (error && conditions.some((condition) => error.message.includes(condition))) {
   throwError(BAD_REQUEST, 'Some required fields are missing');
  }
  if (error) throwError(BAD_REQUEST, error.message);

  return params;
};

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) throwError(BAD_REQUEST, 'Invalid fields');
  const { password: ps, ...userWithoutPassword } = user.dataValues;
  const token = jwtUtil.createToken(userWithoutPassword);
  return token;
};

module.exports = {
  validateBody,
  validateLogin,
};