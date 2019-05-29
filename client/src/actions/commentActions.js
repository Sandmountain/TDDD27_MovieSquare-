import axios from "axios";
import {
  GET_COMMENTS,
  ADD_COMMENT,
  LOADING_COMMENT,
  LOADING_ADDED_COMMENT
} from "./types";
import jwtDecode from "jwt-decode";

export const getComments = movieID => async dispatch => {
  try {
    dispatch(setCommentsLoading());
    const res = await axios.get(`/api/comments/movieID/${movieID}`);

    await dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const addComment = (commentText, movieID) => async dispatch => {
  try {
    const jwtToken = localStorage.getItem("JWT_TOKEN");
    const decodedToken = jwtToken ? jwtDecode(jwtToken) : "";

    const commentObj = {
      userID: decodedToken._id,
      userName: decodedToken.facebook
        ? decodedToken.facebook.name
        : decodedToken.google.name,
      comment: commentText,
      movieID: movieID
    };

    const res = await axios.post("/api/comments/movieID/", commentObj);

    await dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const setCommentsLoading = () => {
  return {
    type: LOADING_COMMENT
  };
};

export const newCommentLoading = () => {
  return {
    type: LOADING_ADDED_COMMENT
  };
};
