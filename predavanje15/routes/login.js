const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Data is missing...");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email od password is wrong");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Email od password is wrong");
    }
    res.send("Login successful");
  } catch (error) {
    return res.status(500).send(err);
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return;
    const user = await User.findOne({ email });
    if (!user) {
      res.send("Invalid data");
    }
    const link = `http://localhost:3000/reset-password/${user.id}`;
    res.send(link);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/reset-password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const passHash = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      id,
      { password: passHash },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
