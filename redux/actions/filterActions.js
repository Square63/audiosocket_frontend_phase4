import axios from "axios";
// import absoluteUrl from "next-absolute-url";
import { async } from "regenerator-runtime";
import {BASE_URL} from "../../common/api";


import {
  ALL_FILTERS_SUCCESS,
  ALL_FILTERS_FAILURE,
  CLEAR_ERRORS
} from '../constants/filterConstants';

export const getFilters = (req) => async( dispatch ) => {
  try {
    // const {origin} = absoluteUrl(req)
    const {data} = await axios.get(`${BASE_URL}/api/v1/filters`)
    dispatch({
      type: ALL_FILTERS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_FILTERS_FAILURE,
      payload: error
    })
    
  }

}

export const clearErrors = () => async(dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}