import { randomMaker } from "utility-store";

import { clientManager } from "~/classes/ClientIdManager";
import { models } from "~/models";
import { ErrorReason, SocketEvent } from "~/types";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";
import { eventsWithoutDisconnect } from "@/websocket/events";

const filteredEvents = eventsWithoutDisconnect.filter(
	(i) => !["getStuff", "ping"].includes(i.name)
);

describe(
	utils.createTestMessage.unitFailDescribe("validateClientId", "middleware"),
	() => {
		const caller = async (
			event: SocketEvent,
			reason: ErrorReason,
			clientStr: unknown
		) => {
			const ci = clientInitializer();
			ci.setClient(clientStr).makeClientCookie().initClient().connect();

			await requesterMaker(ci.getClient(), event).sendFullFeaturedRequest(
				{},
				reason
			);
		};

		for (const event of filteredEvents) {
			const title = utils.createTestMessage.unitFailTest(
				event.name,
				"middleware",
				"CLIENT_ID_MAX_LENGTH_ERROR"
			);
			it(title, async () => {
				await caller(
					event,
					"CLIENT_ID_MAX_LENGTH_ERROR",
					await clientManager.signClient(
						randomMaker.string(models.native.clientId.maxLength + 1)
					)
				);
			});
		}

		for (const event of filteredEvents) {
			const title = utils.createTestMessage.unitFailTest(
				event.name,
				"middleware",
				"CLIENT_ID_MIN_LENGTH_ERROR"
			);
			it(title, async () => {
				await caller(
					event,
					"CLIENT_ID_MIN_LENGTH_ERROR",
					await clientManager.signClient(
						randomMaker.string(models.native.clientId.minLength - 1)
					)
				);
			});
		}
	}
);
