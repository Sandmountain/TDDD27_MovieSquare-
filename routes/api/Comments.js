const express = require("express");
const router = express.Router();

const movieComment = require("../../models/CommentList");
const Comment = require("../../models/Comment");

// @route  POST api/comments/movieID/
// @desc   POST a comment to a certain movie ID
// @access Public
router.post("/movieID/", async (req, res) => {
  try {
    const { userID, userName, comment, movieID } = req.body;
    const movieComments = await movieComment.findOne({ movieID: movieID });

    if (movieComments) {
      const newComment = new Comment({
        userID: userID,
        userName: userName,
        comment: comment
      });

      movieComments.comments.push(newComment);
      await movieComments.save();
      console.log("newComment", newComment);
      return res.status(200).json(newComment);
    } else {
      const newComment = new Comment({
        userID: userID,
        userName: userName,
        comment: comment
      });

      const newMovieComments = new movieComment({
        movieID: movieID,
        comments: []
      });
      newMovieComments.comments.push(newComment);
      await newMovieComments.save();
      console.log("newMovieComments", newMovieComments);

      res.status(200).json(newMovieComments);
    }
  } catch (error) {
    return res.status(400).json({
      msg: error
    });
  }
});

// @route  GET api/comments/movieID/:id
// @desc   GET all comments from a certain movie
// @access Public
router.get("/movieID/:id", async (req, res) => {
  try {
    const movieID = req.params.id;

    const movieComments = await movieComment.findOne({ movieID: movieID });

    if (movieComments) {
      return res.status(200).json(movieComments);
    } else {
      const newMovieComments = new movieComment({
        movieID: movieID,
        comments: []
      });

      await newMovieComments.save();
      res.status(200).json(newMovieComments);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// @route  DELTE api/comments/movieID/
// @desc   DELTE a comment from a certain movie
// @access Public
router.delete("/movieID/", async (req, res) => {
  try {
    const { movieID, id } = req.body;

    const movieComments = await movieComment.findOne({ movieID: movieID });

    if (movieComments) {
      movieComments.comments.pull({ _id: id });
      await movieComments.save();
      return res.status(200).json({ msg: "Movie delted!" });
    } else {
      res.status(204).json({ msg: "No movie to delete" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
