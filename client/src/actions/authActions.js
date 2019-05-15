import axios from "axios";
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT_SUCCESS } from "./types";

// TODO: Lägg till catch på axios
export const oauthGoogle = data => async dispatch => {
  const res = await axios.post("http://localhost:5000/api/users/oauth/google", {
    access_token: data
  });

  console.log("res oauthGoogle post", res);
  dispatch({
    type: AUTH_LOGIN_SUCCESS,
    payload: res.data
  });

  //localStorage.setItem("JWT_TOKEN", res.data.token);
  console.log("JWT token google", res.data.token);
  console.log("User ID", res.data.tempUserID);
};

export const oauthFacebook = data => async dispatch => {
  const res = await axios.post(
    "http://localhost:5000/api/users/oauth/facebook",
    {
      access_token: data
    }
  );

  console.log("res oauthFacebook post", res);
  dispatch({
    type: AUTH_LOGIN_SUCCESS,
    payload: res.data
  });
  console.log("JWT token facebook", res.data.token);
  console.log("User ID", res.data.tempUserID);

  //localStorage.setItem("JWT_TOKEN", res.data.token);
};

export const logout = () => dispatch => {
  console.log("Logging out...");
  dispatch({
    type: AUTH_LOGOUT_SUCCESS,
    payload: ""
  });
  //localStorage.removeItem("JWT_TOKEN");
};