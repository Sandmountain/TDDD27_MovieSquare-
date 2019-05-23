import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  withStyles,
  Divider,
  Icon,
  IconButton
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import uuid from "uuid";
import {
  getMovies,
  deleteMovie,
  getHistory,
  addHistory,
  deleteHistory
} from "../../actions/userWatchlistAction";
import { setMovieID } from "../../actions/movieInfoAction";
import config from "../../config.json";

class WatchList extends Component {
  componentDidMount() {
    this.props.getMovies(this.props.userID);
    this.props.getHistory(this.props.userID);
  }

  onDeleteClick = id => {
    this.props.deleteMovie(this.props.userID, id);
  };

  onDeleteHistory = id => {
    this.props.deleteHistory(this.props.userID, id);
  };

  render() {
    const { classes, movies, history } = this.props;
    if (this.props.newMovieAdded) {
      console.log("Inside theLists");

      this.props.getMovies(this.props.userID);
    }
    console.log(movies);
    return (
      <Grid container className={classes.theLists}>
        <Grid item xs={6}>
          <Typography className={classes.typoColor} variant="h2" gutterBottom>
            History
          </Typography>
          <List className={classes.movieList}>
            {history
              ? history.map(movie => (
                  <Fragment>
                    <ListItem key={uuid()}>
                      <Link
                        to={{
                          pathname: `/movieInfo/${movie.movieID}`
                        }}
                      >
                        <IconButton
                          style={{ padding: 5 }}
                          onClick={() => this.props.setMovieID(movie.movieID)}
                        >
                          <Avatar
                            size="medium"
                            alt={movie.originalTitle}
                            style={{ cursor: "pointer" }}
                            src={
                              config.themovieDB.imageUrl +
                              config.themovieDB.imageSizes +
                              movie.imgURL
                            }
                          />
                        </IconButton>
                      </Link>
                      <ListItemText primary={movie.originalTitle} />
                      <IconButton
                        color="secondary"
                        onClick={this.onDeleteHistory.bind(this, movie._id)}
                      >
                        <Icon>delete </Icon>
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Fragment>
                ))
              : null}
          </List>
        </Grid>
        <Grid item xs={6} ml={5}>
          <Typography className={classes.typoColor} variant="h2" gutterBottom>
            Watchlist
          </Typography>
          <List className={classes.movieList}>
            {movies
              ? movies.map(movie => (
                  <Fragment>
                    <ListItem key={uuid()}>
                      <Link
                        to={{
                          pathname: `/movieInfo/${movie.movieID}`
                        }}
                      >
                        <IconButton
                          style={{ padding: 5 }}
                          onClick={() => this.props.setMovieID(movie.movieID)}
                        >
                          <Avatar
                            size="medium"
                            alt={movie.originalTitle}
                            style={{ cursor: "pointer" }}
                            src={
                              config.themovieDB.imageUrl +
                              config.themovieDB.imageSizes +
                              movie.imgURL
                            }
                          />
                        </IconButton>
                      </Link>
                      <ListItemText primary={movie.originalTitle} />
                      <IconButton
                        color="secondary"
                        onClick={this.onDeleteClick.bind(this, movie._id)}
                      >
                        <Icon>delete </Icon>
                      </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Fragment>
                ))
              : null}
          </List>
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  typoColor: {
    color: "black"
  },
  theLists: {
    display: "flex"
  },
  movieList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#424242"
  }
};

WatchList.propTypes = {
  classes: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  getHistory: PropTypes.func.isRequired,
  newMovieAdded: PropTypes.bool.isRequired,
  setMovieID: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userID: state.auth.userID,
  movies: state.movie.movies,
  history: state.movie.history,
  newMovieAdded: state.movie.newMovieAdded
});

export default connect(
  mapStateToProps,
  { getMovies, deleteMovie, getHistory, addHistory, deleteHistory, setMovieID }
)(withStyles(styles)(WatchList));
