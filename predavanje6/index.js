const express = require("express");
const app = express();

const recipesRoutes = require("./routes/recipesRoutes");

app.use(express.urlencoded({ extended: true }));

app.use("/api", recipesRoutes);
const PORT = 3000;

app.listen(PORT, "localhost", () => {
  console.log("Server listening for the requests on the port 3000");
});
