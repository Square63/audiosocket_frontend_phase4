import {
  ALL_TRACKS_SUCCESS,
  ALL_TRACKS_FAILURE,
  ADD_TO_FAVOURITES_SUCCESS,
  ADD_TO_FAVOURITES_FAILURE,
  REMOVE_FROM_FAVOURITES_SUCCESS,
  REMOVE_FROM_FAVOURITES_FAILURE,
  ALL_SFXES_SUCCESS,
  ALL_SFXES_FAILURE,
  CLEAR_ERRORS,
  ARTIST_TRACKS_SUCCESS
} from '../constants/trackConstants';

export const allTracksReducer = (state= {tracks: []}, action) => {
  switch (action.type) {
    case ALL_TRACKS_SUCCESS:
      return {
        tracksCount: 7,
        resPerPage: 1,
        tracks: [action.payload]
      }
    case ARTIST_TRACKS_SUCCESS:
      return {
        tracksCount: 7,
        resPerPage: 1,
        tracks: [action.payload]
      }
    case ALL_TRACKS_FAILURE:
      return {
        error: action.payload.response,
        responseStatus: action.payload.response.status
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    case ADD_TO_FAVOURITES_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.payload.status
      }
    case ADD_TO_FAVOURITES_FAILURE:
      return {
        ...state,
        success: false,
        message: action.payload.response.data.message
      }
    case REMOVE_FROM_FAVOURITES_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.payload.status
      }
    case REMOVE_FROM_FAVOURITES_FAILURE:
      return {
        ...state,
        success: false,
        message: action.payload.response.data.message
      }
    case ALL_SFXES_SUCCESS:
      return {
        tracks: [action.payload]
      }
    case ALL_SFXES_FAILURE:
      return {
        error: action.payload.response,
        responseStatus: action.payload.response.status
      }

    default:
        return state;
  }
}
