const { customRequest } = require("@/functions/helpers/CustomRequest");
const { userProps } = require("@/functions/helpers/UserProps");

const {
  firstNameFailureTests,
  firstNameSuccessTests,
} = require("$/api/generalTests/firstNameTests");
const {
  lastNameFailureTests,
  lastNameSuccessTests,
} = require("$/api/generalTests/lastNameTests");
const {
  countryCodeSuccessTests,
} = require("$/api/generalTests/countryCodeTests");
const {
  countryNameSuccessTests,
} = require("$/api/generalTests/countryNameTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const {
  phoneNumberSuccessTests,
} = require("$/api/generalTests/phoneNumberTests");
const { privateIdSuccessTests } = require("$/api/generalTests/privateIdTests");

const {
  userRoutes: { userRouteBaseUrl, createNewUserRoute },
} = require("@/variables/routes/userRoutes");
const { tokenSuccessTests } = require("$/api/generalTests/tokenTests");
const { envManager } = require("@/functions/utilities/EnvironmentManager");

const fullName = userProps.makeTestFullName();

describe("", () => {
  it("should test routes properties for CustomRequest", async () => {
    customRequest.setRequestRequirements(userRouteBaseUrl, createNewUserRoute);
    customRequest.setVerifyTokenFromEnv();
  });
});

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    const {
      body: {
        user: {
          countryCode,
          countryName,
          firstName,
          lastName,
          mainToken,
          phoneNumber,
          privateId,
        },
      },
    } = await customRequest.sendRequest(fullName);

    await tokenSuccessTests({
      tokenTest: mainToken,
      secret: envManager.getJwtSecrets().JWT_MAIN_SECRET,
    });

    countryCodeSuccessTests(
      { countryCodeTest: countryCode },
      { stringEquality: false }
    );

    countryNameSuccessTests(
      { countryNameTest: countryName },
      { stringEquality: false }
    );

    phoneNumberSuccessTests(
      { phoneNumberTest: phoneNumber },
      { stringEquality: false }
    );

    privateIdSuccessTests(
      { privateIdTest: privateId },
      { stringEquality: false }
    );

    firstNameSuccessTests({
      firstNameTest: firstName,
      firstNameMain: fullName.firstName,
    });

    lastNameSuccessTests({
      lastNameTest: lastName,
      lastNameMain: fullName.lastName,
    });
  });
});

describe("failure tests for create new normal user", () => {
  firstNameFailureTests(fullName);
  lastNameFailureTests(fullName);
  authenticationFailureTests();
});
