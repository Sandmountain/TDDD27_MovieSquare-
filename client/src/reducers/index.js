import { combineReducers } from "redux";
import watchListReducer from "./watchListReducer";
import movieInfoReducer from "./movieInfoReducer";
import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
import commentReducer from "./commentReducer";

//AuthReducer

export default combineReducers({
  movie: watchListReducer,
  results: searchReducer,
  movieInfo: movieInfoReducer,
  auth: authReducer,
  comment: commentReducer
});
