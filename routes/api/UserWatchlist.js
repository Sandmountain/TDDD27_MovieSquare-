const express = require("express");
const router = express.Router();

const userWatchlist = require("../../models/UserWatchlist");
const Movie = require("../../models/Movies");

// @route  GET api/userID/watchlist
// @desc   Get all movies in the users watchlist
// @access Public
router.get("/userID/:id", async (req, res) => {
  const userID = req.params.id;

  const user = await userWatchlist.findOne({ userID: userID });
  if (user) {
    res.json(user.watchlist);
  } else {
    //res.json("");
  }
});

// @route  POST api/userID/watchlist
// @desc   Add a movie to the users watchlist
// @access Public
router.post("/userID/", async (req, res) => {
  //Creates the movie from the schema model
  console.log("hello");

  const { userID, movie } = req.body;

  const user = await userWatchlist.findOne({ userID: userID });
  if (user) {
    const newMovie = new Movie({
      movieID: movie.movieID,
      movieTitle: movie.movieTitle,
      imgURL: movie.imgURL,
      movieGenre: movie.movieGenre,
      movieName: movie.movieName,
      originalTitle: movie.movieTitle,
      backdropURL: movie.backdropURL,
      movieOverview: movie.overview,
      movieRating: movie.rating,
      movieLanguage: movie.language,
      releaseDate: movie.releaseDate
    });
    user.watchlist.push(newMovie);
    await user.save();
  } else {
    const newMovie = new Movie({
      movieID: movie.movieID,
      movieTitle: movie.movieTitle,
      imgURL: movie.imgURL,
      movieGenre: movie.movieGenre,
      movieName: movie.movieName,
      originalTitle: movie.movieTitle,
      backdropURL: movie.backdropURL,
      movieOverview: movie.overview,
      movieRating: movie.rating,
      movieLanguage: movie.language,
      releaseDate: movie.releaseDate
    });
    const newUserWatchlist = new userWatchlist({
      userID: userID,
      watchlist: [newMovie]
    });

    newUserWatchlist.save().then(UserWatchlist => res.json(UserWatchlist));
  }
});

// @route  DELETE api/userID/watchlist
// @desc   Delete a movie in the users watchlist
// @access Public
router.delete("/userID/", async (req, res) => {
  const { userID, id } = req.body;

  const user = await userWatchlist.findOne({ userID: userID });
  if (user) {
    user.watchlist.pull({ _id: id });
    user.save().then(UserWatchlist => res.json(user.watchlist));
  }
});

// @route  GET api/userID/history
// @desc   Get all movies in the users history
// @access Public
router.get("/userID/history/:id", async (req, res) => {
  const userID = req.params.id;

  const user = await userWatchlist.findOne({ userID: userID });
  if (user) {
    res.json(user.history);
  } else {
    res.json("");
  }
});

// @route  POST api/userID/history
// @desc   Add a movie to the users history
// @access Public
router.post("/userID/history", async (req, res) => {
  //Creates the movie from the schema model

  const { userID, movie } = req.body;
  const user = await userWatchlist.findOne({ userID: userID });

  if (user) {
    const newMovie = new Movie({
      movieID: movie.movieID,
      movieTitle: movie.movieTitle,
      imgURL: movie.imgURL,
      movieGenre: movie.movieGenre,
      movieName: movie.movieName,
      originalTitle: movie.movieTitle,
      backdropURL: movie.backdropURL,
      movieOverview: movie.overview,
      movieRating: movie.rating,
      movieLanguage: movie.language,
      releaseDate: movie.releaseDate
    });
    user.history.push(newMovie);
    user.save();
  } else {
    return res
      .status(404)
      .json({ msg: "Unexcpected error, are you logged in?" });
  }
});

module.exports = router;
