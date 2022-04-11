const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
      body: { phoneNumber, countryCode, countryName },
    } = req;

    const cellphone = { phoneNumber, countryCode, countryName };

    const { cellphone: blacklistItem } = cellphoneFinder({
      cellphones: user.blacklist,
      targetCell: cellphone,
    });

    if (blacklistItem !== undefined) {
      const error = userErrorTemplate.CELLPHONE_EXIST.properties;
      throw error;
    }

    user.blacklist.push(cellphone);

    await user.updateOne({
      blacklist: user.blacklist,
    });

    res.status(200).json({
      blockedCellphone: cellphone,
    });
  } catch (error) {
    logger.log("addBlockCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { addBlockCellphoneController };
