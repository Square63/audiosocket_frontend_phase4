import axios from "axios";
// import absoluteUrl from "next-absolute-url";
import { async } from "regenerator-runtime";
import {BASE_URL} from "../../common/api";

import {
	ALL_TRACKS_SUCCESS,
	ALL_TRACKS_FAILURE,
	CLEAR_ERRORS
} from '../constants/trackConstants';

export const getTracks = (query, query_type, filters) => async( dispatch ) => {
	try {
		// const {origin} = absoluteUrl(req)
		const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${filters}`, {
			headers: {
				"Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
				"auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MSwiZXhwIjoxNjY5NDQ2OTQ1fQ.fRouI5TJ78D-ANMrsGLj7v-u6Y0E1tyej-rGAmulFvw"
			}
		});
		dispatch({
			type: ALL_TRACKS_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: ALL_TRACKS_FAILURE,
			payload: error
		})
		
	}

}

export const clearErrors = () => async(dispatch) => {
	dispatch({
		type: CLEAR_ERRORS
	})
}