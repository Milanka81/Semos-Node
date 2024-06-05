const express = require("express");

const router = express.Router();
const path = require("path");
const recipesController = require("../controllers/recipesController");
const newRecipeController = require("../controllers/newRecipeController");

router.get("/recipes", recipesController.getRecipes);
router.post("/recipes", newRecipeController.createRecipe);
router.put("/recipes", newRecipeController.updateRecipe);
router.delete("/recipes", newRecipeController.deleteRecipe);
router.get("/", recipesController.renderRcipesPage);

router.get("/new-recipe", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/new-recipe.html"));
});

module.exports = router;
