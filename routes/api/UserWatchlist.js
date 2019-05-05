const express = require("express");
const router = express.Router();

const userWatchlist = require("../../models/UserWatchlist");
const Movie = require("../../models/Movies");

// @route  GET api/watchlist
// @desc   Get all movies in watchlist
// @access Public
router.get("/userID/:id", async (req, res) => {
  const userID = req.params.id;

  const user = await userWatchlist.findOne({ userID: userID });
  if (user) {
    res.json(user.watchlist);
  } else {
    res.json("");
  }
});

// @route  POST api/watchlist
// @desc   Add a  movie to watchlist
// @access Public
router.post("/userID/", async (req, res) => {
  //Creates the movie from the schema model
  //userWatchlist.findOne(req.params.userID)

  const { userID, movie } = req.body;

  const user = await userWatchlist.findOne({ userID: userID });

  if (user) {
    const newMovie = new Movie({
      movieID: movie.movieID,
      movieTitle: movie.movieTitle,
      imgURL: movie.imgURL,
      movieGenre: movie.movieGenre,
      movieName: movie.movieName
    });
    user.watchlist.push(newMovie);
    user.save();
  } else {
    const newMovie = new Movie({
      movieID: movie.movieID,
      movieTitle: movie.movieTitle,
      imgURL: movie.imgURL,
      movieGenre: movie.movieGenre,
      movieName: movie.movieName
    });
    const newUserWatchlist = new userWatchlist({
      userID: userID,
      watchlist: [newMovie]
    });

    newUserWatchlist.save().then(UserWatchlist => res.json(UserWatchlist));
  }
});

// @route  DELETE api/watchlist
// @desc   Delete a movie in watchlist
// @access Public
router.delete("/userID/", async (req, res) => {
  const { userID, id } = req.body;

  const user = await userWatchlist.findOne({ userID: userID });
  if (user) {
    user.watchlist.pull({ _id: id });
    user.save().then(UserWatchlist => res.json(user.watchlist));
  }
});

module.exports = router;
