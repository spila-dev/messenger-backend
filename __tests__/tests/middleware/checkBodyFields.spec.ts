import { failTestBuilder } from "$/classes/FailTestBuilder";
import { randomMaker } from "$/classes/RandomMaker";
import { requesterCreator } from "$/classes/Requester";

import { arrayOfRoutes, routes } from "@/http/routes";

import { errors } from "@/variables/errors";

describe("checkBodyFields middleware tests", () => {
  let token;
  beforeAll(async () => {
    token = (await randomMaker.user()).token;
  });
  //? Filter routes which has at least one input field
  const routesWithInputFields = arrayOfRoutes.filter(
    (i) => Object.keys(i.inputFields).length
  );

  const routesWithoutAuth = routesWithInputFields.filter(
    (i) =>
      ![
        routes.auth.signIn.fullUrl,
        routes.auth.verify.fullUrl,
        routes.auth.createNewUser.fullUrl,
      ].includes(i.fullUrl)
  );

  for (const route of routesWithoutAuth) {
    const message = failTestBuilder
      .create()
      .createTestMessage(errors.INPUT_FIELDS_MISSING, route.fullUrl);
    it(message, async () => {
      await requesterCreator(token)
        .create(route)
        .setError(errors.INPUT_FIELDS_MISSING)
        .setOptions({ shouldFilterRequestData: false })
        .sendFullFeaturedRequest();
    });
  }
});