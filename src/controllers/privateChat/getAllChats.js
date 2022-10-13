const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services/services");

const tryToGetAllChats = async (currentUser) => {
  const chats = await services.getAllChats(currentUser);
  return chats;
};

const responseToGetAllChats = (chats, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    chats,
  });
};

const catchGetAllChats = commonFunctionalities.controllerCatchResponse;

const getAllChatsController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { currentUser } = req;
  (
    await trier(getAllChatsController.name).tryAsync(
      tryToGetAllChats,
      currentUser
    )
  )
    .executeIfNoError(responseToGetAllChats, res)
    .catch(catchGetAllChats, res);
};

module.exports = { getAllChats: getAllChatsController };
