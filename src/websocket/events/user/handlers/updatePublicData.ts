import { services } from "~/services";
import { SocketOnHandler, UpdatePublicDataIO } from "~/types";

export const updatePublicData: SocketOnHandler<UpdatePublicDataIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;
	const { bio, firstName, lastName, username } = data;

	const updatedPublicData = await services.user.updatePublicData({
		currentUserId,
		updateProperties: {
			bio,
			firstName,
			lastName,
			username,
		},
	});

	return {
		data: {
			userPublicData: updatedPublicData,
		},
	};
};