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
  ARTIST_TRACKS_SUCCESS,
  ALL_LICENSES_SUCCESS,
  ALL_LICENSES_FAILURE,
  ATTACH_TO_MEDIA_SUCCESS,
  ATTACH_TO_MEDIA_FAILURE
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
    case ALL_LICENSES_SUCCESS:

      return {
        ...state,
        licenses: action.payload.licenses
      }
    case ALL_LICENSES_FAILURE:
      return {
        error: action.payload.response,
        responseStatus: action.payload.response.status
      }
    case ATTACH_TO_MEDIA_SUCCESS:
      return {
        ...state,
        licenses112: action.payload.licenses
      }
    case ATTACH_TO_MEDIA_FAILURE:
      return {
        error: action.payload.response,
        responseStatus: action.payload.response.status,
        errorMessage: action.payload.response.data.message
      }

    default:
        return state;
  }
}
