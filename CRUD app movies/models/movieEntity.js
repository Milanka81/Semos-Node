const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  actors: { type: String, required: true },
  year: {
    type: Number,
    required: true,
  },
  genre: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

// Dodavanje transform funkcije koja uklanja __v polje
movieSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  },
});

movieSchema.set("toObject", {
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
