import {
  GET_MOVIEINFO_ID,
  SET_MOVIEINFO_ID,
  LOADING_INFO,
  GET_MOVIEINFO
} from "./types";
import axios from "axios";

export const getMovieInfo = id => dispatch => {
  try {
    dispatch(setLoadingMovieInfo());
    axios
      .get("/api/SearchMovieInfo/search/", { params: { name: id } })
      .then(res => {
        dispatch({
          type: GET_MOVIEINFO,
          payload: res.data
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const getMovieID = () => dispatch => {
  dispatch({
    type: GET_MOVIEINFO_ID
  });
};

export const setMovieID = id => dispatch => {
  dispatch({
    type: SET_MOVIEINFO_ID,
    payload: id
  });
};

export const setLoadingMovieInfo = () => {
  return {
    type: LOADING_INFO
  };
};
