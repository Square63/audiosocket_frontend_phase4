import { LOGIN_SUCCESS, LOGIN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, GET_USER_SUCCESS, GET_USER_FAIL, CLEAR_ERRORS } from "../constants/authConstants";
export const authReducer = (state = {user: {}, error: {}}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: action.payload.auth_token,
      };
    case LOGIN_FAIL:
      return {
        error: action.payload.response.data,
      };
    case SIGN_UP_SUCCESS:
      return {
        user: action.payload.auth_token,
      };
    case SIGN_UP_FAIL:
      return {
        error: action.payload.response.data.errors
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        user: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        error: action.payload.response.data.message
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        user: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        error: action.payload.response.data.message
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        error: action.payload.response.data.errors
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
    }
};
