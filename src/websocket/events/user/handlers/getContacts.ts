import { services } from "~/services";
import { GetContactsIO, SocketOnHandler } from "~/types";

export const getContacts: SocketOnHandler<GetContactsIO> = async (socket) => {
	const { userId: currentUserId } = socket;

	const contacts = await services.getContacts({ currentUserId });

	return {
		data: { contacts },
	};
};
