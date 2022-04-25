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

export const getTracks = (query, query_type, filters, sort_by, sort_dir, page, explicit, exclude_vocals) => async( dispatch ) => {
  let url = `${BASE_URL}/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${filters}&order_by=${sort_by}&page=${page}&direction=${sort_dir}&per_page=10&pagination=true`
  
  if (explicit === false && exclude_vocals === true){
    url = `${BASE_URL}/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${filters}&order_by=${sort_by}&page=${page}&direction=${sort_dir}&per_page=10&pagination=true&explicit=${explicit}&exclude_vocals=${exclude_vocals}`
  }
  else if (explicit === false){
    url = `${BASE_URL}/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${filters}&order_by=${sort_by}&page=${page}&direction=${sort_dir}&per_page=10&pagination=true&explicit=${explicit}`
  } 
  else if (exclude_vocals === true){
    url = `${BASE_URL}/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${filters}&order_by=${sort_by}&page=${page}&direction=${sort_dir}&per_page=10&pagination=true&exclude_vocals=${exclude_vocals}`
  }
    
  const cookie = useCookie()
  const authToken = cookie.get("user")
  try {
    const {data} = await axios.get(url, {
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
        method: "post",
        url: `https://artist-portal-backend-phase4.square63.net/api/v1/consumer/tracks/${trackId}/similar_tracks`,
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
    let uploadedFile = document.getElementById("uploadedFile").files[0]
    const formData = new FormData();
    formData.append('file', uploadedFile)
    try {
      const {data} = await axios.request({
        method: "post",
        url: "https://artist-portal-backend-phase4.square63.net/api/v1/consumer/tracks/upload_track_search",
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
  const cookie = useCookie()
  let authToken = cookie.get("user")
  try {
    const {data} = await axios.request({
      headers: {
        "auth-token": authToken ? authToken : ""
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