const {
  checkApplyIgnoreMiddlewareStartupConditions,
  executeMiddlewares,
  isUrlMatchWithReqUrl,
} = require("@/functions/utilities/utilities");

const applyMiddlewaresByUrlMiddleware = (url, ...middlewares) => {
  checkApplyIgnoreMiddlewareStartupConditions(url, middlewares);

  return async (req, res, next) => {
    if (isUrlMatchWithReqUrl(url, req.url)) {
      return await executeMiddlewares({
        middlewares,
        next,
        req,
        res,
      });
    }

    next();
  };
};

module.exports = { applyMiddlewaresByUrlMiddleware };
