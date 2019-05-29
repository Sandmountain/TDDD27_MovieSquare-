import axios from "axios";
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS } from "./types";

// TODO: Lägg till catch på axios
export const oauthGoogle = data => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/oauth/google",
      {
        access_token: data
      }
    );

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const oauthFacebook = data => async dispatch => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/oauth/facebook",
      {
        access_token: data
      }
    );

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: AUTH_LOGOUT_SUCCESS,
    payload: ""
  });
};
