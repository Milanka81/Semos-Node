const express = require("express");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const moviesRoutes = require("./routes/movie");
const authService = require("./middleware/auth");
require("./config/db");

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/movies", authService.authenticate, moviesRoutes);

app.listen(PORT, "localhost", () => {
  console.log("server connected");
});
