const path = require("path");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const sessionStore = new SequelizeStore({ db });
const dotenv = require("dotenv");
const passport = require("passport");
const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (error) {
    done(err);
  }
});

const createApp = () => {
  app.use(morgan("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  sessionStore.sync();

  app.use(
    session({
      secret: "my best friend is Zaira",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use("/auth", require("./auth"));
  app.use("/api", require("./api"));

  app.use("/test", (req, res, next) => {
    res.send(req.user);
  });
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
  const server = app.listen(PORT, () => {
    console.log(`listening on port 3000!`);
  });
  // could set up socket server here
};

const syncDb = () => db.sync();

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
}

bootApp();
