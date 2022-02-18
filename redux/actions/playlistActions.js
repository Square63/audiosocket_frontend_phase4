import axios from "axios";
import { data } from "jquery";
// import absoluteUrl from "next-absolute-url";
import { async } from "regenerator-runtime";
import {BASE_URL} from "../../common/api";


import {
  ALL_PLAYLISTS_SUCCESS,
  ALL_PLAYLISTS_FAILURE,
  ADD_TO_PLAYLIST_SUCCESS,
  ADD_TO_PLAYLIST_FAILURE,
  REMOVE_FROM_PLAYLIST_SUCCESS,
  REMOVE_FROM_PLAYLIST_FAILURE,
  CLEAR_ERRORS
} from '../constants/playlistConstants';

export const getPlaylists = (req) => async( dispatch ) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/consumers_playlists`, {
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MSwiZXhwIjoxNjY5NDQ2OTQ1fQ.fRouI5TJ78D-ANMrsGLj7v-u6Y0E1tyej-rGAmulFvw"
      }
    });
    dispatch({
      type: ALL_PLAYLISTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_PLAYLISTS_FAILURE,
      payload: error
    })
    
  }

}

export const addTrackToPlaylist = (playlistId, mediaId, mediaType) => async( dispatch ) => {
  const formData = new FormData();
  formData.append('mediable_id', mediaId)
  formData.append('mediable_type', mediaType)
  try {
    const {data} = await axios.request({
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MSwiZXhwIjoxNjY5NDQ2OTQ1fQ.fRouI5TJ78D-ANMrsGLj7v-u6Y0E1tyej-rGAmulFvw"
      },
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/consumers_playlists/${playlistId}/add_media`,
      data: formData
    })
    dispatch({
      type: ADD_TO_PLAYLIST_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ADD_TO_PLAYLIST_FAILURE,
      payload: error
    })   
  }

}

export const removeTrackFromPlaylist = (consumerId, playlistTrackId) => async( dispatch ) => {
  debugger
  let id = consumerId
  let playlist_tracks_attributes= [
    {"id": playlistTrackId, "_destroy": true}
  ]

  try {
    const {data} = await axios.patch(`${BASE_URL}/api/v1/consumer/consumers_playlists/${id}`, { playlist_tracks_attributes }, {
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MSwiZXhwIjoxNjY5NDQ2OTQ1fQ.fRouI5TJ78D-ANMrsGLj7v-u6Y0E1tyej-rGAmulFvw"
      },
    });
    dispatch({
        type: REMOVE_FROM_PLAYLIST_SUCCESS,
        payload: data
    })
  } catch (error) {
      dispatch({
        type: REMOVE_FROM_PLAYLIST_FAILURE,
        payload: error
      })
  }
}

export const clearErrors = () => async(dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}