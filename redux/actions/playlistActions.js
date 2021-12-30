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
  CLEAR_ERRORS
} from '../constants/playlistConstants';

export const getPlaylists = (req) => async( dispatch ) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/consumers_playlists`, {
      headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MzIsImV4cCI6MTY3MjEzNjUwM30.cc7TolYBSMVCPjRdjLApO5RyRoVzSmKHFdpTLiTqgog"
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

export const addTrackToPlaylist = (playlistId, trackId) => async( dispatch ) => {
  const formData = new FormData();
  formData.append('track_id', trackId)
  try {
    const {data} = await axios.request({
      headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJjb25zdW1lcl9pZCI6MzIsImV4cCI6MTY3MjEzNjUwM30.cc7TolYBSMVCPjRdjLApO5RyRoVzSmKHFdpTLiTqgog"
      },
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/consumers_playlists/${playlistId}/add_track`,
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

export const clearErrors = () => async(dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}