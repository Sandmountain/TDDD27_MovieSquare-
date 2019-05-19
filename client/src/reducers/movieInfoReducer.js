import {
  GET_MOVIEINFO_ID,
  SET_MOVIEINFO_ID,
  LOADING_INFO,
  GET_MOVIEINFO
} from "../actions/types";

const initialState = {
  id: "299534",
  raitings: [],
  movieInfoResults: [],
  loadingMovieInfo: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIEINFO:
      return {
        ...state,
        id: action.payload[0].id,
        movieInfoResults: action.payload[0],
        raitings: action.payload[1] ? action.payload[1] : initialState.raitings,
        loadingMovieInfo: false
      };
    case GET_MOVIEINFO_ID:
      return {
        ...state,
        id: action.payload
      };
    case SET_MOVIEINFO_ID:
      return {
        ...state,
        id: action.payload
      };
    case LOADING_INFO:
      return {
        ...state,
        loadingMovieInfo: true
      };
    default:
      return state;
  }
}
