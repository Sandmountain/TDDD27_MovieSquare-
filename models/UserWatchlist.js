const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//store both
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

const UserWatchlistSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  watchlist: [movieSchema]
});

module.exports = userWatchlistSchema = mongoose.model(
  "user_watchlist",
  UserWatchlistSchema
);
