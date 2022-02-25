import { LOGIN_SUCCESS, LOGIN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, UPDATE_PASSWORD_SUCCESS, 
         UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, GET_PLAYLISTS_SUCCESS, 
         GET_PLAYLISTS_FAIL, GET_USER_SUCCESS, GET_USER_FAIL, CLEAR_ERRORS, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAIL, PLAYLIST_TRACKS_SUCCESS, PLAYLIST_TRACKS_FAIL } from "../constants/authConstants";
export const authReducer = (state = {user: {}, error: {}}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: action.payload.auth_token,
        userDetails: action.payload
      };
    case LOGIN_FAIL:
      return {
        error: action.payload.response.data,
      };
    case SIGN_UP_SUCCESS:
      return {
        user: action.payload.auth_token,
        userDetails: action.payload
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
        user: action.payload.response.data.errors
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
    case GET_PLAYLISTS_SUCCESS:
      return {
        ...state,
        followedPlaylists: action.payload.consumer_playlists,
      };
    case GET_PLAYLISTS_FAIL:
      return {
        ...state,
        followedPlaylists: action.payload.response.data.errors
      };

    case GET_ARTISTS_SUCCESS:
      return {
        ...state,
        followedArtists: action.payload.users,
      };
    case GET_ARTISTS_FAIL:
      return {
        ...state,
        followedArtists: action.payload.response.data.errors
      };
    case PLAYLIST_TRACKS_SUCCESS:
      return {
        ...state,
        playlist_details: action.payload,
      };
    case PLAYLIST_TRACKS_FAIL:
      return {
        ...state,
        playlist_details: action.payload.response.data.errors
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
