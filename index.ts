import path from "path";

const calcNodeVersion = () => {
  return process.env.npm_config_user_agent
    ?.split("node/v")[1]
    ?.split(" ")[0]
    ?.slice(0, 2);
};

const NODE_ENV = process.env.NODE_ENV;

const NODE_VERSION =
  process.env.NODE_VERSION ||
  process.env.NODE_VERSION_DEFAULT ||
  calcNodeVersion() ||
  "18";

const BUILD_FOLDER_NAME = `node${NODE_VERSION.slice(0, 2)}`;

const start = async () => {
  try {
    if (isProduction()) return await runProduction();

    if (NODE_ENV?.includes("test")) return runTest();

    runDev();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const isProduction = () =>
  ["production", "production_local"].some((i) => i === NODE_ENV);

const runProduction = async () => {
  const appPath = path.join(__dirname, "build", BUILD_FOLDER_NAME, "app.js");
  const app = import(appPath);
  (await app).runner();
};

const runTest = async () => {
  const path = getTestServerPath();
  const requirements = await getTestServerRequirements(path);
  await runRequirements(requirements);
};
const getTestServerPath = () => {
  const paths = [__dirname];
  if (NODE_ENV === "test_production_local")
    paths.push("build", BUILD_FOLDER_NAME);
  paths.push("test");
  return path.join(...paths);
};
const getTestServerRequirements = async (path) => {
  return (await import(path)).requirements;
};
const runRequirements = async (requirements) => {
  await requirements.database();
  await requirements.testServer();
};

const runDev = async () =>
  (await import(path.join(__dirname, "src", "servers"))).runner();

start();