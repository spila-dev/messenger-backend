const { handlers } = require("@/websocket/handlers");

const { routes } = require("@/websocket/routes");

const otherRouter = (socket = ioSocket) => {
  [
    {
      event: routes.other.ping.event,
      handler: handlers.pong,
    },
    {
      event: routes.other.disconnect.event,
      handler: handlers.disconnect,
    },
  ].forEach((item) => {
    socket.on(item.event, (...args) => item.handler(socket, ...args));
  });
};

module.exports = { otherRouter };