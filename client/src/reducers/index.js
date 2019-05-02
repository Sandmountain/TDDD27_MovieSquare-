import { combineReducers } from "redux";
import watchListReducer from "./watchListReducer";
import authReducer from "./authReducer";
//AuthReducer

export default combineReducers({
  movie: watchListReducer,
  auth: authReducer
});
