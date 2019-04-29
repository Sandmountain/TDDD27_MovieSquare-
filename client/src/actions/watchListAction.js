import axios from "axios";
import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, MOVIES_LOADING } from "./types";

export const getMovies = () => dispatch => {
  dispatch(setMoviesLoading());
  axios.get("/api/watchlist").then(res =>
    dispatch({
      type: GET_MOVIES,
      payload: res.data
    })
  );
};
export const addMovie = movie => dispatch => {
  axios.post("/api/watchlist", movie).then(res =>
    dispatch({
      type: ADD_MOVIE,
      payload: res.data
    })
  );
};
export const deleteMovie = id => dispatch => {
  axios.delete(`/api/watchlist/${id}`).then(res =>
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
