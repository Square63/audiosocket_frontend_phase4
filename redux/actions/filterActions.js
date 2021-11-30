import axios from "axios";
// import absoluteUrl from "next-absolute-url";
import { async } from "regenerator-runtime";

import {
	ALL_FILTERS_SUCCESS,
	ALL_FILTERS_FAILURE,
	CLEAR_ERRORS
} from '../constants/filterConstants';

export const getFilters = (req) => async( dispatch ) => {
	try {
		// const {origin} = absoluteUrl(req)
		const {data} = await axios.get('http://artist-portal-backend.square63.net/api/v1/filters')
		dispatch({
			type: ALL_FILTERS_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: ALL_FILTERS_FAILURE,
			payload: error.response.message
		})
		
	}

}

export const clearErrors = () => async(dispatch) => {
	dispatch({
		type: CLEAR_ERRORS
	})
}