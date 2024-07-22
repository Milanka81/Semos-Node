const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWTData = require("../config/JWT_SECRET");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Data is missing...");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email or password is wrong");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Email od password is wrong");
    }
    // res.send("Login successful");
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWTData.JWT_SECRET,
      { expiresIn: "60m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      JWTData.JWT_SECRET_REFRESH,
      { expiresIn: "7d" }
    );
    user.refreshToken = refreshToken;
    await user.save();
    res.json({ token, refreshToken });
  } catch (error) {
    return res.status(500).send(err);
  }
});

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).send("Refresh token is required");
  }
  try {
    const decoded = jwt.verify(refreshToken, JWTData.JWT_SECRET_REFRESH);
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).send("Invalid refresh token");
    }
    const newToken = jwt.sign(
      { userId: user._id, role: user.role },
      JWTData.JWT_SECRET,
      { expiresIn: "10m" }
    );
    const newRefreshToken = jwt.sign(
      { userId: user._id, role: user.role },
      JWTData.JWT_SECRET_REFRESH,
      { expiresIn: "7d" }
    );
    user.refreshToken = newRefreshToken;
    await user.save();
    res.json({ newToken, newRefreshToken });
  } catch (err) {
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
