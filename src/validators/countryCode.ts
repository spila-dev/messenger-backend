import { customTypeof } from "custom-typeof";
import { Result, errorThrower, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";
import { countries } from "@/variables/others/countries";

const validator = ValidationModelBuilder.compiler(
  models.validation.user.countryCode
);

export const countryCodeValidator = async (countryCode: unknown) => {
  const validationResult = await validator({
    countryCode,
  });
  errorChecker(validationResult, countryCode);
};

const errorChecker = (result: Result, countryCode: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryCode === countryCode);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.COUNTRY_CODE_NOT_SUPPORTED
    );

    return;
  }

  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedCountryCode: countryCode,
      },
    },
    models.native.user.countryCode
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringNumeric()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.COUNTRY_CODE_INVALID);
  });
};
