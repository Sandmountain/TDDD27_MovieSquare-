import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  ListItemSecondaryAction,
  IconButton,
  Icon
} from "@material-ui/core";

import { getMovies, deleteMovie } from "../../actions/watchListAction";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuid from "uuid";

class WatchList extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  onDeleteClick = id => {
    this.props.deleteMovie(id);
  };

  render() {
    const { movies } = this.props.movie;
    const favGenre = favoriteGenre(movies);
    return (
      <Grid>
        <h1>Your favorite genre is</h1>
        <h3>{favGenre + " "} </h3>
        <List component="ul">
          {movies.map(({ _id, movieTitle }) => (
            <ListItem button key={uuid()}>
              <ListItemText primary={movieTitle} />
              <ListItemSecondaryAction>
                <IconButton
                  color="secondary"
                  onClick={this.onDeleteClick.bind(this, _id)}
                >
                  <Icon>playlist_add_check </Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
    );
  }
}

WatchList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie,
  isAuthenticated: state.auth.isAuthenticated
});

const favoriteGenre = movies => {
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

  console.log(mostFrequent);
  return mostFrequent;
};

export default connect(
  mapStateToProps,
  { getMovies, deleteMovie }
)(WatchList);
