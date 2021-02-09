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

// post guest cart to orders
// /:id, id is guest
router.post('/:guest', async(req, res, next)=> {
  try {
    const guestOrder = Order.create(req.body)

    res.json(guestOrder)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.id);
    const updatedCart = await cart.update(req.body);
    res.json(updatedCart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
