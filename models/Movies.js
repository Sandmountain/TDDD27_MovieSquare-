const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  movieAPI_id: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Movie = mongoose.model("movie", movieSchema);
