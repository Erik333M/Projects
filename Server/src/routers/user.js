const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const checkEmail = require("../sendM")

const router = express.Router();

router.post("/users", async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    console.dir(user);
    console.log("New user created");
    await user.save();
    console.log("New user saved");
    const token = await user.generateAuthToken();
    const chekEmailToken = jwt.sign({ _id: user._id }, process.env.JWT_KEY_CHECK_EMAIL);
    await checkEmail(chekEmailToken)
    console.log("New user auth token generated");
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});
router.post("/users/verificationemail", auth, async (req, res) => {
  try {
    const data = jwt.verify(req.body.token, process.env.JWT_KEY_CHECK_EMAIL);
    if (data._id == req.user._id) {
      req.user.checkEmail = true
      await req.user.save();
    } else {
      throw new Error();
    }
    res.send();
  } catch (error) {
    res.status(400).send(error)
  }

})

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
});

router.post("/users/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
