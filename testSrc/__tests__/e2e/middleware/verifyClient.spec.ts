import { randomMaker } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";
import { events } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { utils } from "@/utils";

const eventsWithoutGetStuff = events.filter((i) => i.name !== "getStuff");

//REFACTOR: fail suit message like this
describe("verifyClient fail tests", () => {
  for (const event of eventsWithoutGetStuff) {
    const title = utils.createFailTestMessage(
      errorStore.find("CLIENT_INVALID"),
      event.name
    );
    it(title, async () => {
      const ci = clientInitializer();
      ci.setClient(randomMaker.string(models.native.clientId.maxLength));
      ci.makeClientCookie();
      ci.initClient();
      ci.connect();

      await requesterMaker(
        ci.getClient(),
        event as any
      ).sendFullFeaturedRequest({}, errorStore.find("CLIENT_INVALID"));
    });
  }
});
