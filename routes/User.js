const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportCongfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

// RETURNS A SIGNED JSON WEB TOKEN
const signedToken = (userID) => {
  return JWT.sign(
    {
      iss: "TarunSingh",
      sub: userID,
    },
    keys.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  console.log("HITTING REGISTER ROUTE");
  const { email, password, name } = req.body;
  console.log(email, password, name);
  User.findOne({ email }, (err, user) => {
    if (err)
      return res
        .status(500)
        .json({ message: { msgBody: "An error occured.", msgError: true } });
    if (user)
      return res.status(400).json({
        message: { msgBody: "Email already taken.", msgError: true },
      });
    else {
      console.log("CREATING NEW USER");
      const newUser = new User({
        email,
        password,
        name,
      });
      newUser.save((err) => {
        if (err)
          return res.status(500).json({
            message: {
              msgBody: "Error occured while saving details to DB. Try Again!",
              msgError: true,
            },
          });
        else
          return res.status(201).json({
            message: {
              msgBody:
                "Account succesfully created. Please Login with the credentials.",
              msgError: false,
            },
          });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, name, email } = req.user;
      const token = signedToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { email, name },
        message: { msgBody: "Login Succesful", msgError: false },
      });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({
      isAuthenticated: false,
      user: { email: "", name: "" },
      message: { msgBody: "Logged Out Successfully", msgError: false },
    });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email, name } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        email,
        name,
      },
    });
  }
);

module.exports = userRouter;
