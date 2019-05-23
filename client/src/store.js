import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import jwtDecode from "jwt-decode";

//Storing the JWTtoken on the client saves on client's storage (browser)
const jwtToken = localStorage.getItem("JWT_TOKEN");

const decodedToken = jwtToken ? jwtDecode(jwtToken) : "";

const initalState = {
  auth: {
    token: jwtToken,
    isAuthenticated: jwtToken ? true : false,
    userID: jwtToken ? decodedToken._id : ""
  }
};

//Creating the middleware
//"help functions"
const middleware = [thunk];

//Creating the store
//The recuders, initial state for users
const store = createStore(
  rootReducer,
  initalState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
