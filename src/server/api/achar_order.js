const router = require("express").Router();
const Achar_Order = require("../db/models/achar_order");

router.get("/", async (req, res, next) => {
  try {
    const achar_orders = await Achar_Order.findAll();
    res.send(achar_orders);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const achar_order = await Achar_Order.findOrCreate({
      where: {
        orderId: req.body.orderId,
        acharId: req.body.acharId,
      },
    });
    console.log(achar_order);
    if (achar_order.qty >= 1) {
      achar_order.qty++;
    } else {
      achar_order.qty = 1;
    }
    res.json(achar_order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
