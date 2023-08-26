import chai from "chai";
import {
	ContactItem,
	Contacts,
	FullNameWithUserId,
} from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe("edit contact success tests", () => {
	it("should edit users in contacts", async () => {
		const { user: currentUser, socket } = await randomMaker.user();

		const contactsLength = 10;
		const addingContacts = await createContacts(contactsLength);

		const addContactRequester =
			utils.requesterCollection.addContactWithUserId(socket);
		for (const contact of addingContacts)
			await addContactRequester.sendFullFeaturedRequest(contact);

		const editContactRequester = utils.requesterCollection.editContact(socket);
		for (const addingContact of addingContacts) {
			const fullName = randomMaker.fullName();
			const editingContactData = {
				...fullName,
				userId: addingContact.userId,
			};

			const {
				data: { editedContact: editContactResponseData },
			} =
				await editContactRequester.sendFullFeaturedRequest(editingContactData);

			testEditedContact(editingContactData, editContactResponseData);

			const { contacts: currentUserContacts } = (await services.findOneUser({
				userId: currentUser.userId,
			}))!;

			const foundEditedContact = currentUserContacts.find(
				(i) => i.userId === editingContactData.userId
			) as ContactItem;

			testEditedContact(editingContactData, foundEditedContact);

			addingContact.firstName = editingContactData.firstName;
			addingContact.lastName = editingContactData.lastName;
			testNonEditedContacts(
				editingContactData,
				addingContacts,
				currentUserContacts as Contacts
			);
		}
	});
});

await utils.asyncDescribe("editContact fail tests", async () => {
	const { requester, user } = await utils.setupRequester(
		utils.requesterCollection.editContact
	);
	const selfStuffData = {
		...randomMaker.fullName(),
		userId: user.userId,
	};

	return () => {
		const randomContact = {
			...randomMaker.fullName(),
			userId: randomMaker.userId(),
		};

		e2eFailTestInitializerHelper(requester)
			.input(randomContact)
			.firstName(randomContact)
			.lastName(randomContact)
			.userId(randomContact)
			.selfStuff(selfStuffData)
			.contactItemNotExist(randomContact);
	};
});

const createContacts = async (length: number) => {
	const users = await randomMaker.users(length);
	return users.map((i) => extractor.contact(i.user));
};

const testNonEditedContacts = (
	sentData: FullNameWithUserId,
	addingContacts: Contacts,
	currentUserContacts: Contacts
) => {
	const filterNonEditedContacts = addingContacts.filter(
		(i) => i.userId !== sentData.userId
	);
	const filterNonEditedCurrentUserContacts = currentUserContacts.filter(
		(i) => i.userId !== sentData.userId
	);

	chai
		.expect(filterNonEditedCurrentUserContacts.length)
		.to.be.equal(filterNonEditedContacts.length);

	filterNonEditedContacts.forEach((contactItem) => {
		const foundCurrentUserContactItem = filterNonEditedCurrentUserContacts.find(
			(currentUserContactItem) =>
				currentUserContactItem.userId === contactItem.userId
		) as ContactItem;

		testEditedContact(contactItem, foundCurrentUserContactItem);
	});
};

const testEditedContact = (
	equalValue: FullNameWithUserId,
	testValue: FullNameWithUserId
) => {
	assertionInitializerHelper()
		.firstName({
			equalValue: equalValue.firstName,
			testValue: testValue.firstName,
		})
		.lastName({
			equalValue: equalValue.lastName,
			testValue: testValue.lastName,
		})
		.userId({ equalValue: equalValue.userId, testValue: testValue.userId });
};
