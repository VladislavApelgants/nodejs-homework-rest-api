const httpError = (status, messge) => {
  const error = new Error(messge);
  error.status = status;
  return error;
};

module.exports = httpError;
