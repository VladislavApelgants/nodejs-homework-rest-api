const { httpError } = require("../helpers");
const validateBody = (shema) => {
  return function (req, res, next) {
    if (!Object.keys(req.body).length) {
      next(httpError(400, "missing fields"));
    }
    const { error } = shema.validate(req.body);
    if (error) next(httpError(400, error.message));
    next();
  };
};

const validateBodyFavorite = (shema) => {
  return function (req, res, next) {
    if (!Object.keys(req.body).length) {
      next(httpError(400, "missing fields favorite"));
    }
    const { error } = shema.validate(req.body);
    if (error) next(httpError(400, error.message));
    next();
  };
};

module.exports = { validateBody, validateBodyFavorite };
