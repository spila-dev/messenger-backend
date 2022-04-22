const {
  getStatusCodeFromRoute,
  getCellphone,
} = require("~/functions/utilities/utilsNoDeps");
const { removeContactItem } = require("~/models/userModels/userModelFunctions");
const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");

const removeContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser, body } = req;

    const targetUserData = getCellphone(body);

    await removeContactItem(currentUser, targetUserData);

    res
      .status(getStatusCodeFromRoute(cellphoneRoutes.properties.removeContact))
      .json({ removedContact: targetUserData });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { removeContactCellphoneController };
