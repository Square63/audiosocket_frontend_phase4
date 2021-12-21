import axios from "axios";
// import absoluteUrl from "next-absolute-url";
import { async } from "regenerator-runtime";
import {BASE_URL} from "../../common/api";

import {
  ALL_TRACKS_SUCCESS,
  ALL_TRACKS_FAILURE,
  CLEAR_ERRORS
} from '../constants/trackConstants';

export const getTracks = (query, query_type, filters, sort_by, sort_dir, page) => async( dispatch ) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${filters}&order_by=${sort_by}&page=${page}&direction=${sort_dir}&per_page=10&pagination=true`, {
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

export const getTracksFromAIMS = () => async( dispatch ) => {
  let uploadedFile = document.getElementById("formFile").files[0]
  const formData = new FormData();
  formData.append('file', uploadedFile)  
  try {
    const {data} = await axios.request({
      headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MSwiZXhwIjoxNjY5NDQ2OTQ1fQ.fRouI5TJ78D-ANMrsGLj7v-u6Y0E1tyej-rGAmulFvw"
      },
      method: "post",
      url: "http://artist-portal-backend-phase4.square63.net/api/v1/consumer/tracks/upload_track_search",
      data: formData
    })
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