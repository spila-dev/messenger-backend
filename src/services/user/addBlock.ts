import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { UserService } from "~/types";
import { HydratedUser } from "~/types/model";

import { findOneUser } from "./findOneUser";

export const addBlock: UserService<
	{
		targetUserId: UserId;
		currentUserId: UserId;
	},
	void
> = async (data) => {
	const currentUser = await findOneUser({
		userId: data.currentUserId,
	});

	if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	const targetUser = await findOneUser({
		userId: data.targetUserId,
	});
	errorThrower(!targetUser, errorStore.find("TARGET_USER_NOT_EXIST"));

	checkExistenceOfBlacklistItem(currentUser.blacklist, data.targetUserId);

	await saveNewBlacklistItem(currentUser, data.targetUserId);
};

const checkExistenceOfBlacklistItem = (
	blacklist: UserData["blacklist"],
	userId: UserId
) => {
	const index = blacklist.findIndex((i) => i.userId === userId);
	errorThrower(index !== -1, () => ({
		...errorStore.find("BLACKLIST_ITEM_EXIST"),
		targetUserData: userId,
	}));
};

const saveNewBlacklistItem = async (
	currentUser: HydratedUser,
	userId: UserId
) => {
	currentUser.blacklist.push({ userId });
	await currentUser.save();
};
