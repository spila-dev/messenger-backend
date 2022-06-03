const { customRequest } = require("@/functions/helpers/CustomRequest");
const { describer } = require("@/functions/helpers/Describer");
const { stateManager } = require("@/functions/tools/StateManager");

const {
  privateChatRoutes: {
    getAllChatsRoute,
    getMessagesRoute,
    privateChatRouteBaseUrl,
    sendMessageRoute,
  },
} = require("@/variables/routes/privateChatRoutes");

describer.addInitialDescribe(privateChatRouteBaseUrl, getMessagesRoute, "0");

const message = "Hello! Im messages!";

describe("get messages success tests", () => {
  it("Should get messages for testUser_0", async () => {
    const { testUser_1 } = stateManager.state.testUsers;

    //? First add start a chat and send some messages to testUser_1 =>
    // eslint-disable-next-line no-unused-vars
    for (const _ of Array.from({ length: 10 })) {
      await customRequest.sendRequest(
        { participantId: testUser_1.privateId, message },
        undefined,
        undefined,
        undefined,
        sendMessageRoute
      );
    }

    //? Now get added chats from user data =>
    const {
      body: { chats },
    } = await customRequest.sendRequest(
      undefined,
      undefined,
      undefined,
      privateChatRouteBaseUrl,
      getAllChatsRoute
    );

    const { chatId } = chats.at(-1);

    const response = await customRequest.sendRequest({ chatId });

    logger.log("rm", response.body);
  });
});
