const router = require("express").Router();
const emailRouter = require("../routes/emailRoutes");
const userRouter = require("../routes/userRoutes");
const blogRouter = require("../routes/blogRoutes");

router.use("/user", emailRouter);
router.use("/user", userRouter);
router.use("/user", blogRouter);

module.exports = router;
