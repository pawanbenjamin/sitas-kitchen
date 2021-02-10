const router = require("express").Router();
const { Order, Achar } = require("../db/models");
const Achar_Order = require("../db/models/achar_order");

router.get("/", async (req, res, next) => {
  try {
    const achar_orders = await Achar_Order.findAll();
    res.send(achar_orders);
  } catch (error) {
    next(error);
  }
});

router.put("/add", async (req, res, next) => {
  try {
    const achar_order = await Achar_Order.findOne({
      where: {
        orderId: req.body.orderId,
        acharId: req.body.acharId,
      },
    });

    achar_order.qty++;
    await achar_order.save();
    // stock qty should decrement
    // Get cart
    const cart = await Order.findByPk(req.body.orderId, {
      include: Achar,
    });
    cart.setCartTotal(cart);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.put("/subtract", async (req, res, next) => {
  try {
    const achar_order = await Achar_Order.findOne({
      where: {
        orderId: req.body.orderId,
        acharId: req.body.acharId,
      },
    });

    achar_order.qty--;
    await achar_order.save();
    // stock qty should decrement
    // Get cart
    const cart = await Order.findByPk(req.body.orderId, {
      include: Achar,
    });
    cart.setCartTotal(cart);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
