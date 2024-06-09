const fs = require("fs").promises;
const filepath = "./recipes.json";

function getAllRecipes() {
  return fs
    .readFile(filepath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((err) => {
      if (err.code === "ENOENT") return [];
      throw err;
    });
}

function saveRecipe(recipes) {
  return fs
    .writeFile(filepath, JSON.stringify(recipes, null, 2), "utf-8")
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  getAllRecipes,
  saveRecipe,
};
