//This is the main serverside file for the web application
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const watchlist = require("./routes/api/watchlist");
const users = require("./routes/api/users");

const app = express();

app.use(cors());

//Body parser middleware
app.use(express.json());

//Getting mongo URI
const dbConfig = config.get("mongoURI");

//Connecting to monogoDB
mongoose
  .connect(dbConfig, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.use("/api/watchlist", watchlist);
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App listening to port: ${PORT}`));
