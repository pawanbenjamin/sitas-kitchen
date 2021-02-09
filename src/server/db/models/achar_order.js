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

Achar_Order.beforeUpdate(async (a_o) => {
  try {
    let achar = await a_o.getAchar();
    let price = achar.price;
    a_o.historicalPrice = price;
  } catch (error) {
    console.error(error);
  }
});

module.exports = Achar_Order;
