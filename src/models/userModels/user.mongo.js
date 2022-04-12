const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const {
  mongooseSchemaPropertyGenerator,
} = require("~/functions/utilities/generators");

const { chatModel } = require("~/models/chatModels/chat.model");

const {
  userModel: {
    bio: { properties: bio },
    countryCode: { properties: countryCode },
    countryName: { properties: countryName },
    createdAt: { properties: createdAt },
    firstName: { properties: firstName },
    lastName: { properties: lastName },
    phoneNumber: { properties: phoneNumber },
    privateID: { properties: privateID },
    token: { properties: token },
    username: { properties: username },
  },
} = require("~/models/userModels/user.model");
const { skipParams } = require("~/functions/utilities/utils");

const {
  chatID: { properties: chatID },
  message: { properties: message },
} = chatModel;

uniqueValidator.defaults.message = "{PATH}_exist";

const user = {
  bio: mongooseSchemaPropertyGenerator(bio.type.value, [
    bio.maxlength.value,
    bio.maxlength.error.message,
  ]),

  chatID: mongooseSchemaPropertyGenerator(
    chatID.type.value,
    [chatID.maxlength.value, chatID.maxlength.error.message],
    [chatID.minlength.value, chatID.minlength.error.message],
    [chatID.required.value, chatID.required.error.message],
    null,
    chatID.trim.value
  ),
  countryCode: mongooseSchemaPropertyGenerator(
    countryCode.type.value,
    [countryCode.maxlength.value, countryCode.maxlength.error.message],
    [countryCode.minlength.value, countryCode.minlength.error.message],
    [countryCode.required.value, countryCode.required.error.message]
  ),
  countryName: mongooseSchemaPropertyGenerator(
    countryName.type.value,
    [countryName.maxlength.value, countryName.maxlength.error.message],
    [countryName.minlength.value, countryName.minlength.error.message],
    [countryName.required.value, countryName.required.error.message]
  ),
  createdAt: mongooseSchemaPropertyGenerator(
    createdAt.type.value,
    ...skipParams(5),
    createdAt.default.value
  ),
  firstName: mongooseSchemaPropertyGenerator(
    firstName.type.value,
    [firstName.maxlength.value, firstName.maxlength.error.message],
    [firstName.minlength.value, firstName.minlength.error.message],
    [firstName.required.value, firstName.required.error.message]
  ),
  lastName: mongooseSchemaPropertyGenerator(
    lastName.type.value,
    [lastName.maxlength.value, lastName.maxlength.error.message],
    ...skipParams(3),
    lastName.trim.value,
    lastName.default.value
  ),
  lastMessage: mongooseSchemaPropertyGenerator(
    message.type.value,
    [message.minlength.value, firstName.minlength.error.message],
    [message.maxlength.value, message.maxlength.error.message]
  ),
  phoneNumber: mongooseSchemaPropertyGenerator(
    phoneNumber.type.value,
    [phoneNumber.maxlength.value, phoneNumber.maxlength.error.message],
    [phoneNumber.minlength.value, phoneNumber.minlength.error.message],
    [phoneNumber.required.value, phoneNumber.required.error.message]
  ),
  privateID: mongooseSchemaPropertyGenerator(
    privateID.type.value,
    [privateID.maxlength.value, privateID.maxlength.error.message],
    [privateID.minlength.value, privateID.minlength.error.message],
    [privateID.required.value, privateID.required.error.message],
    privateID.unique.value,
    privateID.trim.value
  ),
  token: mongooseSchemaPropertyGenerator(
    token.type.value,
    ...skipParams(2),
    [token.required.value, token.required.error.message],
    token.unique.value
  ),
  username: mongooseSchemaPropertyGenerator(
    username.type.value,
    [username.maxlength.value, username.maxlength.error.message],
    ...skipParams(3),
    username.trim.value,
    username.default.value,
    username.lowercase.value
    // validate: {
    // 	validator: function (value) {
    // 		return /^[a-z\s]{0,255}$/i.test(value);
    // 	},
    // 	message: "{VALUE} is not a valid string!",
    // },
  ),
};

// uniqueValidator.defaults.type = "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  bio: user.bio,

  blacklist: [
    {
      countryCode: user.countryCode,
      countryName: user.countryName,
      phoneNumber: user.phoneNumber,
    },
  ],

  chats: [{ chatID: user.chatID }],

  contacts: [
    {
      countryCode: user.countryCode,
      countryName: user.countryName,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      privateID: {
        ...(() => {
          const { unique, ...rest } = user.privateID;

          return rest;
        })(),
      },
    },
  ],

  countryCode: user.countryCode,

  countryName: user.countryName,

  createdAt: user.createdAt,

  firstName: user.firstName,

  lastName: user.lastName,

  phoneNumber: user.phoneNumber,

  privateID: user.privateID,

  tokens: [
    {
      token: user.token,
    },
  ],

  username: user.username, //TODO UserStatus here =>
});

// UserRegisterSchema.post("save", function (error, doc, next) {
// 	const keys = {};
// 	Object.keys(error).forEach((key) => (keys[key] = error[key]));
// 	logger.log(keys, "171474147414741474114741147414741474");
// 	if (error.code === 11000) {
// 		next(new Error(error));
// 	} else {
// 		next(error);
// 	}
// });
//

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("User", UserSchema, "users");

module.exports = { UserModel };