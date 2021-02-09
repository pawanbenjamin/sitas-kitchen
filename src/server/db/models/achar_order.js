const db = require("../index");
const Sequelize = require("sequelize");
const Achar = require("./achar");

const Achar_Order = db.define("Achar_Order", {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  historicalPrice: Sequelize.INTEGER,
});



module.exports = Achar_Order;
