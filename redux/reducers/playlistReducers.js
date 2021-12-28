import {
    ALL_PLAYLISTS_SUCCESS,
    ALL_PLAYLISTS_FAILURE,
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
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
        return state;
  }
}