import { LOGIN_SUCCESS, LOGIN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, CLEAR_ERRORS } from "../constants/authConstants";
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
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
		}
};
