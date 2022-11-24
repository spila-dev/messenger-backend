const { addBlock } = require("@/controllers/cellphone/addBlock");
const { addContact } = require("@/controllers/cellphone/addContact");
const { editContact } = require("@/controllers/cellphone/editContact");
const { getContacts } = require("@/controllers/cellphone/getContacts");
const { removeBlock } = require("@/controllers/cellphone/removeBlock");
const { removeContact } = require("@/controllers/cellphone/removeContact");

const { getCountries } = require("@/controllers/other/getCountries");
const { getWelcomeMessage } = require("@/controllers/other/getWelcomeMessage");

const { getPrivateChat } = require("@/controllers/privateChat/getPrivateChat");
const {
  sendPrivateMessage,
} = require("@/controllers/privateChat/sendPrivateMessage");

const {
  getChatsLastMessage,
} = require("@/controllers/privateChat/getChatsLastMessage");

const { checkUserStatus } = require("@/controllers/user/checkUserStatus");
const { createNewUser } = require("@/controllers/user/createNewUser");
const { getChatInfo } = require("@/controllers/user/getChatInfo");
const { getUserData } = require("@/controllers/user/getUserData");
const { logoutNormal } = require("@/controllers/user/logoutNormal");
const { signInNormal } = require("@/controllers/user/signInNormal");
const { updatePersonalInfo } = require("@/controllers/user/updatePersonalInfo");
const { verifySignInNormal } = require("@/controllers/user/verifySignInNormal");

//TODO: Add to user controllers
const { getAllUsers } = require("@/controllers/test/getAllUsers");

const { getAllStuff } = require("@/controllers/versionControl/getAllStuff");

const controllers = {
  addBlock,
  addContact,
  getChatsLastMessage,
  checkUserStatus,
  createNewUser,
  editContact,
  getAllStuff,
  getAllUsers,
  getChatInfo,
  getContacts,
  getCountries,
  getPrivateChat,
  getUserData,
  getWelcomeMessage,
  logoutNormal,
  removeBlock,
  removeContact,
  sendPrivateMessage,
  signInNormal,
  updatePersonalInfo,
  verifySignInNormal,
};

module.exports = { controllers };
