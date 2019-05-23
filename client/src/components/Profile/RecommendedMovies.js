import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getMovies,
  addMovie,
  newMovieUpdate
} from "../../actions/userWatchlistAction";
import { setMovieID } from "../../actions/movieInfoAction";
import axios from "axios";
import uuid from "uuid";
import { Link } from "react-router-dom";
import config from "../../config.json";
import "../../styles/movieHover.css";

import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Icon,
  withStyles,
  CircularProgress,
  Snackbar
} from "@material-ui/core";

class RecommendedMovies extends Component {
  state = {
    isLoading: true,
    imageLoading: true,
    movieRecData: [],
    addedMovie: "",
    showInfo: false
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {!this.state.isLoading ? (
          this.returnDivInTime(classes)
        ) : (
          <CircularProgress style={{ marginLeft: "50%" }} />
        )}
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
  }
  returnDivInTime = classes => {
    /* If there are no recomended videos for a specific show the most popular movies */

    const recomended =
      typeof this.state.movieRecData.recommendations !== "undefined"
        ? this.state.movieRecData.recommendations.results
        : this.state.movieRecData.results;

    return recomended.length > 0 ? (
      <Grid className={classes.rootGridListRecommended}>
        <GridList cols={6.5} className={classes.gridList} cellHeight="auto">
          >
          {recomended.map(img => (
            <GridListTile key={uuid()}>
              <Link
                to={{
                  pathname: `/movieInfo/${img.id}`
                }}
              >
                <div className="vignette">
                  <img
                    src={`http://image.tmdb.org/t/p/w185/${img.poster_path}`}
                    alt={img.title}
                    style={{ height: "100%", width: "100%" }}
                    onClick={() => {
                      console.log("img(movie)", img);

                      this.props.setMovieID(img.id);
                    }}
                  />
                </div>
              </Link>
              <GridListTileBar
                title={img.title}
                actionIcon={
                  <IconButton
                    color="secondary"
                    onClick={this.onClick_addWatchList.bind(this, img)}
                  >
                    <Icon>playlist_add</Icon>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
    ) : (
      <p>
        No recommended... should not get here. Look into the problem. Probably
        loading/axios issue
      </p>
    );
  };

  onClick_addWatchList = async movie => {
    await this.props.addMovie(this.props.userID, movie);
    this.setState({ showInfo: true, addedMovie: movie.title });
    this.props.newMovieUpdate();
  };

  handleClose() {
    this.setState({ showInfo: false });
  }
  componentDidMount() {
    this.props.getMovies(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      if (!this.props.loading) {
        if (this.props.movies.length > 0) {
          this.getMovieInfo(this.props.movies);
        }
      }
    }
  }

  getMovieInfo = movies => {
    // Get random movie from watchlist
    let movieID = movies[Math.floor(Math.random() * movies.length)].movieID;
    if (movieID !== "" && typeof movieID !== "undefined") {
      axios
        .get(
          `${config.themovieDB.movieURL}/${movieID}?api_key=${
            config.themovieDB.apiKey
          }&append_to_response=recommendations`
        )
        .then(res => {
          if (res.data.recommendations.results.length > 0) {
            this.setState({ movieRecData: res.data });
            this.setState({ isLoading: false });
          } else {
            axios
              .get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${
                  config.themovieDB.apiKey
                }&primary_release_year=2019&sort_by=revenue.desc`
              ) //Primary release year can be removed for getting of all time
              .then(res => {
                this.setState({ movieRecData: res.data });
                this.setState({ isLoading: false });
              })
              .catch(error => {});
          }
        })
        .catch(error => {});
    }
  };
}

const styles = {
  rootGridListRecommended: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white"
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)"
  },
  title: {
    color: "white"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
};

RecommendedMovies.propTypes = {
  classes: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  getMovies: PropTypes.func.isRequired,
  addMovie: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  movies: state.movie.movies,
  userID: state.auth.userID,
  loading: state.movie.loading
});

export default connect(
  mapStateToProps,
  { getMovies, addMovie, newMovieUpdate, setMovieID }
)(withStyles(styles)(RecommendedMovies));
