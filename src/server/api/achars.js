const router = require("express").Router();
const Achar = require("../db/models/achar");

// /api/achars

router.get("/", async (req, res, next) => {
  try {
    const achars = await Achar.findAll({
      include: {
        all: true,
      },
    });
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

router.put("/:id", async (req, res, next) => {
  try {
    const achar = await Achar.findByPk(req.params.id);
    if (!achar) res.sendStatus(404);
    const updatedAchar = achar.update(req.body);
    res.send(updatedAchar);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
