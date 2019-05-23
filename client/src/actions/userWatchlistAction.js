import axios from "axios";
import {
  GET_MOVIES,
  ADD_MOVIE,
  DELETE_MOVIE,
  MOVIES_LOADING,
  GET_HISTORY,
  ADD_HISTORY,
  DELETE_HISTORY,
  NEW_MOVIE_ADDED
} from "./types";

import genres from "../components/MovieResult/Genres.json";

export const getMovies = userID => dispatch => {
  dispatch(setMoviesLoading());
  axios.get(`/api/UserWatchlist/userID/${userID}`).then(res => {
    dispatch({
      type: GET_MOVIES,
      payload: res.data
    });
  });
};
export const addMovie = (userID, movie) => dispatch => {
  for (let i = 0; i < movie.genre_ids.length; i++) {
    for (let j = 0; j < genres.genres.length; j++) {
      if (movie.genre_ids[i] === genres.genres[j].id) {
        movie.genre_ids[i] = genres.genres[j].name;
      }
    }
  }

  const movieObject = {
    movie: movie,
    userID: userID
  };

  axios.post("/api/UserWatchlist/userID", movieObject).then(res => {
    dispatch({
      type: ADD_MOVIE,
      payload: res.data
    });
  });
};
export const deleteMovie = (userID, id) => dispatch => {
  axios
    .delete(`/api/UserWatchlist/userID/`, {
      data: { userID: userID, id: id }
    })
    .then(res => {
      dispatch({
        type: DELETE_MOVIE,
        payload: id
      });
    });
};
export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING
  };
};

export const newMovieUpdate = () => {
  return {
    type: NEW_MOVIE_ADDED
  };
};

// History Actions
export const getHistory = userID => dispatch => {
  dispatch(setMoviesLoading());
  axios.get(`/api/UserWatchlist/userID/history/${userID}`).then(res => {
    dispatch({
      type: GET_HISTORY,
      payload: res.data
    });
  });
};

export const addHistory = (userID, movie) => dispatch => {
  const movieObject = {
    movie: movie,
    userID: userID
  };

  axios.post("/api/UserWatchlist/userID/history", movieObject).then(res => {
    dispatch({
      type: ADD_HISTORY,
      payload: res.data
    });
  });
};

export const deleteHistory = (userID, id) => dispatch => {
  axios
    .delete(`/api/UserWatchlist/userID/history/`, {
      data: { userID: userID, id: id }
    })
    .then(res => {
      dispatch({
        type: DELETE_HISTORY,
        payload: id
      });
    });
};
