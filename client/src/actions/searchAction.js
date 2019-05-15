import axios from "axios";
import config from "../config.json";
import { GET_SEARCH_RESULTS, LOADING_RESULTS } from "./types";

export const getSearchResults = query => dispatch => {
  dispatch(setLoadingResults());
  axios
    .get("/api/SearchMovies/search", { params: { name: query } })
    .then(res => {
      dispatch({
        type: GET_SEARCH_RESULTS,
        payload: res.data
      });
    });
};

export const setLoadingResults = () => {
  return {
    type: LOADING_RESULTS
  };
};