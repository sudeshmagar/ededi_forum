import {
  USER_SIGNUP,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from "./../Types";

function reducer(state, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      return {
        loading: false,
        loggedIn: true,
        username: action.payload.username,
      };
    case USER_LOGIN_FAILURE:
      return {
        loading: false,
        message: action.message,
      };
    case USER_LOGOUT:
      localStorage.clear();
      return {
        loggedIn: false,
      };
    case USER_SIGNUP:
      return{
        loading:true,
      };
    case USER_SIGNUP_SUCCESS:
      return{
        loading: false,
        register: true,
        username: action.payload.username,
      };
    case USER_SIGNUP_FAILURE:
      return{
        loading: false,
        register: false,
      }
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
