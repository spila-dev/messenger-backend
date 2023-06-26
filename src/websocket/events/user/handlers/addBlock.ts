import { services } from "~/services";
import { AddBlockIO, SocketOnHandler } from "~/types";

const addBlock: SocketOnHandler<AddBlockIO> = async (socket, data) => {
  const { userId: currentUserId } = socket;

  await services.addBlock({
    blockingUserId: data.userId,
    currentUserId,
  });

  return {
    data: {
      blockedUser: {
        userId: data.userId,
      },
    },
  };
};

export { addBlock };
