import {
  TOPIC_FETCH,
  TOPIC_FETCH_SUCCESS,
  CREATE_FORUM,
  CREATE_FORUM_SUCCESS,
  CREATE_FORUM_FAILURE,
  RECENT_TOPIC_FETCH,
  RECENT_TOPIC_FETCH_SUCCESS,
} from "../Types";

function reducer(state, action) {
  switch (action.type) {
    case TOPIC_FETCH:
      return {
        ...state,
        loading: true,
      };
    case TOPIC_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        topics: action.payload.res.data,
      };
    case RECENT_TOPIC_FETCH:
      return {
        ...state,
        loading: true,
      };
    case RECENT_TOPIC_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        recent: action.payload.res.data,
      };
    case CREATE_FORUM:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FORUM_SUCCESS:
      return {
        ...state,
        topics: [action.payload.data, ...state.topics],
      };
    case CREATE_FORUM_FAILURE:
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
