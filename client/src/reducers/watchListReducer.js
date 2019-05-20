import {
  GET_MOVIES,
  ADD_MOVIE,
  DELETE_MOVIE,
  MOVIES_LOADING,
  GET_HISTORY,
  ADD_HISTORY,
  DELETE_HISTORY
} from "../actions/types";

const initialState = {
  movies: [],
  history: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie._id !== action.payload)
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [action.payload, ...state.movies]
      };
    case MOVIES_LOADING:
      return {
        ...state,
        loading: true
      };
    // History
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload,
        loading: false
      };
    case ADD_HISTORY:
      return {
        ...state,
        history: [action.payload, ...state.history]
      };
    case DELETE_HISTORY:
      return {
        ...state,
        history: state.history.filter(movie => movie._id !== action.payload)
      };
    default:
      return state;
  }
}
