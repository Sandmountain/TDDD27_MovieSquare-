import React, { Component, Fragment } from "react";
import {
  Grid,
  Typography,
  Divider,
  Icon,
  Fab,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import SimilarMovies from "./SimiliarMovies";
import BottomNavBar from "./BottomNavBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  getMovieID,
  setMovieID,
  getMovieInfo
} from "../../actions/movieInfoAction";
import { addMovie, getMovies } from "../../actions/userWatchlistAction";
import { connect } from "react-redux";
import YouTube from "react-youtube";
import uuid from "uuid";

import Modal from "@material-ui/core/Modal";

//Flera resultat med append_to_respons=
//http://api.themoviedb.org/3/movie/157336?api_key=0d9a8d275e343ddfe2589947fe17d099&append_to_response=videos
//https://api.themoviedb.org/3/movie/299534/similar?api_key=0d9a8d275e343ddfe2589947fe17d099&language=en-US&page=1
//https://api.themoviedb.org/3/movie/299534/recommendations?api_key=0d9a8d275e343ddfe2589947fe17d099&language=en-US&page=1

//Include actors? Actor Page samma som movie info
//Actor med movies
//https://api.themoviedb.org/3/person/1245?api_key=0d9a8d275e343ddfe2589947fe17d099&&append_to_response=movie_credits

//Använda sig av OMDBapi:t för imdb score, rotten tomatoes etc...?
// i= (imdbID som fås från andra apit) finns dock limit här på hur många queries som får göras...
//http://www.omdbapi.com/?apikey=6f9b4562&i=tt4154796

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.getMovieInfo();
    this.state = {
      genres: [],
      open: false,
      showInfo: false,
      addedMovie: ""
    };
  }

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    const { classes } = this.props;

    if (!this.props.movieInfo.loadingMovieInfo) {
      const movieInfo = this.props.movieInfo.movieInfoResults;
      const videoClips = movieInfo.videos.results;
      const raitings = this.props.movieInfo.raitings;
      const credit = returnVIP(movieInfo.credits);

      return (
        <Fragment>
          <Grid item className={classes.mainGrid}>
            <img
              src={`http://image.tmdb.org/t/p/w1280/${movieInfo.backdrop_path}`}
              alt="img"
              className={classes.backdropStyle}
              onError={e => {
                this.onerror = null;
              }}
            />
            <Grid container direction="row">
              <Grid item sm={3} className={classes.foreGroundImage}>
                <img
                  alt="img"
                  style={{
                    maxWidth: "90%",
                    height: "auto",
                    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)"
                  }}
                  src={`http://image.tmdb.org/t/p/w185/${
                    movieInfo.poster_path
                  }`}
                  onError={e => {
                    this.onerror = null;
                    e.target.src = require("../../images/error.png");
                  }}
                />
                {movieInfo.tagline ? (
                  <Fragment>
                    <Divider style={{ marginTop: "5px" }} />
                    <Typography
                      color="inherit"
                      variant="inherit"
                      style={{ fontStyle: "italic" }}
                    >
                      "{movieInfo.tagline}..."
                    </Typography>
                  </Fragment>
                ) : (
                  <div />
                )}
                <Grid item style={{ paddingTop: 10 }}>
                  <Typography color="primary" variant="body2">
                    {typeof raitings[0] !== "undefined" ? (
                      <img
                        style={{ height: 26 }}
                        src={require("../../images/imdb.png")}
                        alt="imdb"
                      />
                    ) : null}
                    <strong>
                      {typeof raitings[0] !== "undefined"
                        ? " " + raitings[0].Value
                        : null}
                    </strong>
                  </Typography>
                </Grid>
                <Grid item style={{ paddingTop: 2 }}>
                  <Typography color="primary" variant="body2">
                    {displayTomatoIcon(raitings)}{" "}
                    <strong>
                      {typeof raitings[1] !== "undefined"
                        ? raitings[1].Value.slice(0, 2) + "%"
                        : null}
                    </strong>
                  </Typography>
                </Grid>
                <Grid item style={{ paddingTop: 2 }}>
                  {displayMetaCritics(raitings)}{" "}
                </Grid>
              </Grid>
              <Grid item sm={9} className={classes.foreGroundImage}>
                <Typography
                  color="primary"
                  variant="h3"
                  display="block"
                  style={{ opacity: 1, zIndex: "2" }}
                >
                  {movieInfo.title}
                </Typography>
                {movieInfo.release_date ? (
                  <Typography color="inherit" variant="subtitle2" gutterBottom>
                    {" "}
                    Released {movieInfo.release_date}
                  </Typography>
                ) : null}
                <Typography
                  color="inherit"
                  align="right"
                  variant="subtitle2"
                  gutterBottom
                >
                  {movieInfo.genres.map((item, index) => (
                    <span key={uuid()}>{(index ? ", " : "") + item.name}</span>
                  ))}{" "}
                  {movieInfo.runtime ? (
                    <Fragment> | {movieInfo.runtime} min </Fragment>
                  ) : null}{" "}
                  {movieInfo.spoken_languages.map((item, index) => (
                    <span key={uuid()}>
                      {(index ? ", " : "| ") + item.name}
                    </span>
                  ))}
                </Typography>

                <div>
                  <Fab
                    size="medium"
                    color="secondary"
                    aria-label="Edit"
                    variant="extended"
                    className={classes.fabButtons}
                  >
                    <strong>{movieInfo.vote_average}</strong>
                  </Fab>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="Edit"
                    onClick={() => {
                      //console.log(movieInfo);
                      this.addMovieToDb(movieInfo, this.props.userID);
                    }}
                    className={classes.fabButtons}
                  >
                    <Icon>playlist_add</Icon>
                  </Fab>
                  <a
                    href={
                      movieInfo.homepage
                        ? movieInfo.homepage
                        : `https://www.imdb.com/title/${movieInfo.imdb_id}`
                    }
                    style={{ textDecoration: "none" }}
                  >
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="Edit"
                      className={classes.fabButtons}
                    >
                      <Icon>home</Icon>
                    </Fab>
                  </a>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="Edit"
                    className={classes.fabButtons}
                    onClick={this.handleOpen}
                  >
                    <Icon>play_arrow</Icon>
                  </Fab>
                </div>
                <Modal
                  open={this.state.open}
                  onClose={this.handleClose}
                  onBackdropClick={this.handleClose}
                >
                  <div className={classes.paperModal}>
                    <YouTube
                      videoId={videoClips[0] ? videoClips[0].key : "0"}
                      opts={opts}
                      onReady={this._onReady}
                    />
                  </div>
                </Modal>
                <Divider style={{ marginBottom: "20px" }} />
                {movieInfo.overview.length > 0 ? (
                  <Typography color="inherit" variant="h6">
                    {" "}
                    Overview{" "}
                  </Typography>
                ) : null}
                <Typography color="inherit" variant="body1">
                  {movieInfo.overview}
                </Typography>
                <Divider style={{ marginBottom: "20px" }} />
                <Grid item sm={12}>
                  <Typography color="inherit" variant="body1">
                    {credit.Directors.length > 0 ? (
                      <strong>Director(s): </strong>
                    ) : null}
                    {credit.Directors.map((cred, index) => {
                      return (index ? ", " : "") + cred.name;
                    })}
                  </Typography>
                  <Typography color="inherit" variant="body1">
                    {credit.Writers.length > 0 ? (
                      <strong>Writer(s): </strong>
                    ) : null}
                    {credit.Writers.map((cred, index) => {
                      return (index ? ", " : "") + cred.name;
                    })}
                  </Typography>
                  <Typography color="inherit" variant="body1">
                    {credit.Cast.length > 0 ? <strong>Cast: </strong> : null}
                    {credit.Cast.map((cred, index) => {
                      return (index ? ", " : "") + cred.name;
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item sm={12}>
            <Divider style={{ paddingTop: 3 }} />
            {movieInfo.similar ? (
              <SimilarMovies
                similar={movieInfo.similar}
                style={{ overflow: "hide" }}
              />
            ) : (
              <div />
            )}
            <Divider style={{ paddingTop: 3 }} />
          </Grid>

          <Grid item sm={12}>
            <BottomNavBar movieData={movieInfo} />
          </Grid>
          <Snackbar
            message={
              <span id="message-id">
                Added <strong>{this.state.addedMovie}</strong> to the watchlist
              </span>
            }
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={this.state.showInfo}
            autoHideDuration={3000}
            onClose={() => this.handleClose()}
          />
        </Fragment>
      );
    } else {
      return (
        <CircularProgress style={{ marginTop: "20%", marginLeft: "50%" }} />
      );
    }
  }

  handleClose() {
    this.setState({ showInfo: false });
  }

  componentWillMount() {
    this.props.getMovieID();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.id !== this.props.id) {
      this.getMovieInfo();
    }
  }

  getMovieInfo = () => {
    let movieID = this.props.id;
    if (movieID !== "" && typeof movieID !== "undefined") {
      this.props.getMovieInfo(movieID);
    }
  };

  addMovieToDb = (movie, userID) => {
    if (movie !== "undefiend") {
      const newMovie = {};
      //Changing the object to fit the action. Outside movieinfo.js movies have different genres structur.
      delete Object.assign(newMovie, movie, {
        genre_ids: movie["genres"]
      })["genres"];
      this.props.addMovie(userID, newMovie);
      this.props.getMovies(userID);
      this.setState({
        showInfo: true,
        addedMovie: movie.original_title
      });
    }
  };
}

const displayMetaCritics = value => {
  if (typeof value[2] !== "undefined") {
    let backgroundColor;
    if (value[2].Value.slice(0, 2) > 60) {
      backgroundColor = "#6c3";
    } else if (value[2].Value.slice(0, 2) > 39) {
      backgroundColor = "#fc3";
    } else {
      backgroundColor = "#f00";
    }

    return (
      <div
        style={{
          padding: 2,
          height: "26px",
          width: "26px",
          borderRadius: "3px",
          backgroundColor: backgroundColor
        }}
      >
        <Typography style={{ height: "100%", width: "100%" }} align="center">
          {value[2].Value.slice(0, 2)}
        </Typography>
      </div>
    );
  }
};

const displayTomatoIcon = value => {
  if (typeof value[1] !== "undefined") {
    if (value[1].Value.slice(0, 2) > 50) {
      return (
        <img
          style={{ height: 26 }}
          src={require("../../images/tomato.png")}
          alt={"tomato"}
        />
      );
    } else {
      return (
        <img
          style={{ height: 26 }}
          src={require("../../images/rotten.png")}
          alt="rotten"
        />
      );
    }
  }
};

const returnVIP = creditObject => {
  let directors = [];
  let writers = [];
  let actors = [];

  const { crew, cast } = creditObject;

  for (let i = 0; i < crew.length; i++) {
    if (crew[i].job === "Director") {
      directors.push(crew[i]);
    } else if (crew[i].job === "Writer") {
      writers.push(crew[i]);
    }
  }
  for (let i = 0; i < 3; i++) {
    if (cast[i]) actors.push(cast[i]);
  }

  const VIPjobs = {
    Directors: directors,
    Writers: writers,
    Cast: actors
  };
  return VIPjobs;
};

const styles = theme => ({
  foreGroundImage: {
    position: "relative",
    zIndex: "5",
    padding: "12px "
  },
  backdropStyle: {
    position: "absolute",
    zIndex: 1,
    flexShrink: "0",
    //maxWidth: "100%",
    minHeight: "100%",
    opacity: "0.2"
  },
  fabButtons: {
    marginRight: 10
  },
  backgroundDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  mainGrid: {
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    position: "relative",
    overflow: "hidden",
    minHeight: "100%"
  },
  paperModal: {
    position: "absolute",
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
});

MovieInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired,
  setMovieID: PropTypes.func.isRequired,
  userID: PropTypes.string
};

const mapStateToProps = state => ({
  id: state.movieInfo.id,
  isLoading: state.movieInfo.loadingMovieInfo,
  movieInfo: state.movieInfo,
  movie: state.movie,
  userID: state.auth.userID
});

export default connect(
  mapStateToProps,
  { getMovieInfo, getMovieID, addMovie, getMovies, setMovieID }
)(withStyles(styles)(MovieInfo));
