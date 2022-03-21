const path = require("path");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const prettyError = require("pretty-error");
const serveFavicon = require("serve-favicon");

const { bodyClarify } = require("~/middlewares/bodyClarify");
const { errorCollector } = require("~/middlewares/errorCollector");
const { errorResponser } = require("~/middlewares/errorResponser");
const { lifeLine } = require("~/routers/lifeLine");

//TODO Use NODE_ENV for dev&prod modes

const middleLine = ({ server, express }) => {
  try {
    //* PrettyError is prettier for nodeJS errors in console.
    prettyError.start();

    server.use(cors());
    server.use(helmet());
    server.use(morgan("dev"));
    server.use(express.json());

    server.use(bodyClarify);

    server.use((req, res, next) => {
      res.errors = {
        categorized: [],
        uncategorized: [],
        server: [],
        statusCode: 400,
        serverLength: 0,
        categorizedLength: 0,
        uncategorizedLength: 0,
      };

      res.errorCollector = ({ data }) => {
        errorCollector({ req, res, next, data });
      };

      next();
    });

    server.use((req, res, next) => {
      res.errorResponser = () => {
        errorResponser(req, res, next);
      };

      next();
    });

    server.use(
      serveFavicon(
        path.join(
          __dirname,
          "..",
          "..",
          "public",
          "assets",
          "icons",
          "favicon",
          "favicon.ico"
        )
      )
    );

    server.use((req, res, next) => {
      logger
        .blue("----------------")
        .bgBlue({ text: "Request arrived: " })
        .bgCyan(req.url)
        .blue("----------------")
        .log();

      next();
    });

    //* Your statics is here =>
    server.use(express.static("~/../public"));

    //* All routers is in lifeLine =>
    server.use(lifeLine);
  } catch (error) {
    console.log("middleLine catch", error);
  }
};

module.exports = { middleLine };
