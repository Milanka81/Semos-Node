const recipesModel = require("../models/recipesModel");
const { v4: uuidv4 } = require("uuid");

async function createRecipe(req, res) {
  try {
    const newRecipe = { id: uuidv4(), ...req.body };
    const recipes = await recipesModel.getAllRecipes();
    if (recipes.some((recipe) => recipe.name === newRecipe.name)) {
      res.render("new-recipe", {
        title: "Add New Recipe",
        error: "Recipe already exists",
      });
    } else {
      recipes.push(newRecipe);

      await recipesModel.saveRecipe(recipes);

      res.redirect("/");
    }
  } catch (err) {
    res.status(500).json({ error: "Recipe isn't saved" });
  }
}
async function updateRecipe(req, res) {
  try {
    const editedRecipe = req.body;
    const recipes = await recipesModel.getAllRecipes();
    const recipeIndex = recipes.findIndex((el) => el.id === editedRecipe.id);
    recipes[recipeIndex] = editedRecipe;

    await recipesModel.saveRecipe(recipes);
    res.status(201).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Recipe isn't edited" });
  }
}
async function deleteRecipe(req, res) {
  try {
    const recipeToDelete = req.body;
    let recipes = await recipesModel.getAllRecipes();
    const filteredRecipes = recipes.filter((el) => el.id !== recipeToDelete.id);

    await recipesModel.saveRecipe(filteredRecipes);
    res.status(201).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Recipe isn't deleted" });
  }
}

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
