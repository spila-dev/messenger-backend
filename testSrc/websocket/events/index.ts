import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import {
	eventsWithAuth,
	eventsWithoutAuth,
	events as mainEvents,
} from "~/websocket/events";

export const events = [...mainEvents];

export const unknownEvent = socketEventBuilder()
	.create()
	//@ts-ignore
	.name("unknownEvent")
	.handler(() => undefined)
	.inputFields({})
	.outputFields({})
	.build();

export const eventsWithoutDisconnect = events.filter(
	(i) => i.name !== "disconnect"
);

export { eventsWithAuth, eventsWithoutAuth };
