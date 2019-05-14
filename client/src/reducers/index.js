import { combineReducers } from "redux";
import watchListReducer from "./watchListReducer";
import movieInfoReducer from "./movieInfoReducer";
import authReducer from "./authReducer";
import searchReducer from "./searchReducer";

//AuthReducer

export default combineReducers({
  movie: watchListReducer,
  results: searchReducer,
  movieID: movieInfoReducer,
  auth: authReducer
});
