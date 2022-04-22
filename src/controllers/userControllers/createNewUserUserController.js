const { randomId } = require("~/functions/utilities/randomId");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");
const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");
const { clients } = require("~/functions/tools/Clients");
const {
  getEnvironment,
  getCellphone,
  getErrorObject,
} = require("~/functions/utilities/utilsNoDeps");
const {
  errorThrower,
  getTokenFromRequest,
} = require("~/functions/utilities/utils");

const {
  firstNameValidator,
} = require("~/validators/userValidators/firstNameValidator");
const {
  lastNameValidator,
} = require("~/validators/userValidators/lastNameValidator");

const { UserMongoModel } = require("~/models/userModels/userMongoModel");
const { commonModel } = require("~/models/commonModels/commonModel");
const {
  userFinder,
  createNewNormalUser,
  updateUserDataByPrivateId,
} = require("~/models/userModels/userModelFunctions");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: { TOKEN_REQUIRED, USER_NOT_EXIST, FULL_NAME_INVALID },
  },
} = require("~/variables/errors/userErrors");
const {
  userRoutes: {
    properties: { createNewUserRoute },
  },
} = require("~/variables/routes/userRoutes");

const createNewUserUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName },
    } = req;

    const verifyToken = getTokenFromRequest(req);
    errorThrower(!verifyToken, TOKEN_REQUIRED);

    const tokenData = await tokenVerifier(
      verifyToken,
      getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET)
    );

    const validatedFirstName = firstNameValidator({ firstName });
    const validatedLastName = lastNameValidator({ lastName });
    errorThrower(
      validatedFirstName !== true || validatedLastName !== true,
      () => {
        const { statusCode, ...error } = getErrorObject(FULL_NAME_INVALID);
        return {
          fullNameValidation: {
            ...error,
            validatedFullName: { validatedFirstName, validatedLastName },
          },
          statusCode,
        };
      }
    );

    const cellphone = getCellphone(tokenData.payload);
    const client = clients.findClient(cellphone);
    errorThrower(!client, USER_NOT_EXIST);

    const user = await userFinder(cellphone);

    if (user) {
      await updateUserDataByPrivateId({
        tokens: user.token,
        firstName,
        lastName,
        privateId: user.privateId,
      });

      res.sendJsonResponse(createNewUserRoute, {
        user: {
          ...sendableUserData(user),
          firstName,
          lastName,
          token: user.tokens[0],
        },
      });
    } else if (!user) {
      const privateId = randomId(
        commonModel.properties.commonPrivateIdModel.properties.maxlength.value
      );

      const token = await tokenSigner({
        data: { ...cellphone, privateId },
      });

      const userData = {
        ...cellphone,
        firstName,
        lastName,
        privateId,
        tokens: [{ token }],
      };

      await createNewNormalUser(userData);

      res.sendJsonResponse(createNewUserRoute, {
        user: { ...cellphone, privateId, firstName, lastName, token },
      });
    }
  } catch (error) {
    logger.log("createNewUserUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { createNewUserUserController };
