const router = require("express").Router();
const { User } = require("../db/models");
const { Order } = require("../db/models");

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

module.exports = router;
