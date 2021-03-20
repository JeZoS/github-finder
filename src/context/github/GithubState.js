import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
  SEARCH_USERS,
  SET_LOADING,
} from "../types";

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: data.items,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  const getUser = async (username) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    dispatch({
      type: GET_USER,
      payload: data,
    });
  };

  const getUserRepos = async (username) => {
    setLoading();
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
