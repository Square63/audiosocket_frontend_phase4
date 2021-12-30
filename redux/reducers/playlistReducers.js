import {
    ALL_PLAYLISTS_SUCCESS,
    ALL_PLAYLISTS_FAILURE,
    ADD_TO_PLAYLIST_SUCCESS,
    ADD_TO_PLAYLIST_FAILURE,
    CLEAR_ERRORS
} from '../constants/playlistConstants';

export const allPlaylitsReducer = (state= {playlists: []}, action) => {
  switch (action.type) {
    case ALL_PLAYLISTS_SUCCESS:
      return {
        playlistsCount: 7,
        resPerPage: 1,
        playlists: [action.payload]
      }
    case ALL_PLAYLISTS_FAILURE:
      return {
        error: action.payload.error
      }

    case ADD_TO_PLAYLIST_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.payload.status
      }
    case ADD_TO_PLAYLIST_FAILURE:
      console.log("ACTION", action)
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