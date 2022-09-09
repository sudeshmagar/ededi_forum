import {
  CREATE_TOPIC,
  CREATE_TOPIC_FAILURE,
  CREATE_TOPIC_SUCCESS,
  POST_FETCH,
  POST_FETCH_SUCCESS,
} from "../Types";

function reducer(state, action) {
  switch (action.type) {
    case POST_FETCH:
      return {
        ...state,
        loading: true,
      };
    case POST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload.res.data,
      };

    case CREATE_TOPIC:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TOPIC_SUCCESS:
      return {
        ...state,
        posts: [action.payload.data, ...state.posts],
      };
    case CREATE_TOPIC_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return {
        ...state,
      };
  }
}

export default reducer;
