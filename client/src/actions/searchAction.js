import axios from "axios";
import { GET_SEARCH_RESULTS, LOADING_RESULTS } from "./types";

export const getSearchResults = query => dispatch => {
  try {
    dispatch(setLoadingResults());
    axios
      .get("/api/SearchMovies/search", { params: { name: query } })
      .then(res => {
        dispatch({
          type: GET_SEARCH_RESULTS,
          payload: res.data
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const setLoadingResults = () => {
  return {
    type: LOADING_RESULTS
  };
};
