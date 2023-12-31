import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { ClientId, UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/model";

export const addClient = serviceBuilder
	.create<
		{
			clientId: ClientId;
			currentUserId: UserId;
		},
		void,
		{
			currentUser: HydratedUser;
		}
	>()
	.setMiddlewares([serviceMiddlewares.findCurrentUser])
	.setBody(async (data) => {
		data.currentUser.clients.push({
			clientId: data.clientId,
		});

		await data.currentUser.save();
	})
	.build();
