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

router.post(
  "/local/signin",
  validateBody(schemas.localUserSchema),
  passport.authenticate("localStrat", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ msg: "Suceessful login!!", token });
  }
);

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

router.post(
  "/oauth/facebook",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    const token = signToken(req.user);

    res.json({ msg: "Wey logged in with fb!!!", token });
  }
);

router.post(
  "/oauth/google",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = signToken(req.user);
    const tempUser = req.user;
    res.json({ msg: "Wey logged in with google!!!", token, tempUser });
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ msg: "You made it to the secure profile page!" });
  }
);
module.exports = router;
