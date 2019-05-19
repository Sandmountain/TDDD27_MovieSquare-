const express = require("express");
const router = express.Router();

const axios = require("axios");
const config = require("config");
const { PerformanceObserver, performance } = require("perf_hooks");

router.get("/search/", async (req, res) => {
  const id = req.query.name;
  const theData = [];

  axios
    .get(
      `${config.themovieDB.movieURL}/${id}?api_key=${
        config.themovieDB.apiKey
      }&append_to_response=credits,videos,similar,reviews`
    )
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
