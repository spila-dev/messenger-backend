const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const getUserData = async (currentUserId) => {
  const tryToGetUserData = async () => {
    const user = await commonServices.findUserById(currentUserId);

    errorThrower(!user, errors.CURRENT_USER_NOT_EXIST);

    return user;
  };

  return (await trier(getUserData.name).tryAsync(tryToGetUserData))
    .printAndThrow()
    .result();
};

module.exports = { getUserData };
