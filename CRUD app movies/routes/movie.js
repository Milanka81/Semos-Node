const express = require("express");
const router = express.Router();
const Movie = require("../models/movieEntity");
// const authMethods = require("../middleware/auth");

router.post("/movies", async (req, res) => {
  const { title, director, actors, year, genre } = req.body;
  try {
    const movie = new Movie({
      title,
      director,
      actors,
      year,
      genre,
      user: req.userId,
    });

    await movie.save();

    res.status(201).send("Movie created");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.userId });
    res.send(movies);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      return res.status(404).send();
    }
    res.send(movie);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send();
    }
    res.send(null);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
