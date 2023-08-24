import {
	BlackList,
	Cellphone,
	ContactItem,
	Contacts,
	CountryCode,
	CountryName,
	FullName,
	FullNameWithUserId,
	UserData,
} from "utility-store/lib/types";

import {
	Bio,
	ChatId,
	ClientId,
	ContactItemWithCellphone,
	FirstName,
	LastName,
	MessageId,
	MessageText,
	PhoneNumber,
	PrivateChats,
	UserId,
	Username,
	VerificationCode,
} from "~/types/datatypes";

import { AssertionInitializerArgs, AssertionInitializerOptions } from "@/types";
import { assertionInitializers } from "@/utils/assertionInitializers";

type MethodName = keyof typeof assertionInitializers;

export class AssertionInitializerHelper {
	private initializer<DataType>(methodName: MethodName) {
		return (
			arg: AssertionInitializerArgs<DataType>,
			options: Partial<AssertionInitializerOptions> = this.getDefaultOptions()
		) => {
			assertionInitializers[methodName](arg as any, options);
			return this;
		};
	}

	private getDefaultOptions(): AssertionInitializerOptions {
		return {
			modelCheck: true,
			stringEquality: true,
		};
	}

	bio = this.initializer<Bio>("bio");
	blacklist = this.initializer<BlackList>("blacklist");
	cellphone = this.initializer<Cellphone>("cellphone");
	chatId = this.initializer<ChatId>("chatId");
	clientId = this.initializer<ClientId>("clientId");
	contacts = this.initializer<Contacts>("contacts");
	contactsWithCellphone = this.initializer<ContactItemWithCellphone[]>(
		"contactsWithCellphone"
	);
	contactsWithUserId =
		this.initializer<FullNameWithUserId[]>("contactsWithUserId");
	countryCode = this.initializer<CountryCode>("countryCode");
	countryName = this.initializer<CountryName>("countryName");
	firstName = this.initializer<FirstName>("firstName");
	fullName = this.initializer<FullName>("fullName");
	lastName = this.initializer<LastName>("lastName");
	messageId = this.initializer<MessageId>("messageId");
	messageText = this.initializer<MessageText>("messageText");
	oneContact = this.initializer<ContactItem>("oneContact");
	oneContactWithCellphone = this.initializer<ContactItemWithCellphone>(
		"oneContactWithCellphone"
	);
	oneContactWithUserId = this.initializer<FullNameWithUserId>(
		"oneContactWithUserId"
	);
	phoneNumber = this.initializer<PhoneNumber>("phoneNumber");
	privateChats = this.initializer<PrivateChats>("privateChats");
	userData = this.initializer<UserData>("userData");
	userId = this.initializer<UserId>("userId");
	username = this.initializer<Username>("username");
	verificationCode = this.initializer<VerificationCode>("verificationCode");
}

export const assertionInitializerHelper = () =>
	new AssertionInitializerHelper();
