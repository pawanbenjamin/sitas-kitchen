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
    const order = await Order.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        all: true,
      },
    });
    res.send(order[0]);
  } catch (error) {
    next(error);
  }
});

// post guest cart to orders
// /:id, id is guest
router.post("/:guest", async (req, res, next) => {
  try {
    let acharIds = Object.keys(req.body);
    console.log("ACHAR IDSSSSS", acharIds);
    const order = await Order.create({ userId: null, isComplete: false });
    for (const acharId of acharIds) {
      const achar = await Achar.findByPk(Number(acharId));
      await order.addAchar(achar, {
        through: {
          historicalPrice: achar.price,
        },
      });
      const achar_order = await Achar_Order.findOne({
        where: {
          acharId: Number(acharId),
          orderId: order.id,
        },
      });
      if (achar_order.qty === 1) {
        achar_order.qty++;
      } else {
        achar_order.qty = 1;
      }
      achar_order.save();
    }
    order.save();
    const cart = await Order.findByPk(order.id, {
      include: {
        all: true,
      },
    });
    cart.setCartTotal(cart);
    res.json(cart);
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
