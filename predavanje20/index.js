const express = require("express");
const weather = require("./handlers/weather");
const character = require("./handlers/theRickAndMortyAPI");

const api = express();

api.get("/api/weather/:city", weather.getCity);
api.get("/api/character/:id", character.getCharacter);

api.listen(10000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started on port 10000");
});
