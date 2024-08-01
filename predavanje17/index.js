const express = require("express");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog");
const authService = require("./middleware/auth");

const app = express();
const PORT = 80;
app.use(bodyParser.json());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/blogs", authService.authenticate, blogRoutes);

app.listen(PORT, () => {
  console.log("server connected");
});
