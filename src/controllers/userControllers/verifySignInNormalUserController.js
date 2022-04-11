const { userFinder } = require("~/functions/helpers/userFinder");
const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");

const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");

const { clients } = require("~/temp/Clients");
const { UserModel } = require("~/models/userModels/UserModel");
const { errorThrower } = require("~/functions/utilities/utils");

const verifySignInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { verificationCode },
    } = req;

    const verifyToken = req.headers.authorization?.split("Bearer ")[1];

    errorThrower(!verifyToken, userErrorTemplate.TOKEN_REQUIRED);

    const verifiedToken = await tokenVerifier({
      token: verifyToken,
      secret: process.env.JWT_SIGN_IN_SECRET,
    });

    const { phoneNumber, countryCode, countryName } =
      verifiedToken.data.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

    const client = clients.aliveClients.find((client) => {
      if (
        client.phoneNumber === phoneNumber &&
        client.countryCode === countryCode
      ) {
        return true;
      } else {
        return false;
      }
    });

    errorThrower(!client, userErrorTemplate.USER_NOT_EXIST);

    errorThrower(
      client?.verificationCode !== verificationCode,
      userErrorTemplate.VERIFICATION_CODE_INVALID
    );

    const { user } = await userFinder({ ...cellphone });

    if (user) {
      const { userData } = sendableUserData({ user });

      await UserModel.findOneAndUpdate(
        { privateID: user.privateID },
        { tokens: user.token }
      );

      res
        .status(200)
        .json({ user: { ...userData, token: user.tokens[0].token } });
    } else if (!user) {
      res.status(200).json({
        user: { newUser: true },
      });
    }
  } catch (error) {
    logger.log("verifySignInNormalUserController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
