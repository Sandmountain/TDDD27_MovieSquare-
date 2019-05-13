const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//The movie schema
const movieSchema = new Schema({
  movieID: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  originalTitle: {
    type: String
  },
  movieOverview: {
    type: String
  },
  movieRating: {
    type: String
  },
  movieLanguage: {
    type: String
  },
  releaseDate: {
    typ: String
  },
  movieGenre: Array,
  imgURL: {
    type: String
  },
  backdropURL: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Movie = mongoose.model("watchlist", movieSchema);
