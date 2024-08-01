require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mailgun = require("mailgun-js");
const jwt = require("jsonwebtoken");
const registerUser = require("./auth/auth-service");
const User = require("./models/User");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Failed to connected to DB", err));

app.post("/register", async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({
      message:
        "User created successfully, check your email for the verification",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/verify-email", async (req, res) => {
  try {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).send({ message: "User doesn't exist" });
    }
    user.isVerified = true;
    await user.save();

    res.status(200).json({
      message: "Email is verified successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
