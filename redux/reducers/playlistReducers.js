import {
    ALL_PLAYLISTS_SUCCESS,
    ALL_PLAYLISTS_FAILURE,
    ADD_TO_PLAYLIST_SUCCESS,
    ADD_TO_PLAYLIST_FAILURE,
    REMOVE_FROM_PLAYLIST_SUCCESS,
    REMOVE_FROM_PLAYLIST_FAILURE,
    CLEAR_ERRORS
} from '../constants/playlistConstants';

export const allPlaylitsReducer = (state= {playlists: []}, action) => {
  switch (action.type) {
    case ALL_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: [action.payload]
      }
    case ALL_PLAYLISTS_FAILURE:
      return {
        ...state,
        error: action.payload.error
      }

    case ADD_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.payload.status
      }
    case ADD_TO_PLAYLIST_FAILURE:
      return {
        ...state,
        success: false,
        message: action.payload.response.data.message
      }
    case REMOVE_FROM_PLAYLIST_SUCCESS:
      return {
        ...state,
        success: true,
        message: "Track has been removed from playlist."
      }
    case REMOVE_FROM_PLAYLIST_FAILURE:
      return {
        ...state,
        success: false,
        message: action.payload.response.data.message
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
        return state;
  }
}