import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_ERROR
} from "../actions/types";

const DEAFAULT_STATE = {
  token: localStorage.getItem("JWT_TOKEN"),
  isAuthenticated: false,
  errorMessage: "",
  userID: ""
};

export default function(state = DEAFAULT_STATE, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      localStorage.setItem("JWT_TOKEN", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userID: action.payload.tempUserID
      };
    case AUTH_LOGOUT_SUCCESS:
      localStorage.removeItem("JWT_TOKEN");
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        userID: ""
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
