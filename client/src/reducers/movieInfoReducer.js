import { GET_MOVIEINFO_ID, SET_MOVIEINFO_ID } from "../actions/types";

const initialState = {
  id: "157336"
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
