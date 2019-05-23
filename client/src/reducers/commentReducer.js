import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  LOADING_COMMENT,
  LOADING_ADDED_COMMENT
} from "../actions/types";

const DEAFAULT_STATE = {
  comments: [],
  loading: false,
  newComment: false
};

export default function(state = DEAFAULT_STATE, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
        newComment: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment._id !== action.payload
        )
      };
    case LOADING_COMMENT:
      return {
        ...state,
        loading: true
      };
    case LOADING_ADDED_COMMENT:
      return {
        ...state,
        newComment: true
      };

    default:
      return state;
  }
}
