const router = require("express").Router();
const { Order } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: {
        all: true,
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
