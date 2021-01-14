const db = require("../index");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const Achar_Order = db.define("Achar_Order", {
  qty: {
    type: Sequelize.INTEGER,
  },
  historicalPrice: Sequelize.INTEGER,
});

module.exports = Achar_Order