const { contactValidator } = require("~/validator/userValidator/contactValidator");

const contactValidatorMDW = async (req, res, next) => {
	try {
		const { cellphone, firstName, lastName } = req.body;

		const validationResult = await contactValidator({
			...cellphone,
			firstName,
			lastName,
		});

		if (validationResult !== true) {
			throw validationResult;
		}
	} catch (error) {
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { contactValidatorMDW };