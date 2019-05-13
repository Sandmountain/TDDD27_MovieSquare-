import { GET_MOVIEINFO_ID, SET_MOVIEINFO_ID } from "./types";

export const getMovieID = () => dispatch => {
  dispatch({
    type: GET_MOVIEINFO_ID
    //payload: res.data
  });
};

export const setMovieID = id => dispatch => {
  dispatch({
    type: SET_MOVIEINFO_ID,
    payload: id
  });
};
