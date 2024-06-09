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

module.exports = {
  getRecipes,
};
