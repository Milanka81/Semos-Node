const recipesModel = require("../models/recipesModel");
const fs = require("fs").promises;
const path = require("path");

async function getRecipes(req, res) {
  try {
    const recipes = await recipesModel.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Recipes cannot be fetched" });
  }
}

async function renderRcipesPage(req, res) {
  try {
    const recipes = await recipesModel.getAllRecipes();

    const template = await fs.readFile(
      path.join(__dirname, "../views/recipes.html"),
      "utf-8"
    );

    let recipesListHtml = recipes
      .map(
        (recipe) =>
          `<li class="container list-unstyled border-bottom p-3"> <h6> ${recipe.name}</h6> <p>Ingredients : ${recipe.ingredients}</p></li>`
      )
      .join("");
    let populatedHtml = template.replace("{{recipesList}}", recipesListHtml);

    res.send(populatedHtml);
  } catch (err) {
    res.status(500).send(`Error loading dynamic context : ${err}`);
  }
}

module.exports = {
  getRecipes,
  renderRcipesPage,
};
