import {
  CREATE_SUPPLIES_REQUEST,
  CREATE_SUPPLIES_SUCCESS,
  CREATE_SUPPLIES_FAIL,
  CLEAR_ERRORS,
  GET_SUPPLIES_REQUEST,
  GET_SUPPLIES_SUCCESS,
  GET_SUPPLIES_FAIL,
  DELETE_SUPPLIES_FAIL,
  DELETE_SUPPLIES_SUCCESS,
  UPDATE_SUPPLIES_REQUEST,
  UPDATE_SUPPLIES_SUCCESS,
  UPDATE_SUPPLIES_FAIL,
  CREATE_REQUEST_SUPPLIES_SUCCESS,
  CREATE_REQUEST_SUPPLIES_REQUEST,
  CREATE_REQUEST_SUPPLIES_FAIL,
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_SUCCESS,
  APPROVE_SUPPLIES_FAIL,
  APPROVE_SUPPLIES_SUCCESS,
} from "../type/supplies";
import axios from "axios";

// Register Supplies
export const createSupplies = (suppliesData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUPPLIES_REQUEST });

    let { data } = await axios.post(`/api/supplies/add`, suppliesData);

    dispatch({
      type: CREATE_SUPPLIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SUPPLIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Supplies
export const getSupplies = (role) => async (dispatch) => {
  try {
    dispatch({ type: GET_SUPPLIES_REQUEST });

    const supplies = await axios.get(`/api/supplies`);
    let request;

    if (role === "Executive") {
      request = await axios.get(`/api/supplies/request`);
    } else {
      request = await axios.get(`/api/supplies/request/me`);
    }

    dispatch({
      type: GET_SUPPLIES_SUCCESS,
      payload: {
        supplies: supplies.data.supplies,
        requests: request.data.supplies,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_SUPPLIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Supplies
export const deleteSupplies = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/supplies/${id}`);

    dispatch({
      type: DELETE_SUPPLIES_SUCCESS,
      payload: data.supplies,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SUPPLIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Supplies
export const updateSupplies = (updatedData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SUPPLIES_REQUEST });

    const { data } = await axios.put(`/api/supplies/${id}`, updatedData);

    dispatch({
      type: UPDATE_SUPPLIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SUPPLIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Request Supplies
export const requestSupplies = (requestData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REQUEST_SUPPLIES_REQUEST });

    const { data } = await axios.post(`/api/supplies/request/add`, requestData);

    dispatch({
      type: CREATE_REQUEST_SUPPLIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REQUEST_SUPPLIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Supplies
export const deleteRequest = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/supplies/request/${id}`);

    dispatch({
      type: DELETE_REQUEST_SUCCESS,
      payload: data.supplies,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REQUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Supplies
export const approveRequest = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/supplies/request/approve/${id}`);

    dispatch({
      type: APPROVE_SUPPLIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPROVE_SUPPLIES_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
