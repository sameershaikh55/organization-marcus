import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_RESET,
  CLEAR_ERRORS,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
} from "../type/users";

export const users = (
  state = {
    users: [],
  },
  action
) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        userLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        success: action.payload.success,
        users: [...state.users, action.payload.user],
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        userLoading: false,
        success: action.payload.success,
        users: state.users.map((content) =>
          content._id === action.payload.user._id
            ? (content = action.payload.user)
            : content
        ),
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        userDeleted: true,
        users: state.users.filter(({ _id }) => _id !== action.payload._id),
      };
    case REGISTER_USER_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        userLoading: false,
        success: false,
        userError: action.payload,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USERS_FAIL:
      return {
        users: [],
        loading: false,
        error: action.payload,
      };
    case REGISTER_USER_RESET:
    case DELETE_USER_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        success: false,
        userDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        userError: null,
      };

    default:
      return state;
  }
};
