import axiosInstance from "../../utils/axiosInstance";
import toast from "../../utils/toast";
import {
  TOPIC_FETCH,
  TOPIC_FETCH_SUCCESS,
  USER_LOGOUT,
  CREATE_FORUM,
  CREATE_FORUM_SUCCESS,
  CREATE_FORUM_FAILURE,
  RECENT_TOPIC_FETCH,
  RECENT_TOPIC_FETCH_SUCCESS,
} from "../Types";

export const fetchTopics = () => (dispatch) => {
  dispatch({ type: TOPIC_FETCH });
  axiosInstance
    .GET("/topics")
    .then((res) => {
      dispatch({
        type: TOPIC_FETCH_SUCCESS,
        payload: {
          res,
        },
      });
    })
    .catch((error) => {});
};
export const fetchRecentTopics = () => (dispatch) => {
  dispatch({ type: RECENT_TOPIC_FETCH });
  axiosInstance
    .GET("/posts/recent")
    .then((res) => {
      dispatch({
        type: RECENT_TOPIC_FETCH_SUCCESS,
        payload: {
          res,
        },
      });
    })
    .catch((error) => {});
};
export const createForum = (data) => (dispatch) => {
  dispatch({ type: CREATE_FORUM });
  axiosInstance
    .POST("/topics", data)
    .then((out) => {
      console.log(out);
      dispatch({ type: CREATE_FORUM_SUCCESS, payload: out });
      toast.success("Forum Created Successful");
    })

    .catch((error) => {
      dispatch({
        type: CREATE_FORUM_FAILURE,
        message: error.response.data.error,
      });
      toast.error(error.response.data.error);
    });
};
