const { UserModel } = require("~/model/userModel/UserModel");

const addContactController = async (req, res, next) => {
	try {
		const { cellphone } = req.body;

		const user = await UserModel.findOne({ cellphone });
		console.log(user);
		if (user) {
			res.status(200).json({ cellphone, user });
		} else {
			const error = { cellphone, error: "cellphone not exist" };
			throw error;
		}
	} catch (error) {
		res.errorCollector(error);
		next();
	}
};

module.exports = { addContactController };
