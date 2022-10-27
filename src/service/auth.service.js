const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');
const { User } = require('../models');

const BAD_REQUEST = 400;

const validateBody = (params) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error, value } = schema.validate(params);
  const conditions = ['required', 'empty'];

  // caso a menssagem do erro contenha as palavras required ou empty, então a mensagem irá ser trocada
  if (error && conditions.some((condition) => error.message.includes(condition))) {
   const e = new Error('Some required fields are missing');
   e.status = BAD_REQUEST;
   throw e;
  }

  if (error) {
    const e = new Error(error.message);
    e.status = BAD_REQUEST;
    throw e;
  }
  
  return value;
};

const validateLogin = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    const e = new Error('Invalid fields');
    e.status = BAD_REQUEST;
    throw e;
  }

  const { password: ps, ...userWithoutPassword } = user.dataValues;

  const token = jwtUtil.createToken(userWithoutPassword);

  return token;
};

module.exports = {
  validateBody,
  validateLogin,
};