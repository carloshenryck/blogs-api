const authService = require('../services/auth.service');

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  try {
    const user = authService.validateToken(authorization);
    req.user = user;
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = validateToken;