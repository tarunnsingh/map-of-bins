require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const morganMiddleware = require("./morgan-color");
const cookieParser = require("cookie-parser");
const passportCongfig = require("./passport");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

const userRouter = require("./routes/User");
const dustbinRouter = require("./routes/Dustbins");

app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRouter);
app.use("/api/dustbins", dustbinRouter);

mongoose.connect(
  keys.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB Connected");
  }
);

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "You have hit the clean-city server",
//     error: false,
//   });
// });

// FOLLOWING CODE IS USED WHEN DEPLOYED TO HEROKU

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
