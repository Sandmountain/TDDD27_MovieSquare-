import axios from "axios";
import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, MOVIES_LOADING } from "./types";

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
    .then(res =>
      dispatch({
        type: DELETE_MOVIE,
        payload: id
      })
    );
};
export const setMoviesLoading = () => {
  return {
    type: MOVIES_LOADING
  };
};
