const throwError = (status, message = undefined) => {
  const e = new Error(message);
  e.status = status;
  throw e;
};

module.exports = throwError;