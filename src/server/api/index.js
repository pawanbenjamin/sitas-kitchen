const router = require("express").Router();

router.use("/achars", require("./achars"));
router.use("/users", require("./users"));
router.use("/orders", require("./orders"));
router.use("/achar_order", require("./achar_order"));

module.exports = router;
