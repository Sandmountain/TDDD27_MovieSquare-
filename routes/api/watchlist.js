const express = require("express");
const router = express.Router();

const Movie = require("../../models/Movies");

// @route  GET api/watchlist
// @desc   Get all movies in watchlist
// @access Public
router.get("/", (req, res) =>
  Movie.find()
    .sort({ date: -1 })
    .then(movies => res.json(movies))
);

// @route  POST api/watchlist
// @desc   Add a  movie to watchlist
// @access Public
router.post("/", (req, res) => {
  //Creates the movie from the schema model
  const newMovie = new Movie({
    movieID: req.body.movieID,
    movieTitle: req.body.movieTitle,
    imgURL: req.body.imgURL,
    movieGenre: req.body.movieGenre,
    movieName: req.body.movieName
  });

  newMovie.save().then(movie => res.json(movie));
});

// @route  DELETE api/watchlist
// @desc   Delete a movie in watchlist
// @access Public
router.delete("/:id", (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => movie.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
