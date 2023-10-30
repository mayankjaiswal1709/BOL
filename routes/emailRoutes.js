const userRouter = require("express").Router();
const user = require("../controller/emailController");

userRouter.post("/sendmail", user.addClient);

module.exports = userRouter;
