import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  AUTH_ERROR
} from "../actions/types";

const DEAFAULT_STATE = {
  token: "",
  isAuthenticated: false,
  errorMessage: ""
};

export default function(state = DEAFAULT_STATE, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        token: ""
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
