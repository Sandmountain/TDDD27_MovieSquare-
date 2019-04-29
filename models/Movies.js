const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//The movie schema
const movieSchema = new Schema({
  movieID: {
    type: String,
    required: true
  },
  movieGenre: Array,
  movieTitle: {
    type: String,
    required: true
  },
  imgURL: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Movie = mongoose.model("watchlist", movieSchema);
