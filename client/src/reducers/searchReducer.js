import { GET_SEARCH_RESULTS, LOADING_RESULTS } from "../actions/types";

const initialState = {
  results: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        results: action.payload,
        loading: false
      };
    case LOADING_RESULTS:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
