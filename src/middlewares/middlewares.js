const { notFound } = require("@/middlewares/notFound");
const {
  applyMiddlewaresByUrl,
} = require("@/middlewares/applyMiddlewaresByUrl");
const { authDefault } = require("@/middlewares/authDefault");
const {
  cellphoneSelfStuffCheck,
} = require("@/middlewares/cellphoneSelfStuffCheck");
const { cellphoneValidator } = require("@/middlewares/cellphoneValidator");
const { checkBodyFields } = require("@/middlewares/checkBodyFields");
const { checkDataAndResponse } = require("@/middlewares/checkDataAndResponse");
const { contactValidator } = require("@/middlewares/contactValidator");
const {
  findCurrentUserFromDb,
} = require("@/middlewares/findCurrentUserFromDb");
const { findRouteObject } = require("@/middlewares/findRouteObject");
const {
  ignoreMiddlewaresByUrl,
} = require("@/middlewares/ignoreMiddlewaresByUrl");
const { requestDetailsLogger } = require("@/middlewares/requestDetailsLogger");
const { requestMethodChecker } = require("@/middlewares/requestMethodChecker");
const {
  responseErrorHandlers,
} = require("@/middlewares/responseErrorHandlers");
const { sendJsonResponse } = require("@/middlewares/sendJsonResponse");
const {
  targetUserFinderByCellphone,
} = require("@/middlewares/targetUserFinderByCellphone");
const {
  verificationCodeValidator,
} = require("@/middlewares/verificationCodeValidator");
const {
  verifyVerificationCode,
} = require("@/middlewares/verifyVerificationCode");

const middlewares = {
  applyMiddlewaresByUrl,
  authDefault,
  cellphoneSelfStuffCheck,
  cellphoneValidator,
  checkBodyFields,
  checkDataAndResponse,
  contactValidator,
  findCurrentUserFromDb,
  findRouteObject,
  ignoreMiddlewaresByUrl,
  notFound,
  requestDetailsLogger,
  requestMethodChecker,
  responseErrorHandlers,
  sendJsonResponse,
  targetUserFinderByCellphone,
  verificationCodeValidator,
  verifyVerificationCode,
};

module.exports = { middlewares };
