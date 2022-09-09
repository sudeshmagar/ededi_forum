import axiosInstance from "../../utils/axiosInstance";
import toast from "../../utils/toast";
import {
  CREATE_TOPIC,
  CREATE_TOPIC_FAILURE,
  CREATE_TOPIC_SUCCESS,
  POST_FETCH,
  POST_FETCH_SUCCESS,
} from "../Types";

export const fetchPOstById = (id) => (dispatch) => {
  dispatch({ type: POST_FETCH });
  axiosInstance
    .GET("/posts/byTopicId/" + id)
    .then((res) => {
      dispatch({
        type: POST_FETCH_SUCCESS,
        payload: {
          res,
        },
      });
    })
    .catch((error) => {});
};

export const createTopic = (data) => (dispatch) => {
  dispatch({ type: CREATE_TOPIC });
  axiosInstance
    .POST("/posts", data)
    .then((out) => {
      console.log(out);
      dispatch({ type: CREATE_TOPIC_SUCCESS, payload: out });
      toast.success("Topic Created Successful");
    })

    .catch((error) => {
      dispatch({
        type: CREATE_TOPIC_FAILURE,
        message: error.response.data.error,
      });
      toast.error(error.response.data.error);
    });
};
