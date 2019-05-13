const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//store both
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

const UserWatchlistSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  watchlist: [movieSchema],
  history: [movieSchema]
});

module.exports = userWatchlistSchema = mongoose.model(
  "user_watchlist",
  UserWatchlistSchema
);
