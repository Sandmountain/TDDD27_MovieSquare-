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
    const newUserWatchlist = new userWatchlist({
      userID: userID,
      watchlist: [],
      history: []
    });

    await newUserWatchlist
      .save()
      .then(UserWatchlist => res.json(UserWatchlist));
  }
});

// @route  POST api/userID/watchlist
// @desc   Add a movie to the users watchlist
// @access Public
router.post("/userID/", async (req, res) => {
  //Creates the movie from the schema model

  const { userID, movie } = req.body;

  const user = await userWatchlist.findOne({ userID: userID });
  if (
    user.watchlist.filter(e => e.movieID === movie.id.toString()).length > 0
  ) {
    //Handle already in list
    console.log(movie.id);
  } else {
    if (user) {
      const newMovie = new Movie({
        movieID: movie.id,
        movieTitle: movie.title,
        imgURL: movie.poster_path,
        movieGenre: movie.genre_ids,
        originalTitle: movie.original_title,
        backdropURL: movie.backdrop_path,
        movieOverview: movie.overview,
        movieRating: movie.vote_average,
        movieLanguage: movie.original_language,
        releaseDate: movie.release_date
      });
      user.watchlist.push(newMovie);
      await user.save();
    } else {
      console.log("Hello new movie");

      const newMovie = new Movie({
        movieID: movie.id,
        movieTitle: movie.title,
        imgURL: movie.poster_path,
        movieGenre: movie.genre_ids,
        originalTitle: movie.original_title,
        backdropURL: movie.backdrop_path,
        movieOverview: movie.overview,
        movieRating: movie.vote_average,
        movieLanguage: movie.original_language,
        releaseDate: movie.release_date
      });
      const newUserWatchlist = new userWatchlist({
        userID: userID,
        watchlist: [newMovie]
      });
      await newUserWatchlist
        .save()
        .then(UserWatchlist => res.json(UserWatchlist));
    }
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
  if (
    user.history.filter(histMovie => histMovie.movieID === movie.movieID)
      .length > 0
  ) {
  } else {
    if (user) {
      const newMovie = new Movie({
        movieID: movie.movieID,
        movieTitle: movie.movieTitle,
        imgURL: movie.imgURL,
        movieGenre: movie.movieGenre,
        originalTitle: movie.originalTitle,
        backdropURL: movie.backdropURL,
        movieOverview: movie.movieOverview,
        movieRating: movie.movieRating,
        movieLanguage: movie.movieLanguage,
        releaseDate: movie.date
      });

      user.history.push(newMovie);
      await user.save().then(newMovie => res.send(newMovie));
    } else {
      return res
        .status(404)
        .json({ msg: "Unexcpected error, are you logged in?" });
    }
  }
});

// @route  DELETE api/userID/history
// @desc   Delete a movie in the users watchlist
// @access Public
router.delete("/userID/history/", async (req, res) => {
  const { userID, id } = req.body;

  const user = await userWatchlist.findOne({ userID: userID });
  if (user) {
    user.history.pull({ _id: id });
    user.save().then(UserWatchlist => res.json(user.history));
  }
});

module.exports = router;
