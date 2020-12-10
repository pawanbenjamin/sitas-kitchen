const router = require("express").Router();
const Achar = require("../db/models/achar");

router.get("/", async (req, res, next) => {
  try {
    const achars = await Achar.findAll();
    res.send(achars);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const achar = Achar.create(req.body);
    res.send(achar);
  } catch (error) {
    next();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const achar = await Achar.findByPk(req.params.id);
    await achar.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const achar = await Achar.findByPk(req.params.id);
    res.send(achar);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
