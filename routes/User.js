const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportCongfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");
const path = require("path");
const mongoose = require("mongoose");

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
  const { username, password, role, originalName, email } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) responseHandler(err, null, null, null, res);
    if (user) responseHandler(null, null, user, "usernameTaken", res);
    else {
      const newUser = new User({
        username,
        password,
        role,
        originalName,
        email,
      });
      newUser.save((err) => {
        if (err) responseHandler(err, "userOnSave", null, null, res);
        else responseHandler(null, null, null, "createdAcc", res);
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role, originalName, email } = req.user;
      const token = signedToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { username, role, originalName },
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
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      username,
      role,
      originalName,
      userIntro,
      createdAt,
      lastUpdated,
      coverPhotoUrl,
    } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        username,
        role,
        originalName,
        userIntro,
        createdAt,
        lastUpdated,
        coverPhotoUrl,
      },
    });
  }
);

module.exports = userRouter;
