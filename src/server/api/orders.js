const router = require("express").Router();
const { Order, Achar } = require("../db/models");

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

// post guest cart to orders
// /:id, id is guest
router.post("/:guest", async (req, res, next) => {
  try {
    const guestOrder = Order.create(req.body);

    res.json(guestOrder);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/addProduct/:acharId", async (req, res, next) => {
  try {
    console.log("REQ BODY", req.body);
    const cart = await Order.findByPk(req.params.orderId);
    const achar = await Achar.findByPk(req.params.acharId);
    await cart.addAchar(achar);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.put("/:orderId/removeProduct/:acharId", async (req, res, next) => {
  try {
    console.log("REQ BODY", req.body);
    const cart = await Order.findByPk(req.params.orderId);
    const achar = await Achar.findByPk(req.params.acharId);
    await cart.removeAchar(achar);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
