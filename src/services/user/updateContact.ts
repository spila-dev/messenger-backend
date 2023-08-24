import { errorThrower, extractor } from "utility-store";
import {
	ContactItem,
	FullNameWithUserId,
	UserData,
	UserId,
} from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { UserService } from "~/types";
import { HydratedUser } from "~/types/models";

import { findOneUser } from "./findOneUser";

export const updateContact: UserService<
	{
		currentUserId: UserId;
		editValues: FullNameWithUserId;
	},
	void
> = async (data) => {
	const currentUser = (await findCurrentUser(data.currentUserId))!;

	const { index, contact: oldContact } = findContact(
		currentUser.contacts,
		data.editValues.userId
	);

	errorThrower(index < 0, {
		...errorStore.find("CONTACT_ITEM_NOT_EXIST"),
		editValues: data.editValues,
	});

	const updatedContact = {
		...(extractor.cellphone(oldContact) as ContactItem),
		...data.editValues,
	};

	await saveContact(currentUser, updatedContact, index);
};

const findCurrentUser = async (currentUserId: string) => {
	const result = await findOneUser({
		userId: currentUserId,
	});
	if (!result) throw errorStore.find("CURRENT_USER_NOT_EXIST");
	return result;
};

const findContact = (contacts: UserData["contacts"], targetUserId: string) => {
	const index = contacts.findIndex((c) => c.userId === targetUserId);

	return {
		contact: contacts[index],
		index,
	};
};

const saveContact = async (
	currentUser: HydratedUser,
	editValues: ContactItem,
	index: number
) => {
	currentUser.contacts.splice(index, 1, editValues);
	await currentUser.save();
};
