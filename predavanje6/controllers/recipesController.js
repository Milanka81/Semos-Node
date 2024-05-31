const recipesModel = require("../models/recipesModel");
const { v4: uuidv4 } = require("uuid");

async function getRecipes(req, res) {
  try {
    const recipes = await recipesModel.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Recipes cannot be fetched" });
  }
}

async function createRecipe(req, res) {
  try {
    const newRecipe = { id: uuidv4(), ...req.body };
    const recipes = await recipesModel.getAllRecipes();

    recipes.push(newRecipe);

    await recipesModel.saveRecipe(recipes);

    res.status(201).json(newRecipe);
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
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
