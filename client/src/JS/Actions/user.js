import axios from "axios";

import {
  CURRENT_USER,
  DELETE_USER,
  FAIL_USER,
  GET_USERS,
  LOAD_USER,
  LOGOUT_USER,
  SUCC_USER,
} from "../ActionTypes/user";

export const register = (newUser) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let result = await axios.post("/api/user/register", newUser);
    dispatch({ type: SUCC_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let result = await axios.post("/api/user/login", user, config);

    dispatch({
      type: SUCC_USER,
      payload: {
        token: result.data.token,
        user: result.data.user,
        isAdmin: result.data.user.isAdmin,
      },
    });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const current = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    let result = await axios.get("/api/user/current", config);
    dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};

export const updateProfile = (user) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("token"),
      },
    };
    // console.log(user);
    // console.log(config);
    let result = await axios.put("/api/user/profile", user, config);
    dispatch({ type: SUCC_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const Users = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token ? token : "", // Add the Authorization header if token is present
      },
    };

    let response = await axios.get("api/user/allUsers", config);

    let listUsers = response.data;
    console.log(listUsers);

    dispatch({ type: GET_USERS, payload: listUsers });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    await axios.delete(`/api/user/${userId}`, config);
    dispatch({ type: DELETE_USER, payload: userId });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data.errors });
  }
};
