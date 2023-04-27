import { Socket } from "socket.io";
import { trier } from "simple-trier";

import {
  ClientCallback,
  CustomOn,
  NativeError,
  SocketHandlerReturnValue,
  SocketOnHandler,
  SocketResponse,
  StringMap,
} from "@/types";

const registerCustomOn = (socket: Socket) => {
  return ((event, handler) => {
    socket.on(event, async (data: StringMap, cb: ClientCallback) => {
      await trier<void | SocketHandlerReturnValue>("socket.customOn")
        .tryAsync(tryBlock, handler, socket, data)
        .executeIfNoError(executeIfNoError, socket, event, cb)
        .catch(catchBlock, socket, cb)
        .runAsync();
    });
  }) as CustomOn;
};

const tryBlock = async (
  handler: SocketOnHandler,
  socket: Socket,
  data: StringMap
) => {
  return await handler(socket, data);
};

const executeIfNoError = (
  returnValue: void | SocketHandlerReturnValue,
  socket: Socket,
  event: string,
  cb: ClientCallback
) => {
  if (returnValue) {
    if (typeof cb === "function") {
      cb({ ...returnValue, ok: true });
    } else socket.customEmit(event, returnValue);
  }
};

const catchBlock = (error: NativeError, socket: Socket, cb: ClientCallback) => {
  const response: SocketResponse = {
    data: {},
    errors: { [error.reason]: error },
    ok: false,
  };

  if (typeof cb === "function") {
    return cb(response);
  } else socket.emit("error", response);
};

export { registerCustomOn };
