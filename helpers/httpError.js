const errorsMessageList = {
  400: "Bad request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const httpError = (status, messge = errorsMessageList[status]) => {
  const error = new Error(messge);
  error.status = status;
  return error;
};

module.exports = httpError;
