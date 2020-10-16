require("dotenv").config();
// Importing Deps.
const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const morganMiddleware = require("./morgan-color");
const cookieParser = require("cookie-parser");
const passportCongfig = require("./passport");
const path = require("path");

// Initialise App
const app = express();
const PORT = process.env.PORT || 5000;

// Imorting Routes
const userRouter = require("./routes/User");
const dustbinRouter = require("./routes/Dustbins");

// Use
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userRouter);
app.use("/api/dustbins", dustbinRouter);

// Connect to DB
mongoose.connect(
  keys.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB Connected");
  }
);

// FOLLOWING CODE IS USED WHEN DEPLOYED TO HEROKU
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Listen at available PORT
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
