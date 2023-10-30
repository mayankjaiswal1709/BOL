const router = require("express").Router();
const emailRouter = require("../routes/emailRoutes");

router.use("/user", emailRouter);

module.exports = router;
