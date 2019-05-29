const express = require("express");
const router = express.Router();

const axios = require("axios");
const config = require("config");
const { PerformanceObserver, performance } = require("perf_hooks");

// @route  POST api/SerachMovieInfo/search
// @desc   Serach the theMovieDB and ombdb with query
// @access Public
router.get("/search/", async (req, res) => {
  const id = req.query.name;
  const theData = [];

  //Makes a call to theMovieDB for all the relevant info we use (credtis, videos, similar and reviews)
  axios
    .get(
      `${config.themovieDB.movieURL}/${id}?api_key=${
        config.themovieDB.apiKey
      }&append_to_response=credits,videos,similar,reviews`
    )
    //Makes a second call afterwards to the omdb database for additional movie ratings.
    .then(data => {
      theData.push(data.data);
      axios
        .get(`http://www.omdbapi.com/?apikey=6f9b4562&i=${data.data.imdb_id}`)
        .then(data => {
          if (data.data.Response !== "False") {
            theData.push(data.data.Ratings);
            res.json(theData);
          } else {
            res.json(theData);
          }
        })
        .catch(error => {});
    })
    .catch(error => {});
});

module.exports = router;
