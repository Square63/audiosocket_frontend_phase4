import { LOGIN_SUCCESS, LOGIN_FAIL, SIGN_UP_SUCCESS, SIGN_UP_FAIL, UPDATE_PASSWORD_SUCCESS,
         UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, GET_PLAYLISTS_SUCCESS,
         GET_PLAYLISTS_FAIL, GET_USER_SUCCESS, GET_USER_FAIL, CLEAR_ERRORS, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAIL, PLAYLIST_TRACKS_SUCCESS, PLAYLIST_TRACKS_FAIL,
         FAVORITE_TRACKS_SUCCESS, FAVORITE_TRACKS_FAIL, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL, GET_CART_SUCCESS, GET_CART_FAIL,
         DOWNLOADED_TRACKS_SUCCESS, DOWNLOADED_TRACKS_FAIL, DOWNLOADED_SFXS_SUCCESS, DOWNLOADED_SFXS_FAIL, MY_PLAYLISTS_SUCCESS, MY_PLAYLISTS_FAIL,
         GET_FORGOT_PASSWORD_SUCCESS, GET_FORGOT_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, CURATED_PLAYLISTS_SUCCESS, CURATED_PLAYLISTS_FAIL,
         EDIT_WORK_TITLE_SUCCESS, EDIT_WORK_TITLE_FAIL, GET_PLANS_SUCCESS, GET_PLANS_FAIL, MY_PLAYLIST_DETAIL_SUCCESS, MY_PLAYLIST_DETAIL_FAIL, FACEBOOK_LOGIN_SUCCESS, GMAIL_LOGIN_SUCCESS,
         SOCIAL_LOGIN_FAIL, SOCIAL_AUTH_SUCCESS, SOCIAL_AUTH_FAIL, MY_PLAYLIST_TRACKS_SUCCESS, MY_PLAYLIST_TRACKS_FAIL, MY_PLAYLIST_ARTISTS_SUCCESS, MY_PLAYLIST_ARTISTS_FAIL,
         REMOVE_FROM_PLAYLIST_SUCCESS, REMOVE_FROM_PLAYLIST_FAIL } from "../constants/authConstants";

export const authReducer = (state = {user: {}, error: {}}, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: action.payload.auth_token,
        userDetails: action.payload,
      };
    case LOGIN_FAIL:
      return {
        error: action.payload.response.data,
      };
    case SIGN_UP_SUCCESS:
      return {
        user: action.payload.auth_token,
        userDetails: action.payload,
      };
    case SIGN_UP_FAIL:
      return {
        error: action.payload.response.data.errors,
      };
    case FACEBOOK_LOGIN_SUCCESS:
      return {
        url: action.payload.url,
        urlDetails: action.payload
      };
    case GMAIL_LOGIN_SUCCESS:
      return {
        url: action.payload.url,
        urlDetails: action.payload
      };
    case SOCIAL_LOGIN_FAIL:
      return {
        error: action.payload.response.data,
      };
    case SOCIAL_AUTH_SUCCESS:
      return {
        user: action.payload.response
      };
    case SOCIAL_AUTH_FAIL:
      return {
        error: action.payload.response.data.errors
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        user: action.payload,
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        user: action.payload.response.data.errors,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        user: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        error: action.payload.response.data.message,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        responseStatus: action.payload.response.status
      };
    case GET_PLAYLISTS_SUCCESS:
      return {
        ...state,
        followedPlaylists: action.payload,
      };
    case GET_PLAYLISTS_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        responseStatus: action.payload.response.status
      };

    case GET_ARTISTS_SUCCESS:
      return {
        ...state,
        followedArtists: action.payload,
      };
    case GET_ARTISTS_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        responseStatus: action.payload.response.status
      };
    case PLAYLIST_TRACKS_SUCCESS:
      return {
        ...state,
        playlist_details: action.payload,
      };
    case PLAYLIST_TRACKS_FAIL:
      return {
        ...state,
        playlist_details: action.payload.response.data.errors,
      };
    case FAVORITE_TRACKS_SUCCESS:
      return {
        ...state,
        favorite_tracks: action.payload,
      };
    case FAVORITE_TRACKS_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        responseStatus: action.payload.response.status
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        success: true,
        cart: action.payload.line_item,
        cartTrack: action.payload.track,
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        success: false,
        cart: action.payload.response.data.errors,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartLineItems: action.payload.line_items,
        cartTracks: action.payload.tracks,
      };
    case GET_CART_FAIL:
      return {
        ...state,
        cart: action.payload.response.data.errors
      };
    case DOWNLOADED_TRACKS_SUCCESS:
      return {
        ...state,
        downloaded_tracks: action.payload,
      };
    case DOWNLOADED_TRACKS_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        responseStatus: action.payload.response.status
      };
    case DOWNLOADED_SFXS_SUCCESS:
      return {
        ...state,
        downloaded_sfxs: action.payload,
      };
    case DOWNLOADED_SFXS_FAIL:
      return {
          ...state,
          downloaded_sfxs: action.payload.response.data.errors
        };
    case MY_PLAYLISTS_SUCCESS:
      return {
        ...state,
        my_playlists: action.payload.consumer_playlists,
      };
    case MY_PLAYLISTS_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        responseStatus: action.payload.response.status
      };
    case CURATED_PLAYLISTS_SUCCESS:
      return {
        ...state,
        curated_playlists: action.payload.curated_playlists,
      };
    case CURATED_PLAYLISTS_FAIL:
      return {
        ...state,
        error: action.payload.response.data,
        responseStatus: action.payload.response.status
      };
    case EDIT_WORK_TITLE_SUCCESS:
      return {
        ...state,
        workTitle: action.payload
      };
    case EDIT_WORK_TITLE_FAIL:
      return {
        ...state,
        workTitle: action.payload.response.data.errors
      };
    case GET_PLANS_SUCCESS:
      return {
        ...state,
        subscriptionPlans: action.payload.plans,
        currentPlan: action.payload.current_plan
      };
    case GET_PLANS_FAIL:
      return {
        subscriptionPlans: action.payload.response.data.errors
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case GET_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        forgot_password: true,
      };
    case GET_FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        success: false,
        forgot_password: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: true,
        reset_password: true,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        success: false,
        reset_password: false,
      };
    case MY_PLAYLIST_DETAIL_SUCCESS:
      return {
        ...state,
        my_playlist_detail: action.payload,
        success: true,
      };
    case MY_PLAYLIST_DETAIL_FAIL:
      return {
        ...state,
        my_playlist_detail: action.payload.response.data.errors,
        success: false,
      };

    case MY_PLAYLIST_TRACKS_SUCCESS:
      return {
        ...state,
        my_playlist_tracks: action.payload,
        success: true,
      };
    case MY_PLAYLIST_TRACKS_FAIL:
      return {
        ...state,
        my_playlist_detail: action.payload.response.data.errors,
        success: false,
      };
    case MY_PLAYLIST_ARTISTS_SUCCESS:
      return {
        ...state,
        my_playlist_artists: action.payload,
        success: true,
      };
    case MY_PLAYLIST_ARTISTS_FAIL:
      return {
        ...state,
        my_playlist_artists: action.payload.response.data.errors,
        success: false,
      };
    case REMOVE_FROM_PLAYLIST_SUCCESS:
      debugger
      return {
        ...state,
        my_playlist_tracks: action.payload,
        success: true,
      };
    case REMOVE_FROM_PLAYLIST_FAIL:
      return {
        ...state,
        my_playlist_detail: action.payload.response.data.errors,
        success: false,
      };
    default:
      return state;
  }
};
