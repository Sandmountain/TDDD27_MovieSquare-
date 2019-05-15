import React, { Component, Fragment } from "react";
import { Grid, Typography, Divider, Icon, Fab, Paper } from "@material-ui/core";
import SimilarMovies from "./SimiliarMovies";
import BottomNavBar from "./BottomNavBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import config from "../../config.json";
import axios from "axios";
import { getMovieID, setMovieID } from "../../actions/movieInfoAction";
import { addMovie } from "../../actions/userWatchlistAction";
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
      data: [],
      raitings: [],
      genres: [],
      isLoading: true,
      open: false
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

    //this.props.getMovieID();

    if (!this.state.isLoading) {
      const credit = returnVIP(this.state.data.credits);
      const { results } = this.state.data.videos;

      return (
        <Fragment>
          <Grid item className={classes.mainGrid}>
            <img
              src={`http://image.tmdb.org/t/p/w1280/${
                this.state.data.backdrop_path
              }`}
              alt="img"
              className={classes.backdropStyle}
              onError={e => {
                this.onerror = null;
              }}
            />
            <Grid container>
              <Grid item sm={3} className={classes.foreGroundImage}>
                <img
                  alt="img"
                  style={{
                    maxWidth: "90%",
                    height: "auto",
                    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)"
                  }}
                  src={`http://image.tmdb.org/t/p/w185/${
                    this.state.data.poster_path
                  }`}
                  onError={e => {
                    this.onerror = null;
                    e.target.src = require("./error.png");
                  }}
                />
              </Grid>
              <Grid item sm={9} className={classes.foreGroundImage}>
                <Typography
                  color="primary"
                  variant="h3"
                  display="block"
                  style={{ opacity: 1, zIndex: "2" }}
                >
                  {this.state.data.title}
                </Typography>

                {this.state.data.release_date ? (
                  <Typography color="inherit" variant="subtitle2" gutterBottom>
                    {" "}
                    Released {this.state.data.release_date}
                  </Typography>
                ) : null}

                <Typography
                  color="inherit"
                  align="right"
                  variant="subtitle2"
                  gutterBottom
                >
                  {this.state.data.genres.map((item, index) => (
                    <span key={uuid()}>{(index ? ", " : "") + item.name}</span>
                  ))}{" "}
                  {this.state.data.runtime ? (
                    <Fragment> | {this.state.data.runtime} min </Fragment>
                  ) : null}
                  |{" "}
                  {this.state.data.spoken_languages.map((item, index) => (
                    <span key={uuid()}>{(index ? ", " : "") + item.name}</span>
                  ))}
                </Typography>
                <Grid container justify="flex-end" direction="column">
                  <Grid item>
                    <Typography
                      color="primary"
                      variant="subtitle2"
                      align="right"
                    >
                      {typeof this.state.raitings[0] !== "undefined"
                        ? this.state.raitings[0].Value
                        : null}{" "}
                      {typeof this.state.raitings[0] !== "undefined" ? (
                        <img
                          style={{ height: 26 }}
                          src={require("./images/imdb.png")}
                        />
                      ) : null}
                    </Typography>
                  </Grid>
                  <Grid item style={{ paddingTop: 2 }}>
                    <Typography
                      color="primary"
                      variant="subtitle2"
                      align="right"
                    >
                      {typeof this.state.raitings[1] !== "undefined"
                        ? this.state.raitings[1].Value
                        : null}{" "}
                      {displayTomatoIcon(this.state.raitings)}
                    </Typography>
                  </Grid>
                </Grid>
                <div
                  style={{
                    position: "relative",
                    top: "-45px",
                    marginTop: "10px"
                  }}
                >
                  <Fab
                    size="medium"
                    color="secondary"
                    aria-label="Edit"
                    variant="extended"
                    className={classes.fabButtons}
                  >
                    <b>{this.state.data.vote_average}</b>
                  </Fab>
                  <Fab
                    size="small"
                    color="primary"
                    aria-label="Edit"
                    className={classes.fabButtons}
                  >
                    <Icon>playlist_add</Icon>
                  </Fab>
                  <a
                    href={
                      this.state.data.homepage
                        ? this.state.data.homepage
                        : `https://www.imdb.com/title/${
                            this.state.data.imdb_id
                          }`
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
                      videoId={results[0] ? results[0].key : "0"}
                      opts={opts}
                      onReady={this._onReady}
                    />
                  </div>
                </Modal>

                {this.state.data.overview.length > 0 ? (
                  <Typography color="inherit" variant="h6">
                    {" "}
                    Overview{" "}
                  </Typography>
                ) : null}

                <Typography color="inherit" variant="body1">
                  {this.state.data.overview}
                </Typography>
                <Divider style={{ marginBottom: "20px" }} />

                <Grid item sm={12}>
                  <Typography color="inherit" variant="body1">
                    {credit.Directors.length > 0 ? <b>Director(s): </b> : null}
                    {credit.Directors.map((cred, index) => {
                      return (index ? ", " : "") + cred.name;
                    })}
                  </Typography>
                  <Typography color="inherit" variant="body1">
                    {credit.Writers.length > 0 ? <b>Writer(s): </b> : null}
                    {credit.Writers.map((cred, index) => {
                      return (index ? ", " : "") + cred.name;
                    })}
                  </Typography>
                  <Typography color="inherit" variant="body1">
                    {credit.Cast.length > 0 ? <b>Cast: </b> : null}
                    {credit.Cast.map((cred, index) => {
                      return (index ? ", " : "") + cred.name;
                    })}
                  </Typography>
                  {this.state.data.tagline ? (
                    <Fragment>
                      <Divider style={{ marginTop: "20px" }} />
                      <Typography
                        color="inherit"
                        variant="inherit"
                        style={{ paddingLeft: "50px", fontStyle: "italic" }}
                      >
                        "{this.state.data.tagline}..."
                      </Typography>
                    </Fragment>
                  ) : (
                    <div />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item sm={12}>
            <Divider style={{ paddingTop: 3 }} />
            {this.state.data.similar ? (
              <SimilarMovies
                similiar={this.state.data.similar}
                style={{ overflow: "hide" }}
              />
            ) : (
              <div />
            )}
            <Divider style={{ paddingTop: 3 }} />
          </Grid>

          <Grid item sm={12}>
            <BottomNavBar />
          </Grid>
        </Fragment>
      );
    } else {
      return <div />;
    }
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    //event.target.pauseVideo();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount() {
    this.props.getMovieID();
  }

  getMovieInfo = () => {
    let movieID = this.props.id;
    if (movieID !== "") {
      axios
        .get(
          `${config.themovieDB.movieURL}/${movieID}?api_key=${
            config.themovieDB.apiKey
          }&append_to_response=credits,videos,similar`
        )
        .then(res => {
          this.setState({ data: res.data });

          axios
            .get(
              `http://www.omdbapi.com/?apikey=6f9b4562&i=${
                this.state.data.imdb_id
              }`
            )
            .then(res => {
              if (res.data.Response !== "False") {
                this.setState({ raitings: res.data.Ratings });
                this.setState({ isLoading: false });
              } else {
                this.setState({ isLoading: false });
              }
            });
        });
    }
    /*
    
      */
  };
}
const displayTomatoIcon = value => {
  if (typeof value[1] !== "undefined") {
    if (value[1].Value.slice(0, 2) > 50) {
      return (
        <img style={{ height: 26 }} src={require("./images/tomato.png")} />
      );
    } else {
      return (
        <img style={{ height: 26 }} src={require("./images/rotten.png")} />
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
  id: PropTypes.string,
  userID: PropTypes.string
};

const mapStateToProps = state => ({
  id: state.movieID.id,
  movie: state.movie,
  userID: state.auth.userID
});

export default connect(
  mapStateToProps,
  { getMovieID, addMovie, setMovieID }
)(withStyles(styles)(MovieInfo));
