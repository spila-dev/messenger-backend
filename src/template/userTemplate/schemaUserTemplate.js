//* Using in mongoose schema and validators

const {
	userError: {
		BIO_INVALID_TYPE,
		BIO_MAXLENGTH_REACH,
		BIO_MINLENGTH_REACH,
		CELLPHONE_EXIST,
		CELLPHONE_INVALID_TYPE,
		CELLPHONE_MAXLENGTH_REACH,
		CELLPHONE_MINLENGTH_REACH,
		CELLPHONE_REQUIRED,
		CONTACT_EXIST,
		CONTACT_INVALID_TYPE,
		COUNTRY_CODE_INVALID_TYPE,
		COUNTRY_CODE_MAXLENGTH_REACH,
		COUNTRY_CODE_MINLENGTH_REACH,
		COUNTRY_CODE_REQUIRED,
		COUNTRY_NAME_INVALID_TYPE,
		COUNTRY_NAME_MAXLENGTH_REACH,
		COUNTRY_NAME_MINLENGTH_REACH,
		COUNTRY_NAME_REQUIRED,
		CREATED_AT_INVALID_TYPE,
		FIRST_NAME_INVALID_TYPE,
		FIRST_NAME_MAXLENGTH_REACH,
		FIRST_NAME_MINLENGTH_REACH,
		FIRST_NAME_REQUIRED,
		LAST_NAME_INVALID_TYPE,
		LAST_NAME_MAXLENGTH_REACH,
		LAST_NAME_MINLENGTH_REACH,
		MAC_ADDRESS_EXIST,
		MAC_ADDRESS_INVALID_TYPE,
		MAC_ADDRESS_MAXLENGTH_REACH,
		MAC_ADDRESS_MINLENGTH_REACH,
		MAC_ADDRESS_REQUIRED,
		PRIVATE_ID_EXIST,
		PRIVATE_ID_INVALID_TYPE,
		PRIVATE_ID_MAX_LENGTH_REACH,
		PRIVATE_ID_MIN_LENGTH_REACH,
		PRIVATE_ID_REQUIRED,
		TOKENS_INVALID_TYPE,
		TOKENS_EXIST,
		USERNAME_EXIST,
		USERNAME_INVALID_TYPE,
		USERNAME_MAXLENGTH_REACH,
		USERNAME_MINLENGTH_REACH,
	},
} = require("~/constant/error/userError/userError");

const schemaUserTemplate = {
	bio: {
		type: ["string", BIO_INVALID_TYPE],
		required: [false],
		Type: [String, BIO_INVALID_TYPE],
		minlength: [1, BIO_MINLENGTH_REACH],
		maxlength: [255, BIO_MAXLENGTH_REACH],
	},
	cellphone: {
		type: ["string", CELLPHONE_INVALID_TYPE],
		Type: [String, CELLPHONE_INVALID_TYPE],
		unique: [true, CELLPHONE_EXIST],
		required: [true, CELLPHONE_REQUIRED],
		minlength: [10, CELLPHONE_MINLENGTH_REACH],
		maxlength: [14, CELLPHONE_MAXLENGTH_REACH],
	},
	contact: {
		type: ["array", CONTACT_INVALID_TYPE],
		Type: [Array, CONTACT_INVALID_TYPE],
		unique: [true, CONTACT_EXIST],
		minlength: [
			10,
			// CONTACT_MINLENGTH_REACH
		],
		maxlength: [
			14,
			// CONTACT_MAXLENGTH_REACH
		],
		required: [false],
	},
	countryCode: {
		type: ["string", COUNTRY_CODE_INVALID_TYPE],
		Type: [String, COUNTRY_CODE_INVALID_TYPE],
		required: [true, COUNTRY_CODE_REQUIRED],
		minlength: [2, COUNTRY_CODE_MINLENGTH_REACH],
		maxlength: [8, COUNTRY_CODE_MAXLENGTH_REACH],
		trim: [true],
	},
	countryName: {
		type: ["string", COUNTRY_NAME_INVALID_TYPE],
		Type: [String, COUNTRY_NAME_INVALID_TYPE],
		required: [true, COUNTRY_NAME_REQUIRED],
		minlength: [2, COUNTRY_NAME_MINLENGTH_REACH],
		maxlength: [32, COUNTRY_NAME_MAXLENGTH_REACH],
	},
	createdAt: {
		type: ["date", CREATED_AT_INVALID_TYPE],
		Type: [Date, CREATED_AT_INVALID_TYPE],
		required: [true],
		default: [Date.now],
	},
	firstName: {
		type: ["string", FIRST_NAME_INVALID_TYPE],
		Type: [String, FIRST_NAME_INVALID_TYPE],
		required: [true, FIRST_NAME_REQUIRED],
		minlength: [1, FIRST_NAME_MINLENGTH_REACH],
		maxlength: [18, FIRST_NAME_MAXLENGTH_REACH],
		trim: [false],
	},
	lastName: {
		type: ["string", LAST_NAME_INVALID_TYPE],
		Type: [String, LAST_NAME_INVALID_TYPE],
		required: [false],
		minlength: [1, LAST_NAME_MINLENGTH_REACH],
		maxlength: [18, LAST_NAME_MAXLENGTH_REACH],
		trim: [false],
	},

	macAddress: {
		type: ["string", MAC_ADDRESS_INVALID_TYPE],
		Type: [String, MAC_ADDRESS_INVALID_TYPE],
		unique: [true, MAC_ADDRESS_EXIST],
		required: [true, MAC_ADDRESS_REQUIRED],
		minlength: [12, MAC_ADDRESS_MINLENGTH_REACH],
		maxlength: [16, MAC_ADDRESS_MAXLENGTH_REACH],
		trim: [true],
	},
	privateID: {
		type: ["string", PRIVATE_ID_INVALID_TYPE],
		Type: [String, PRIVATE_ID_INVALID_TYPE],
		unique: [true, PRIVATE_ID_EXIST],
		required: [true, PRIVATE_ID_REQUIRED],
		minlength: [30, PRIVATE_ID_MIN_LENGTH_REACH],
		maxlength: [35, PRIVATE_ID_MAX_LENGTH_REACH],
		trim: [true],
	},
	tokens: {
		type: ["array", TOKENS_INVALID_TYPE],
		Type: [Array, TOKENS_INVALID_TYPE],
		unique: [true, TOKENS_EXIST],
		required: [true],
	},
	username: {
		type: ["string", USERNAME_INVALID_TYPE],
		Type: [String, USERNAME_INVALID_TYPE],
		unique: [true, USERNAME_EXIST],
		required: [false],
		minlength: [4, USERNAME_MINLENGTH_REACH],
		maxlength: [12, USERNAME_MAXLENGTH_REACH],
		trim: [true],
		lowercase: [true],
	},
};

module.exports = { schemaUserTemplate };
