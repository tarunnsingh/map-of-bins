const express = require("express");
const dustbinsRouter = express.Router();

dustbinsRouter.get("/", (req, res) => {
  console.log("RESS");
});

module.exports = dustbinsRouter;
