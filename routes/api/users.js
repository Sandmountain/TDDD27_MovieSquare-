const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("config");

const passportFile = require("../../passport");
const { schemas, validateBody } = require("../../helpers/routeHelpers");
const User = require("../../models/User");

// Creates a token
signToken = user => {
  return jwt.sign(user.toObject(), config.get("jwtSecret"), {
    expiresIn: "24h"
  });
};

// @route  POST api/user/local/signin
// @desc   Logging in using a local user
// @access Public
router.post(
  "/local/signin",
  validateBody(schemas.localUserSchema),
  passport.authenticate("localStrat", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ msg: "Suceessful login!!", token });
  }
);

// @route  POST api/user/local/register
// @desc   Register a local user
// @access Public
router.post(
  "/local/register",
  validateBody(schemas.localUserSchema),
  async (req, res) => {
    const { name, email, password } = req.value.body;

    // Checking if a user with the same email exist.
    const user = await User.findOne({ "local.email": email });

    if (user) {
      return res
        .status(403)
        .json({ msg: "User with that email already exists" });
    }

    // Creating new user
    const newUser = new User({
      method: "local",
      local: {
        name,
        email,
        password
      }
    });

    // Saving user to DB
    await newUser.save();

    // Generate token for user
    const token = signToken(newUser);

    res.status(200).json({ msg: "Successful registration", newUser, token });
  }
);

// @route  POST api/user/oauth/facebook
// @desc   logging in with facebook
// @access Public
router.post(
  "/oauth/facebook",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    const tempUserID = req.user._id;

    res.json({ msg: "Wey logged in with fb!!!", token, tempUserID });
  }
);

// @route  POST api/user/oauth/google
// @desc   logging in with google
// @access Public
router.post(
  "/oauth/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    const tempUserID = req.user._id;
    res.json({ msg: "Wey logged in with google!!!", token, tempUserID });
  }
);
// @route  POST api/user/profile
// @desc   Authenticate profile for routing
// @access Public
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ msg: "You made it to the secure profile page!" });
  }
);
module.exports = router;
