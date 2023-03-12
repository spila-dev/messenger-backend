import http from "http";

import socket from "socket.io";

import { customMethods } from "@/websocket/custom/methods";

import { routers } from "@/websocket/events";

import { middlewares } from "@/websocket/middlewares";

type HttpServer = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

const websocketServer = (httpServer: HttpServer) => {
  const io = new socket.Server(httpServer, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    socket.io = io;

    socket.customUse = customMethods.use(socket);
    socket.customOn = customMethods.on(socket);
    socket.customEmit = customMethods.emit(socket);

    socket.customUse(middlewares.checkEventAvailability);
    socket.customUse(middlewares.auth);
    socket.customUse(middlewares.checkDataFields);
    socket.customUse(middlewares.checkCurrentUserStatus);
    socket.customUse(middlewares.attachCurrentUserId);

    routers(socket);
  });
  return io;
};

export { websocketServer };
