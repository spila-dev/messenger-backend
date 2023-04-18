import { RouteBuilder } from "@/classes/routeBuilder/RouteBuilder";

import { SocketRoute } from "@/types";

class SocketRouteBuilder extends RouteBuilder {
  protected route: SocketRoute;

  constructor() {
    super();

    // @ts-ignore
    this.route = {
      method: "customOn",
      inputFields: {},
      outputFields: {},
    };
  }

  method(method: SocketRoute["method"]) {
    this.route.method = method;
    return this;
  }

  name(name: string) {
    this.route.name = name;
    return this;
  }

  handler(handler: SocketRoute["handler"]) {
    this.route.handler = handler;
    return this;
  }

  build() {
    const { handler, name } = this.route;
    this.checkRequirements(handler, name);
    return this.route;
  }
}

const socketRouteBuilder = () => ({
  create: () => new SocketRouteBuilder(),
});

export { socketRouteBuilder, SocketRouteBuilder };
