const express = require("express");
const logInRoutes = require("./routes/login");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
require("./config/db");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/validate", logInRoutes);

app.listen(PORT, "localhost", () => {
  console.log("server connected");
});
