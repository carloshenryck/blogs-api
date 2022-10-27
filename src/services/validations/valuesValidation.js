const { userSchema, loginSchema } = require('./schemas');

const validateUser = (userInfo) => {
  const { error } = userSchema.validate(userInfo);
  if (error) return error;
  return null;
};

const validateLogin = (loginInfo) => {
  const { error } = loginSchema.validate(loginInfo);
  if (error) return error;
  return null;
};

module.exports = {
  validateUser,
  validateLogin,
};