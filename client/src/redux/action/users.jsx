import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../type/users";
import axios from "axios";

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    let { data } = await axios.post(`/api/auth/register`, userData);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });

    const { data } = await axios.get(`/api/auth/users`);

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Users
export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/auth/user/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User
export const updateUser = (updatedData, id, wholeUser) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    if (wholeUser) {
      const { data } = await axios.patch(`/api/auth/user/${id}`, updatedData);

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      });
    } else {
      const { data } = await axios.put(`/api/auth/user/${id}`, updatedData);

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
