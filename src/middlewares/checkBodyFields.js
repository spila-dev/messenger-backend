const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { errorThrower } = require("utility-store/src/functions/utilities");
const {
  ioFieldsChecker,
} = require("utility-store/src/functions/ioFieldsChecker");
const { trier } = require("utility-store/src/classes/Trier");

const { appConfigs } = require("@/classes/AppConfigs");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { errors } = require("@/variables/errors");

const tryToCheckBodyFields = (body, inputFields) => {
  errorThrower(
    customTypeof.isUndefined(body),
    errors.REQUEST_BODY_IS_UNDEFINED
  );

  const checkResult = ioFieldsChecker(body, inputFields, errors.IO.input);

  const configs = appConfigs.getConfigs();
  const checkResultErrorReason = checkResult.errorObject?.reason;
  const inputDataWrongTypeErrorReason = errors.INPUT_FIELD_TYPE_WRONG.reason;

  if (
    configs.server.shouldIgnoreInputFieldWrongTypeError &&
    inputDataWrongTypeErrorReason === checkResultErrorReason
  ) {
    return { ok: true };
  }

  errorThrower(checkResult.ok === false, () => ({
    ...checkResult.errorObject,
    inputFields,
    inputData: body,
  }));

  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchCheckBodyFields = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

const checkBodyFields = (req, res, next) => {
  const {
    body,
    routeObject: { inputFields },
  } = req;

  return trier(checkBodyFields.name)
    .try(tryToCheckBodyFields, body, inputFields)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckBodyFields, res)
    .result();
};

module.exports = { checkBodyFields };
