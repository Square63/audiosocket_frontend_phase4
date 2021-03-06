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
  ALL_SFXES_SUCCESS,
  ALL_SFXES_FAILURE,
  CLEAR_ERRORS,
  ARTIST_TRACKS_SUCCESS,
  ALL_LICENSES_SUCCESS,
  ALL_LICENSES_FAILURE,
  ATTACH_TO_MEDIA_SUCCESS,
  ATTACH_TO_MEDIA_FAILURE,
  FOLLOW_ARTIST_SUCCESS,
  FOLLOW_ARTIST_FAILURE,
  UNFOLLOW_ARTIST_SUCCESS,
  UNFOLLOW_ARTIST_FAILURE,
  TRACK_DETAIL_SUCCESS,
  TRACK_DETAIL_FAILURE
} from '../constants/trackConstants';

export const getTracks = (query, query_type, filters, sort_by, sort_dir, page, explicit, exclude_vocals, youtubeContent, duration_start, duration_end) => async( dispatch ) => {
  let urlWithParams = ''
  let pageNumber = page != false ? page : false
  if (duration_start>=0 && duration_end>0)
    urlWithParams = `/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${encodeURIComponent(filters)}&order_by=${sort_by}&page=${pageNumber}&direction=${sort_dir}&per_page=10&pagination=true&duration_start=${duration_start}&duration_end=${duration_end}`
  else
    urlWithParams = `/api/v1/consumer/tracks?query=${query}&query_type=${query_type}&filters=${encodeURIComponent(filters)}&order_by=${sort_by}&page=${pageNumber}&direction=${sort_dir}&per_page=10&pagination=true`

  let url = `${BASE_URL + urlWithParams}`
  if (explicit === false && exclude_vocals === true && youtubeContent === true)
    url = `${BASE_URL + urlWithParams}&explicit=${explicit}&exclude_vocals=${exclude_vocals}&youtube_content_id_enabled=${youtubeContent}`
  else if (explicit === false && youtubeContent === true)
    url = `${BASE_URL + urlWithParams}&explicit=${explicit}&youtube_content_id_enabled=${youtubeContent}`
  else if (exclude_vocals === true && youtubeContent === true)
    url = `${BASE_URL + urlWithParams}&exclude_vocals=${exclude_vocals}&youtube_content_id_enabled=${youtubeContent}`
  else if (explicit === false && exclude_vocals === true && youtubeContent === true)
    url = `${BASE_URL + urlWithParams}&explicit=${explicit}&exclude_vocals=${exclude_vocals}`
  else if (explicit === false)
    url = `${BASE_URL + urlWithParams}&explicit=${explicit}`
  else if (exclude_vocals === true)
    url = `${BASE_URL + urlWithParams}&exclude_vocals=${exclude_vocals}`
  else if (youtubeContent === true)
    url = `${BASE_URL + urlWithParams}&youtube_content_id_enabled=${youtubeContent}`


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

export const getTracksFromAIMS = (aimsId, file) => async( dispatch ) => {
  if (aimsId) {
    try {
      const {data} = await axios.request({
        method: "get",
        url: `${BASE_URL}/api/v1/consumer/tracks/similar_tracks?aims_id=${aimsId}&page=1&per_page=100&pagination=true`,
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
    let uploadedFile = file
    const formData = new FormData();
    formData.append('file', uploadedFile)
    try {
      const {data} = await axios.request({
        method: "post",
        url: `${BASE_URL}/api/v1/consumer/tracks/upload_track_search?page=1&per_page=100&pagination=true`,
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

export const getTrackDetails = (trackId) => async (dispatch) => {
  try {
    const { data } = await axios.request({
      method: "get",
      url: `${BASE_URL}/api/v1/consumer/tracks/${trackId}`
    })
    dispatch({
      type: TRACK_DETAIL_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: TRACK_DETAIL_FAILURE,
      payload: error
    })
  }
}

export const getArtistTracks = (artistId) => async (dispatch) => {
  try {
    const { data } = await axios.request({
      method: "get",
      url: `${BASE_URL}/api/v1/consumer/tracks/artist_tracks?id=${artistId}`
    })
    dispatch({
      type: ARTIST_TRACKS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_TRACKS_FAILURE,
      payload: error
    })
  }
}

export const getSegmentTracksFromAIMS = (url, start, end) => async (dispatch) => {
  try {
    const { data } = await axios.request({
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/tracks/track_segment_search`,
      data: {
        track: url,
        time_offset: Math.round(start),
        time_limit: Math.round(end - start)
      }
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

export const addToFavorites = (trackId, type) => async (dispatch) => {
  let klass = type;
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

export const followArtist = (artistId) => async (dispatch) => {
  const formData = new FormData();
  formData.append('id', artistId)
  formData.append('klass', "artist")
  try {
    const {data} = await axios.request({
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/favorites_following/follow`,
      data: formData
    })
    dispatch({
      type: FOLLOW_ARTIST_SUCCESS,
      payload: data
    })
  } catch (error) {
      dispatch({
        type: FOLLOW_ARTIST_FAILURE,
        payload: error
      })
  }
};

export const unFollowArtist = (artistId) => async (dispatch) => {
  const formData = new FormData();
  formData.append('id', artistId)
  formData.append('klass', "artist")
  try {
    const {data} = await axios.request({
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/favorites_following/unfollow`,
      data: formData
    })
    dispatch({
      type: UNFOLLOW_ARTIST_SUCCESS,
      payload: data
    })
  } catch (error) {
      dispatch({
        type: UNFOLLOW_ARTIST_FAILURE,
        payload: error
      })
  }
};

export const removeFromFavorites = (trackId, type) => async (dispatch) => {
  let klass = type;
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

export const getSfxes = (query, query_type, filters, sort_by, sort_dir, page, explicit, exclude_vocals, duration_start, duration_end) => async( dispatch ) => {
  let urlWithParams = ''
  let pageNumber = page != false ? page : false
  if (duration_start >= 0 && duration_end > 0)
    urlWithParams = `/api/v1/consumer/sfxes?query=${query}&query_type=${query_type}&filters=${encodeURIComponent(filters)}&order_by=${sort_by== "" ? "recently_published" : sort_by}&page=${pageNumber}&direction=${sort_dir}&per_page=10&pagination=true&duration_start=${duration_start}&duration_end=${duration_end}`
  else
    urlWithParams = `/api/v1/consumer/sfxes?query=${query}&query_type=${query_type}&filters=${encodeURIComponent(filters)}&order_by=${sort_by== "" ? "recently_published" : sort_by}&page=${pageNumber}&direction=${sort_dir}&per_page=10&pagination=true`
  let url = `${BASE_URL + urlWithParams}`
  if (explicit === false && exclude_vocals === true)
    url = `${BASE_URL + urlWithParams}&explicit=${explicit}&exclude_vocals=${exclude_vocals}`
  else if (explicit === false)
    url = `${BASE_URL + urlWithParams}&explicit=${explicit}`
  else if (exclude_vocals === true)
    url = `${BASE_URL + urlWithParams}&exclude_vocals=${exclude_vocals}`

  const cookie = useCookie()
  const authToken = cookie.get("user")
  try {
    const {data} = await axios.get(url, {
      headers: {
        "auth-token": authToken ? authToken : ""
      }
    });
    dispatch({
      type: ALL_SFXES_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ALL_SFXES_FAILURE,
      payload: error
    })
  }
}

export const clearErrors = () => async(dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}

export const getLicenses = () => async (dispatch) => {
  if (localStorage.getItem("user")) {
    try {
      const { data } = await axios.request({
        method: "get",
        url: `${BASE_URL}/api/v1/consumer/licenses`,
      })
      dispatch({
        type: ALL_LICENSES_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: ALL_LICENSES_FAILURE,
        payload: error
      })
    }
  }
}

export const attachToMedia = (trackId, licenseId) => async (dispatch) => {
  let license_id = licenseId
  let mediable_type = "Track"
  let mediable_id = trackId
  try{
    const { data } = await axios.post(`${BASE_URL}/api/v1/consumer/licenses/3/attach_to_media`, { license_id, mediable_type, mediable_id })
    dispatch({
      type: ATTACH_TO_MEDIA_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ATTACH_TO_MEDIA_FAILURE,
      payload: error
    })
  }
}
