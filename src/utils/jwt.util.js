require('dotenv/config');
const jwt = require('jsonwebtoken');
const throwError = require('./throwError');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
  });

  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    throwError(401, 'Expired or invalid token');
  }
};

module.exports = {
  createToken,
  validateToken,
};