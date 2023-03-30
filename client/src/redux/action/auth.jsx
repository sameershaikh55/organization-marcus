import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTERATION_FAIL,
  REGISTERATION_REQUEST,
  REGISTERATION_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
} from "../type/auth";
import axios from "axios";

// Login
export const login = (email, password, role) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/auth/login`,
      { email, password, role },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Reset Password
export const resetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.patch(
      `/api/auth/password/reset/${token}`,
      password,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const updateProfile = (updateData) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.patch(
      `/api/profile/update`,
      updateData,
      config
    );

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/auth/user-data`);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/auth/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
