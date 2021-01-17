const Sequelize = require("sequelize");
const pkg = require("../../../package-lock.json");

const dbName = pkg.name;

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {
    logging: false,
  }
);

module.exports = db;
