const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userID: {
    type: String
    // required: true
  },
  userName: {
    type: String
    // required: true
  },
  comment: {
    type: String
    // required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const movieCommentSchema = new Schema({
  movieID: {
    type: String
    // required: true
  },
  comments: [commentSchema]
});

module.exports = movieComment = mongoose.model(
  "movieComment",
  movieCommentSchema
);
