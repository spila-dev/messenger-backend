const { errorCollector } = require("@/functions/helpers/errorCollector");
const { errorResponser } = require("@/functions/helpers/errorResponser");

const responseErrorHandlersMiddleware = (_, res, next) => {
  res.errors = {
    errors: {},
    statusCode: 500,
  };

  res.errorCollector = (errorObject) => {
    errorCollector(res, errorObject);
  };
  res.errorResponser = () => {
    errorResponser(res);
  };

  next();
};

module.exports = { responseErrorHandlersMiddleware };
