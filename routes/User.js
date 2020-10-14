const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log("RESS");
});

module.exports = userRouter;
