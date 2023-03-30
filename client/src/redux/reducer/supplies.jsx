import {
  CREATE_SUPPLIES_REQUEST,
  CREATE_SUPPLIES_SUCCESS,
  CREATE_SUPPLIES_FAIL,
  CREATE_SUPPLIES_RESET,
  CLEAR_ERRORS,
  GET_SUPPLIES_REQUEST,
  GET_SUPPLIES_SUCCESS,
  GET_SUPPLIES_FAIL,
  DELETE_SUPPLIES_SUCCESS,
  DELETE_SUPPLIES_FAIL,
  DELETE_SUPPLIES_RESET,
  UPDATE_SUPPLIES_REQUEST,
  UPDATE_SUPPLIES_SUCCESS,
  UPDATE_SUPPLIES_FAIL,
  UPDATE_SUPPLIES_RESET,
  CREATE_REQUEST_SUPPLIES_REQUEST,
  CREATE_REQUEST_SUPPLIES_SUCCESS,
  CREATE_REQUEST_SUPPLIES_RESET,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAIL,
  DELETE_REQUEST_RESET,
  APPROVE_SUPPLIES_SUCCESS,
  APPROVE_SUPPLIES_FAIL,
  APPROVE_SUPPLIES_RESET,
} from "../type/supplies";

export const supplies = (
  state = {
    supplies: [],
    requests: [],
  },
  action
) => {
  switch (action.type) {
    case GET_SUPPLIES_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SUPPLIES_REQUEST:
    case UPDATE_SUPPLIES_REQUEST:
      return {
        ...state,
        suppliesLoading: true,
      };
    case CREATE_REQUEST_SUPPLIES_REQUEST:
      return {
        ...state,
        requestLoading: true,
      };
    case CREATE_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesLoading: false,
        success: action.payload.success,
        supplies: [...state.supplies, action.payload.supplies],
      };
    case CREATE_REQUEST_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesLoading: false,
        requestSuccess: action.payload.success,
        requests: [...state.requests, action.payload.supplies],
      };
    case APPROVE_SUPPLIES_SUCCESS:
      return {
        ...state,
        requestApproveSuccess: action.payload.success,
        requests: state.requests.filter(
          ({ _id }) => _id !== action.payload.supplies.requests._id
        ),
        supplies: state.supplies.map((content) =>
          content._id === action.payload.supplies.supplies._id
            ? (content = action.payload.supplies.supplies)
            : content
        ),
      };
    case UPDATE_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesLoading: false,
        success: action.payload.success,
        supplies: state.supplies.map((content) =>
          content._id === action.payload.supplies._id
            ? (content = action.payload.supplies)
            : content
        ),
      };
    case GET_SUPPLIES_SUCCESS:
      return {
        ...state,
        loading: false,
        supplies: action.payload.supplies,
        requests: action.payload.requests,
      };
    case DELETE_SUPPLIES_SUCCESS:
      return {
        ...state,
        suppliesDeleted: true,
        supplies: state.supplies.filter(
          ({ _id }) => _id !== action.payload._id
        ),
      };
    case DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        requestDeleted: true,
        requests: state.requests.filter(
          ({ _id }) => _id !== action.payload._id
        ),
      };
    case CREATE_SUPPLIES_FAIL:
      return {
        ...state,
        requestLoading: false,
        error: action.payload,
      };
    case CREATE_SUPPLIES_FAIL:
    case UPDATE_SUPPLIES_FAIL:
      return {
        ...state,
        suppliesLoading: false,
        success: false,
        suppliesError: action.payload,
      };
    case DELETE_SUPPLIES_FAIL:
    case DELETE_REQUEST_FAIL:
    case APPROVE_SUPPLIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SUPPLIES_FAIL:
      return {
        supplies: [],
        loading: false,
        error: action.payload,
      };
    case CREATE_SUPPLIES_RESET:
    case DELETE_SUPPLIES_RESET:
    case UPDATE_SUPPLIES_RESET:
    case CREATE_REQUEST_SUPPLIES_RESET:
    case DELETE_REQUEST_RESET:
    case APPROVE_SUPPLIES_RESET:
      return {
        ...state,
        success: false,
        requestDeleted: false,
        suppliesDeleted: false,
        requestSuccess: false,
        requestApproveSuccess: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        suppliesError: null,
      };

    default:
      return state;
  }
};
