import chai from "chai";

import { ParticipantId, ParticipantItem } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("getPrivateChat", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"getPrivateChat",
				"event",
				"should get private chats related to client"
			),
			async () => {
				const { socket: currentUserSocket, user: currentUser } =
					await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const messageText = "Hello! Im messages!";

				const {
					data: { chatId },
				} = await utils.requesterCollection
					.sendMessage(currentUserSocket)
					.sendFullFeaturedRequest({
						messageText,
						targetParticipantId: targetUser.userId,
					});

				const {
					data: { privateChat },
				} = await utils.requesterCollection
					.getPrivateChat(currentUserSocket)
					.sendFullFeaturedRequest({
						chatId,
					});

				assertionInitializerHelper().chatId({
					testValue: privateChat.chatId,
					equalValue: chatId,
				});

				chai
					.expect(
						isParticipantExist(privateChat.participants, currentUser.userId)
					)
					.to.be.equal(true);
				chai
					.expect(
						isParticipantExist(privateChat.participants, targetUser.userId)
					)
					.to.be.equal(true);

				const messageItem = privateChat.messages.at(0)!;
				assertionInitializerHelper()
					.messageText({
						equalValue: messageText,
						testValue: messageItem.messageText,
					})
					.messageId(
						{
							testValue: messageItem.messageId,
						},
						{
							stringEquality: false,
						}
					)
					.senderId({
						equalValue: messageItem.sender.senderId,
						testValue: currentUser.userId,
					});
			}
		);
	}
);

const isParticipantExist = (
	participants: ParticipantItem[],
	participantId: ParticipantId
) => participants.some((i) => i.participantId === participantId)!;
