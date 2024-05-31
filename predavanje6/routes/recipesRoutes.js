const express = require("express");

const router = express.Router();

const recipesController = require("../controllers/recipesController");

router.get("/recipes", recipesController.getRecipes);
router.post("/recipes", recipesController.createRecipe);
router.put("/recipes", recipesController.updateRecipe);
router.delete("/recipes", recipesController.deleteRecipe);

module.exports = router;
