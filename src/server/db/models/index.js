const Sequelize = require("sequelize");
const db = require("../../db");
const Achar = require("./achar");
const User = require("./user");
const Order = require("./order");
const Achar_Order = require("./achar_order");

// One to Many
User.hasMany(Order);
Order.belongsTo(User);

// Many to Many
Order.hasMany(Achar);
Achar.belongsToMany(Order, { through: Achar_Order });

// Export all models in object
module.exports = {
  Achar,
  User,
  Order,
  Achar_Order,
};
