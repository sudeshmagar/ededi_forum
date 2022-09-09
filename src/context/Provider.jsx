import React, { createContext, useReducer } from "react";

import AuthReducer from "./reducers/auth.reducer";
import TopicReducer from "./reducers/topic.reducer";
import PostReducer from "./reducers/post.reducer";
import ReplayReducer from "./reducers/reply.reducer";
const loginInitState = {
  message: null,
  loggedIn: !!localStorage.getItem("token"),
  loading: false,
  register: false,
  username: localStorage.getItem("username"),
};

const topicInitialState = {
  topics: [],
  loading: false,
  recent: [],
};
const postInitialState = {
  posts: [],
  loading: false,
};

const replayInitialState = {
  replies: [],
  loading: false,
};
export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(AuthReducer, loginInitState);
  const [topics, topicDispatch] = useReducer(TopicReducer, topicInitialState);
  const [posts, postDispatch] = useReducer(PostReducer, postInitialState);
  const [replies, replayDispatch] = useReducer(
    ReplayReducer,
    replayInitialState
  );

  return (
    <GlobalContext.Provider
      value={{
        loginState,
        loginDispatch,
        topics,
        topicDispatch,
        posts,
        postDispatch,
        replies,
        replayDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
