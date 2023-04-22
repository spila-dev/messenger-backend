import chai from "chai";

import { clientInitializer } from "$/classes/ClientInitializer";
import { requesterMaker } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { ClientSocket, SocketRoute } from "@/types";

import { FIELD_TYPE } from "$/variables/fieldType";
import { errors } from "@/variables/errors";

import { routes } from "$/websocket/events";
import { arrayOfRoutes } from "@/websocket/events";

const createRequester = (socket: ClientSocket, route: SocketRoute) =>
  requesterMaker(socket, route);

helpers.asyncDescribe(
  "checkEventAvailability middleware fail test",
  async () => {
    const clientSocket = (
      await clientInitializer().createComplete()
    ).getClient();

    return () => {
      const message = helpers.createFailTestMessage(
        errors.ROUTE_NOT_FOUND,
        routes.unknownRoute.name
      );

      it(message, async () => {
        await createRequester(clientSocket, routes.unknownRoute)
          .setError(errors.EVENT_NOT_FOUND)
          .sendFullFeaturedRequest();
      });

      // .filter(
      //   (i) => i.name !== "disconnect"
      // )
      for (const route of arrayOfRoutes) {
        it(`should not get error: ROUTE_NOT_FOUND - ${route.name}`, async () => {
          const requester = createRequester(clientSocket, route);
          await requester.sendRequest();

          const {
            data: { errors: responseErrors },
          } = requester.getResponse();

          const { key } = errors.ROUTE_NOT_FOUND;
          if (responseErrors?.[key]) {
            chai.expect(responseErrors[key].reason).to.be.an(FIELD_TYPE.STRING);
            chai
              .expect(responseErrors[key].reason)
              .not.equal(errors.ROUTE_NOT_FOUND.reason);
          }
        });
      }
    };
  }
);
