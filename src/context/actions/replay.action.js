import axiosInstance from "../../utils/axiosInstance";
import toast from "../../utils/toast";
import {
  CREATE_REPLAY,
  CREATE_REPLAY_FAILURE,
  CREATE_REPLAY_SUCCESS,
  REPLAY_FETCH,
  REPLAY_FETCH_SUCCESS,
} from "../Types";

export const fetchReplayById = (id) => (dispatch) => {
  dispatch({ type: REPLAY_FETCH });
  axiosInstance
    .GET("/comments/" + id)
    .then((res) => {
      dispatch({
        type: REPLAY_FETCH_SUCCESS,
        payload: {
          res,
        },
      });
    })
    .catch((error) => {});
};

export const createReplay = (data) => (dispatch) => {
  dispatch({ type: CREATE_REPLAY });
  axiosInstance
    .POST("/comments", data)
    .then((out) => {
      console.log(out);
      dispatch({ type: CREATE_REPLAY_SUCCESS, payload: out });
      toast.success("Reply Created Successful");
    })

    .catch((error) => {
      dispatch({
        type: CREATE_REPLAY_FAILURE,
        message: error.response.data.error,
      });
      toast.error(error.response.data.error);
    });
};

export const likePost = (data) => (dispatch) => {
  dispatch({ type: CREATE_REPLAY });
  axiosInstance
    .POST("/comments", data)
    .then((out) => {
      console.log(out);
      dispatch({ type: CREATE_REPLAY_SUCCESS, payload: out });
      toast.success("Reply Created Successful");
    })

    .catch((error) => {
      dispatch({
        type: CREATE_REPLAY_FAILURE,
        message: error.response.data.error,
      });
      toast.error(error.response.data.error);
    });
};
