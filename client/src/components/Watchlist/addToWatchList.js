import React from "react";
import { connect } from "react-redux";
import { addMovie } from "../../actions/userWatchlistAction";
import PropTypes from "prop-types";

export default function addToWatchList(movie) {
  let genres = [];
  console.log(movie);
  for (let i = 0; i < movie.genre_ids.length; i++) {
    {
      if (movie.genre_ids) genres.push(movie.genre_ids[i].name);
    }
  }
  const newMovie = {
    movieID: movie.id,
    movieURL: movie.poster_path ? movie.poster_path : null,
    movieTitle: movie.original_title,
    title: movie.title,
    backdropURL: movie.backdrop_path,
    overview: movie.overview,
    rating: movie.vote_average,
    language: movie.original_language,
    releaseDate: movie.release_date,
    movieGenre: genres
  };

  //Add item via addItem Action if not in the wwatchlist

  console.log("got here with: ");
  console.log(newMovie);
  this.props.addMovie(this.props.userID, newMovie);

  return console.log("hello");
}

addToWatchList.propTypes = {
  images: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  setMovieID: PropTypes.func.isRequired,
  id: PropTypes.string,
  userID: PropTypes.string
};

const mapStateToProps = state => ({
  userID: state.auth.userID
});

export default 
