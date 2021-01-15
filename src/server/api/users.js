const router = require("express").Router();
const { User, Achar, Order } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        all: true,
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/orders", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/cart", async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {
        userId: req.params.id,
        isComplete: false,
      },
      include: {
        model: Achar,
      },
    });
    res.send(cart[0]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
