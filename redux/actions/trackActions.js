import axios from "axios";
// import absoluteUrl from "next-absolute-url";
import { async } from "regenerator-runtime";
import {BASE_URL} from "../../common/api";
import { useCookie } from 'next-cookie'

import {
  ALL_TRACKS_SUCCESS,
  ALL_TRACKS_FAILURE,
  ADD_TO_FAVOURITES_SUCCESS,
  ADD_TO_FAVOURITES_FAILURE,
  REMOVE_FROM_FAVOURITES_SUCCESS,
  REMOVE_FROM_FAVOURITES_FAILURE,
  CLEAR_ERRORS
} from '../constants/trackConstants';

export const getTracks = (query, query_type, filters, sort_by, sort_dir, page) => async( dispatch ) => {  
  const cookie = useCookie()
  const authToken = cookie.get("user")
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${filters}&order_by=${sort_by}&page=${page}&direction=${sort_dir}&per_page=10&pagination=true`, {
      headers: {
        "auth-token": authToken ? authToken : ""
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

export const getTracksFromAIMS = (trackId) => async( dispatch ) => {
  if (trackId) {
    try {
      const {data} = await axios.request({
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
          "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MSwiZXhwIjoxNjY5NDQ2OTQ1fQ.fRouI5TJ78D-ANMrsGLj7v-u6Y0E1tyej-rGAmulFvw"
        },
        method: "post",
        url: "http://artist-portal-backend-phase4.square63.net/api/v1/consumer/tracks/upload_track_search",
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
  } else {
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
        data: localStorage.getItem("formData")
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
  

}

export const addToFavorites = (trackId) => async (dispatch) => {
  let klass = "track";
  const cookie = useCookie()
  let authToken = cookie.get("user")
  try {
    const {data} = await axios.request({
      headers: {
        "auth-token": authToken ? authToken : ""
      },
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/favorites_following/favorite`,
      data: {
        id: trackId,
        klass: klass
      }
    })
    dispatch({
      type: ADD_TO_FAVOURITES_SUCCESS,
      payload: data
    })
  } catch (error) {
      dispatch({
        type: ADD_TO_FAVOURITES_FAILURE,
        payload: error
      })
  }
};

export const removeFromFavorites = (trackId) => async (dispatch) => {
  let klass = "track";
  try {
    const {data} = await axios.request({
      headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MzIsImV4cCI6MTY3MjEzNjUwM30.cc7TolYBSMVCPjRdjLApO5RyRoVzSmKHFdpTLiTqgog"
      },
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/favorites_following/unfavorite`,
      data: {
        id: trackId,
        klass: klass
      }
    })
    dispatch({
      type: REMOVE_FROM_FAVOURITES_SUCCESS,
      payload: data
    })
  } catch (error) {
      dispatch({
        type: REMOVE_FROM_FAVOURITES_FAILURE,
        payload: error
      })
  }
};

export const clearErrors = () => async(dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}