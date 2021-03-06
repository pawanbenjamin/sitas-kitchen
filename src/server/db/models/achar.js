const db = require("../index");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const Achar = db.define("achar", {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  },
  spiceLevel: {
    type: Sequelize.INTEGER,
    [Op.between]: [0, 6],
  },
  stockQty: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: "https://nepalimoms.com/recipes/vegMomo/vegMomo_achar.jpg",
  },
});

module.exports = Achar;
