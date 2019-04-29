import { combineReducers } from "redux";
import watchListReducer from "./watchListReducer";
//AuthReducer

export default combineReducers({
  movie: watchListReducer
});
