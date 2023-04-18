import chai from "chai";
import { customTypeof } from "custom-typeof";

import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";

import {
  NativeError,
  NativeModel,
  SocketRoute,
  ValidationModel,
} from "@/types";

import { FIELD_TYPE } from "$/variables/fieldType";

describe("getAllStuff success tests", () => {
  it("should get all requirements for clients", async () => {
    const clientSocket = await clientInitializer.createClient();
    const requester = helpers.requesters.getStuff(clientSocket);

    const { data } = await requester.sendFullFeaturedRequest({
      language: "en",
    });

    testRoutes(data.routes);
    testModels(data.models);
    testErrors(data.appErrors);
    testValidationModels(data.validationModels);
  });
});

const testRoutes = (routes: SocketRoute[]) => {
  Object.values(routes).forEach((route) => {
    chai.expect(route.name).to.be.an(FIELD_TYPE.STRING);
    chai.expect(route.method).to.be.an(FIELD_TYPE.STRING);
    chai.expect(route.name).to.be.an(FIELD_TYPE.STRING);
    chai.expect(route.inputFields).to.be.an(FIELD_TYPE.OBJECT);
    chai.expect(route.outputFields).to.be.an(FIELD_TYPE.OBJECT);
  });
};

const testModels = (models: { [prop: string]: NativeModel }) => {
  Object.values(models).forEach((value) => {
    chai.expect(value).to.be.an(FIELD_TYPE.OBJECT);
    Object.values(value).forEach((prop) => {
      chai.expect(prop.value).not.be.undefined;
      chai.expect(prop.value).not.be.null;
      if (prop.error) {
        chai.expect(prop.error).to.be.an(FIELD_TYPE.OBJECT);
        chai.expect(prop.error.key).to.be.an(FIELD_TYPE.STRING);
        chai.expect(prop.error.reason).to.be.an(FIELD_TYPE.STRING);
      }
    });
  });
};

const testErrors = (errors: NativeError[]) => {
  Object.values(errors).forEach((error) => {
    chai.expect(error).to.be.an(FIELD_TYPE.OBJECT);
    chai.expect(error.key).to.be.an(FIELD_TYPE.STRING);
    chai.expect(error.reason).to.be.an(FIELD_TYPE.STRING);
    chai.expect(error.side).to.be.an(FIELD_TYPE.STRING);
    //FIXME: Should be equal to "server" or "client"
    // chai.expect(error.side).to.be.equal("side");
  });
};

const testValidationModels = (validationModels: ValidationModel[]) => {
  const isNotUndefined = customTypeof.isNotUndefined.bind(customTypeof);
  // eslint-disable-next-line sonarjs/cognitive-complexity
  Object.values(validationModels).forEach((prop) => {
    Object.values(prop).forEach((model) => {
      chai.expect(model.required).to.be.an(FIELD_TYPE.BOOLEAN);
      chai.expect(model.type).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.empty))
        chai.expect(model.empty).to.be.an(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(model.max))
        chai.expect(model.max).to.be.an(FIELD_TYPE.NUMBER);
      if (isNotUndefined(model.min))
        chai.expect(model.min).to.be.an(FIELD_TYPE.NUMBER);
      if (isNotUndefined(model.numeric))
        chai.expect(model.numeric).to.be.an(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(model.trim))
        chai.expect(model.trim).to.be.an(FIELD_TYPE.BOOLEAN);

      if (!model.messages)
        throw new Error("ValidationModel.messages is undefined");

      chai.expect(model.messages).to.be.an(FIELD_TYPE.OBJECT);
      chai.expect(model.messages.required).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.string))
        chai.expect(model.messages.string).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringEmpty))
        chai.expect(model.messages.stringEmpty).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringMax))
        chai.expect(model.messages.stringMax).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringMin))
        chai.expect(model.messages.stringMin).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringNumeric))
        chai.expect(model.messages.stringNumeric).to.be.an(FIELD_TYPE.STRING);
    });
  });
};
