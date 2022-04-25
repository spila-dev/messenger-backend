const JWT = require("jsonwebtoken");
const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");
const { getEnvironment } = require("~/functions/utilities/utilsNoDeps");

const initialOptions = initialValue.jwtOptions;

const tokenVerifier = async (
  token,
  secret = getEnvironment(ENVIRONMENT_KEYS.JWT_MAIN_SECRET),
  options = initialOptions
) => {
  try {
    const data = JWT.verify(token, secret, {
      complete: true,
      ...initialOptions,
      ...options,
    });

    return data;
  } catch (error) {
    logger.log("tokenVerifier catch, error:", error);
    return {
      error,
    };
  }
};

module.exports = { tokenVerifier };
