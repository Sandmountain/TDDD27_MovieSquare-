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
module.exports = Comment = mongoose.model("comment", commentSchema);
