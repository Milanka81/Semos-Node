const express = require("express");
const app = express();
const recipesModel = require("./models/recipesModel");
//const path = require("path");

app.set("view engine", "ejs");
//app.set("views", path.join(__dirname, "views"));
const recipesRoutes = require("./routes/recipesRoutes");

app.use(express.urlencoded({ extended: true }));

app.use("/", recipesRoutes);
const PORT = 3000;

app.get("/", async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  res.render("recipes", { title: "All Recipes", recipes });
});

app.get("/new-recipe", (req, res) => {
  res.render("new-recipe", { title: "Add New Recipe" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

app.listen(PORT, "localhost", () => {
  console.log(`Server listening for the requests on the port ${PORT}`);
});
