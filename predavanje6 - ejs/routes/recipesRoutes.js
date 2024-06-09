const express = require("express");

const router = express.Router();

const recipesController = require("../controllers/recipesController");
const newRecipeController = require("../controllers/newRecipeController");

router.get("/recipes", recipesController.getRecipes);
router.post("/recipes", newRecipeController.createRecipe);
router.put("/recipes", newRecipeController.updateRecipe);
router.delete("/recipes", newRecipeController.deleteRecipe);

module.exports = router;
