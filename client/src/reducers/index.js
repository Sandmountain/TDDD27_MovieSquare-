import { combineReducers } from "redux";
import watchListReducer from "./watchListReducer";
import movieInfoReducer from "./movieInfoReducer";
import authReducer from "./authReducer";

//AuthReducer

export default combineReducers({
  movie: watchListReducer,
  movieID: movieInfoReducer,
  auth: authReducer
});
