const Validator = require("fastest-validator");

const {
	countryCodeValidationSchema,
} = require("~/schema/validationSchema/userValidationSchema/countryCodeValidationSchema");

const v = new Validator();

const countryCodeValidation = {
	...countryCodeValidationSchema,
};

const countryCodeValidator = v.compile(countryCodeValidation);

module.exports = { countryCodeValidator, countryCodeValidation };