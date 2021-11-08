const { userError } = require("~/constant/error/userError/userError");

const errorAuthController = (req, res) => {
	try {
		res.status(200).json(userError);
	} catch (error) {
		res.status(500).json({ error: { message: "Unexpected server error" } });
	}
};

module.exports = { errorAuthController };
