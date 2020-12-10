const router = require("express").Router();
const Achar = require("../db/models/achar");

router.use("/", async (req, res, next) => {
  try {
    const achars = await Achar.findAll();
    res.send(achars);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
