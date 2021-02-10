const router = require("express").Router();
const { Order, Achar, Achar_Order } = require("../db/models");

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
    const cart = await Order.findByPk(req.params.orderId);
    const achar = await Achar.findByPk(req.params.acharId);
    await cart.addAchar(achar, {
      through: {
        historicalPrice: achar.price,
      },
    });
    // use save() on model to fire the aftersave or update()
    // const acharOrder = await Achar_Order.findAll({
    //   where: {
    //     orderId: cart.id,
    //   },
    // });
    // let newTotal = 0;
    // acharOrder.forEach((achar) => {
    //   newTotal += achar.historicalPrice * achar.qty;
    // });
    // cart.total = newTotal;
    // cart.save();
    await cart.setCartTotal(cart);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});



router.delete("/:orderId/removeProduct/:acharId", async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.orderId);
    const achar = await Achar.findByPk(req.params.acharId);
    await cart.removeAchar(achar);
    await cart.setCartTotal(cart);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
