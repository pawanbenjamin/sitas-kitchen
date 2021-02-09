const db = require("../index");
const Sequelize = require("sequelize");

const Order = db.define("order", {
  total: {
    type: Sequelize.INTEGER,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
});



module.exports = Order;
