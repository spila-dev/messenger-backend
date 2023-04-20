import { addBlock } from "@/websocket/events/user/handlers/addBlock";
import { addContact } from "@/websocket/events/user/handlers/addContact";
import { addContactWithCellphone } from "@/websocket/events/user/handlers/addContactWithCellphone";
import { disconnect } from "@/websocket/events/user/handlers/disconnect";
import { editContact } from "@/websocket/events/user/handlers/editContact";
import { getContacts } from "@/websocket/events/user/handlers/getContacts";
import { getUserData } from "@/websocket/events/user/handlers/getUserData";
import { getPublicUserData } from "@/websocket/events/user/handlers/getPublicUserData";
import { removeBlock } from "@/websocket/events/user/handlers/removeBlock";
import { removeContact } from "@/websocket/events/user/handlers/removeContact";
import { updateOnlineStatus } from "@/websocket/events/user/handlers/updateOnlineStatus";
import { updatePublicUserData } from "@/websocket/events/user/handlers/updatePublicUserData";

const userHandlers = {
  addBlock,
  addContact,
  addContactWithCellphone,
  disconnect,
  editContact,
  getContacts,
  getUserData,
  getPublicUserData,
  removeBlock,
  removeContact,
  updateOnlineStatus,
  updatePublicUserData,
};

export { userHandlers };
