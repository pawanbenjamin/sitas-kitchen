const db = require("../index");
const Sequelize = require("sequelize");
const Achar_Order = require("./achar_order");

const Order = db.define("order", {
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    default: false,
  },
});

// Before Update?
Order.prototype.setCartTotal = async function (order) {
  const acharOrder = await Achar_Order.findAll({
    where: {
      orderId: order.id,
    },
  });
  let newTotal = 0;
  acharOrder.forEach((achar) => {
    newTotal += achar.historicalPrice * achar.qty;
  });
  order.total = newTotal;
  order.save();
};

module.exports = Order;
