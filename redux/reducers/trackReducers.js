import {
	ALL_TRACKS_SUCCESS,
	ALL_TRACKS_FAILURE,
	CLEAR_ERRORS
} from '../constants/trackConstants';

export const allTracksReducer = (state= {tracks: []}, action) => {
	switch (action.type) {
		case ALL_TRACKS_SUCCESS:
			return {
				tracksCount: 7,
				resPerPage: 1,
				tracks: [action.payload]
			}
		case ALL_TRACKS_FAILURE:
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