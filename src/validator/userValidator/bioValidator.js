const Validator = require("fastest-validator");

const {
	bioValidationsSchema,
} = require("~/schema/validationSchema/userValidationSchema/bioValidationsSchema");

const v = new Validator();

const bioValidation = {
	...bioValidationsSchema,
};

const bioValidator = v.compile(bioValidation);

module.exports = { bioValidator, bioValidation };