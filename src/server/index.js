const path = require("path");
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const createApp = () => {
  app.use(morgan("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use("/auth", require("./auth"));
  app.use("/api", require("./api"));

  // app.use((req, res, next) => {
  //   if (path.extname(req.path).length) {
  //     const err = new Error("Not found");
  //     err.status = 404;
  //     next(err);
  //   } else {
  //     next();
  //   }
  // });

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public/index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  const server = app.listen(3000, () => {
    console.log(`listening on port 3000!`);
  });
  // could set up socket server here
};

const syncDb = () => db.sync();

syncDb();
createApp();
startListening();
