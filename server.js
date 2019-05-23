//This is the main serverside file for the web application
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const users = require("./routes/api/users");
const userWatchlist = require("./routes/api/UserWatchlist");
const searchMovies = require("./routes/api/SearchMovies");
const searchMovieInfo = require("./routes/api/SearchMovieInfo");
const comments = require("./routes/api/Comments");
const bodyParser = require("body-parser");

const app = express();

//Facebook/google doens't like re-routing domains.
app.use(cors());

//Body parser middleware (set limit to fix payload too large errors)
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

//Getting mongo URI
const dbConfig = config.get("mongoURI");

//Connecting to monogoDB
mongoose
  .connect(dbConfig, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/SearchMovies", searchMovies);
app.use("/api/SearchMovieInfo", searchMovieInfo);
app.use("/api/UserWatchlist", userWatchlist);
app.use("/api/comments", comments);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App listening to port: ${PORT}`));
