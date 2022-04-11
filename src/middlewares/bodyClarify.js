const { objectClarify } = require("~/functions/utilities/objectClarify");
const { errorThrower } = require("~/functions/utilities/utils");

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 * @return req.body without undefined values
 */
const bodyClarify = (req, _, next) => {
  try {
    req.body = objectClarify(req.body);

    next();
  } catch (error) {
    logger.log("bodyClarify catch", error);
    errorThrower(error, error);
  }
};

module.exports = { bodyClarify };
