const Sequelize = require("sequelize");
const pkg = require("../../../package-lock.json");

const dbName = pkg.name;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  "postgres",
  "",
  {
    logging: false,
    dialect: "postgres",
  }
);

module.exports = db;
