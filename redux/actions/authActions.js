import axios from "axios";
import {BASE_URL} from "../../common/api";

import { LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, SIGN_UP_SUCCESS, SIGN_UP_FAIL, GET_USER_SUCCESS, GET_USER_FAIL } from "../constants/authConstants";

export const authLogin = (data) => async (dispatch) => {
	let email = data.email;
	let password = data.password;
	try {
			const {data} = await axios.post(`${BASE_URL}/api/v1/consumer/session`, { email, password });
			dispatch({
					type: LOGIN_SUCCESS,
					payload: data
			});
	} catch (error) {
			dispatch({
					type: LOGIN_FAIL,
					payload: error
			})
	}
};

export const authSignup = (data) => async (dispatch) => {
	let email = data.email;
	let first_name = data.first_name;
	let last_name = data.last_name;
	let password = data.password;
	let password_confirmation = data.password_confirmation;
	let content_type = data.content_type;
	try {
		const {data} = await axios.post(`${BASE_URL}/api/v1/consumer/session/signup`, { email, first_name, last_name, password, password_confirmation, content_type });
		dispatch({
				type: SIGN_UP_SUCCESS,
				payload: data
		})
	} catch (error) {
			dispatch({
				type: SIGN_UP_FAIL,
				payload: error
			})
	}
};

export const getUser = () => async (dispatch) => {
	try {
		const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/session/signup`, { email, first_name, last_name, password, password_confirmation, content_type });
		dispatch({
			type: GET_USER_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: GET_USER_FAIL,
			payload: error
		})
	}
};

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}