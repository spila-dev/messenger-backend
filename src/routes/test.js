const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const testRouteBuilder = routeBuilder(baseUrls.test);

const getAllUsers = testRouteBuilder
  .create()
  .method("get")
  .url("/getAllUsers")
  .statusCode(200)
  .build();

const routes = {
  getAllUsers,
};

const test = {
  ...routes,
  version: versionCalculator(extractVersions(routes)),
};

module.exports = { test };
