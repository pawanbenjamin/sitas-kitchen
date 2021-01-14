const router = require("express").Router();

router.use("/achars", require("./achars"));
router.use("/users", require("./users"));
router.use("/orders", require("./orders"));

module.exports = router;
