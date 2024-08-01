require("dotenv").config();
const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const text = `<body><h1>Hello There</h1><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<//div></body>`;
const data = {
  from: "Your App <noreply@yourDomail.com>",
  to: "mina.m81@gmail.com",
  subject: "Hello from Mail Gun",
  text: "Testiing Mailgun with Node.js is easy",
};

// mg.messages().send(data, function (error, body) {
//   if (error) {
//     console.log("Error: ", error);
//   } else {
//     console.log("Email sent: ", body);
//   }
// });
