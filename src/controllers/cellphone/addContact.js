const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToAddContact = async (data) => {
  const { newContact } = await services.addContact().run(data);
  return newContact;
};

const responseToAddContact = (newContact, res, contact) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    addedContact: {
      ...contact,
      userId: newContact.userId,
    },
  });
};

const catchAddContact = commonFunctionalities.controllerErrorResponse;

const addContact = async (req = expressRequest, res = expressResponse) => {
  const { body, currentUserId } = req;

  const contact = userPropsUtilities.extractContact(body);

  await trier(addContact.name)
    .tryAsync(tryToAddContact, {
      currentUserId,
      contact,
    })
    .executeIfNoError(responseToAddContact, res, contact)
    .catch(catchAddContact, res)
    .runAsync();
};

module.exports = { addContact };
