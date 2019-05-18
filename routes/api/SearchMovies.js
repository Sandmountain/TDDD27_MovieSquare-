const express = require("express");
const router = express.Router();

const axios = require("axios");
const config = require("config");

router.get("/search", async (req, res) => {
  const query = req.query.name;

  if (query.length > 0) {
    axios
      .all([
        axios.get(
          `${config.themovieDB.apiUrl}?api_key=${
            config.themovieDB.apiKey
          }&query=${query}&sort_by=revenue.desc&page=1`
        ),
        axios.get(
          `${config.themovieDB.apiUrl}?api_key=${
            config.themovieDB.apiKey
          }&query=${query}&sort_by=revenue.desc&page=2`
        )
      ])
      .then(
        axios.spread((page1, page2) => {
          const results = page1.data.results.concat(page2.data.results);
          res.json(results);
        })
      )
      .catch(err => console.log(err));
  } else {
    res.json("");
  }
});

module.exports = router;
