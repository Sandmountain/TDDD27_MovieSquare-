import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";

import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import { connect } from "react-redux";
import { getMovies, deleteMovie } from "../../actions/watchListAction";
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
      <Container>
        <h1>Your favorite genre is</h1>
        <h3>{favGenre + " "} </h3>
        <List>
          {movies.map(({ _id, movieTitle }) => (
            <ListItem key={uuid()}>
              <Button
                className="removebtn"
                color="danger"
                size="sm"
                onClick={this.onDeleteClick.bind(this, _id)}
              >
                &times;
              </Button>{" "}
              {movieTitle}
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

WatchList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movie: state.movie
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
