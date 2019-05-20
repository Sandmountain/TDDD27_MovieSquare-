import React, { Component, Fragment } from "react";
import {
  Grid,
  Fab,
  IconButton,
  Icon,
  Avatar,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import {
  getMovies,
  deleteMovie,
  addHistory
} from "../../actions/userWatchlistAction";
import { setMovieID } from "../../actions/movieInfoAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class WatchList extends Component {
  state = {
    clickedMovieId: "",
    showInfo: false,
    addedMovie: ""
  };

  render() {
    const { movies } = this.props.movie;
    const { classes } = this.props;
    console.log("movies", movies);

    return (
      <Fragment>
        {/* 
        <h1 className="textColor">Your favorite genre is</h1>
        <h3>{favGenre + " "} </h3>
        */}

        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ marginBottom: "15px" }}
        >
          <Grid item sm={8}>
            {this.props.movie.loading ? (
              <CircularProgress
                style={{
                  position: "relative",
                  left: "50%",
                  marginTop: 100
                }}
              />
            ) : (
              <Fragment>
                {movies
                  ? movies.map(movie => (
                      <ExpansionPanel key={movie._id}>
                        <ExpansionPanelSummary
                          //className={classes.content}
                          style={{ cursor: "default" }}
                          expandIcon={
                            <Fragment>
                              <ExpandMoreIcon />
                            </Fragment>
                          }
                        >
                          <Link
                            to={{
                              pathname: `/movieInfo/${
                                this.state.clickedMovieId
                              }`
                            }}
                          >
                            <IconButton
                              //component={movieInfoLink}
                              style={{ padding: 5 }}
                              onClick={() =>
                                this.props.setMovieID(movie.movieID)
                              }
                            >
                              <Avatar
                                size="medium"
                                alt={movie.originalTitle}
                                style={{ cursor: "pointer" }}
                                src={`http://image.tmdb.org/t/p/w185/${
                                  movie.imgURL
                                }`}

                                // onClick={e => this.goToMovie()}
                              />
                            </IconButton>
                          </Link>
                          <Typography style={{ marginLeft: 10, marginTop: 15 }}>
                            {movie.originalTitle}
                          </Typography>

                          <Typography
                            style={{
                              fontStyle: "italic",
                              position: "absolute",
                              right: "35px",
                              textAlign: "right",
                              paddingTop: "15px",
                              color: "grey",
                              width: "50%"
                            }}
                          >
                            Added{" "}
                            {movie.date > 1
                              ? movie.date.slice(0, 10)
                              : movie.date}
                          </Typography>
                        </ExpansionPanelSummary>
                        <Divider />
                        <ExpansionPanelDetails
                          style={{
                            paddingRight: 0,
                            paddingBottom: 0
                          }}
                        >
                          <Typography className={classes.column2}>
                            {movie.movieOverview
                              ? movie.movieOverview
                              : "No further information about this movie"}
                          </Typography>

                          <ExpansionPanelActions
                            className={classes.column}
                            style={{ paddingTop: 0, paddingBottom: 0 }}
                          >
                            <Fab
                              size="small"
                              color="secondary"
                              aria-label="Edit"
                              className={classes.fabText}
                            >
                              <b>
                                {movie.movieRating !== "0"
                                  ? movie.movieRating
                                  : "?"}
                              </b>
                            </Fab>
                          </ExpansionPanelActions>
                        </ExpansionPanelDetails>

                        <ExpansionPanelActions
                          style={{
                            padding: 0,
                            paddingBottom: 5,
                            paddingRight: 6
                          }}
                        >
                          <Icon />
                          <IconButton
                            color="secondary"
                            onClick={this.onClick_addHistory.bind(this, movie)}
                          >
                            <Icon>playlist_add_check </Icon>
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={this.onDeleteClick.bind(this, movie._id)}
                          >
                            <Icon>delete </Icon>
                          </IconButton>
                        </ExpansionPanelActions>
                      </ExpansionPanel>
                    ))
                  : null}

                <Snackbar
                  message={
                    <span id="message-id">
                      Added <strong>{this.state.addedMovie}</strong> to history
                    </span>
                  }
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  open={this.state.showInfo}
                  autoHideDuration={3000}
                  onClose={() => this.handleClose()}
                />
              </Fragment>
            )}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
  componentDidMount() {
    this.props.getMovies(this.props.userID);
  }

  onDeleteClick = id => {
    this.props.deleteMovie(this.props.userID, id);
  };

  onClick_addHistory = movie => {
    this.props.addHistory(this.props.userID, movie);
    this.setState({ showInfo: true, addedMovie: movie.originalTitle });
    this.props.deleteMovie(this.props.userID, movie._id);
  };

  handleClose() {
    this.setState({ showInfo: false });
  }

  goToMovie = (event, id) => {
    this.props.setMovieID(id);

    event.stopPropagation();
  };
}
/*
const favoriteGenre = movies => {
  if (movies) {
    const genreList = [].concat.apply(
      [],
      movies.map(genres => genres.movieGenre)
    );

    let counts = genreList.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});

    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);

    return mostFrequent;
  } else return null;
};
*/
const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  column: {
    flexBasis: "10%"
  },
  column2: {
    flexBasis: "90%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  content: {
    margin: 0
  },
  fabText: {
    cursor: "default",
    marginLeft: "10px",
    marginRight: "2px"
  },
  Avatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

WatchList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  addHistory: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  setMovieID: PropTypes.func.isRequired,
  //id: PropTypes.number,
  classes: PropTypes.object.isRequired,
  userID: PropTypes.string
};

const mapStateToProps = state => ({
  movie: state.movie,
  id: state.movieInfo.id,
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.userID
});

export default connect(
  mapStateToProps,
  { getMovies, deleteMovie, setMovieID, addHistory }
)(withStyles(styles)(WatchList));
