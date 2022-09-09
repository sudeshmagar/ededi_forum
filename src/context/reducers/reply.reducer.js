import {
  CREATE_REPLAY,
  CREATE_REPLAY_FAILURE,
  CREATE_REPLAY_SUCCESS,
  REPLAY_FETCH,
  REPLAY_FETCH_SUCCESS,
} from "../Types";

function reducer(state, action) {
  switch (action.type) {
    case REPLAY_FETCH:
      return {
        ...state,
        loading: true,
      };
    case REPLAY_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        replies: action.payload.res.data,
      };

    case CREATE_REPLAY:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REPLAY_SUCCESS:
      return {
        ...state,
        replies: [action.payload.data, ...state.replies],
      };
    case CREATE_REPLAY_FAILURE:
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
