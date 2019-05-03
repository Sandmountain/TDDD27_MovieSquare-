import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import rootReducer from "./reducers";

const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["x-auth-token"] = jwtToken;

const initalState = {
  auth: {
    token: jwtToken,
    isAuthenticated: jwtToken ? true : false
  }
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initalState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
