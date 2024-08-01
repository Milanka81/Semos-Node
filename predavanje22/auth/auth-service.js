require("dotenv").config();
const bcrypt = require("bcrypt");
const mailgun = require("mailgun-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateHTML = require("../email/generate-html");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const emailTemplate = `<h1>Welcome, {{ name}} !</h1>
<p>Please confirm your email address by clicking on this link</p>
<a href="{{verificationLink }}"> Verify email </a>`;

async function registerUser(userData) {
  const { name, email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  const verificationToken = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET,
    { expiresIn: "10h" }
  );
  const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

  const emailHTML = generateHTML(emailTemplate, { name, verificationLink });
  const data = {
    from: "Your App <noreply@yourDomail.com>",
    to: "mina.m81@gmail.com",
    subject: "Hello from Mail Gun",
    html: emailHTML,
  };

  await mg.messages().send(data);
  return newUser;
}
module.exports = registerUser;
