import { UserId } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const addBlock = serviceBuilder
	.create<
		{
			currentUserId: UserId;
			targetUserId: UserId;
		},
		void,
		{
			currentUser: HydratedUser;
			targetUser: HydratedUser;
		}
	>()
	.setMiddlewares([
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.findTargetUser,
		serviceMiddlewares.throwIfBlacklistItemExist,
	])
	.setBody(async (data) => {
		data.currentUser.blacklist.push({
			userId: data.targetUserId,
		});
		await data.currentUser.save();
	})
	.build();
