import axios from "axios";
import {BASE_URL} from "../../common/api";
import { useCookie } from 'next-cookie'

import { LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, SIGN_UP_SUCCESS, SIGN_UP_FAIL, UPDATE_PASSWORD_SUCCESS, 
         UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, GET_PLAYLISTS_SUCCESS, GET_PLAYLISTS_FAIL,
         GET_USER_SUCCESS, GET_USER_FAIL, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAIL, PLAYLIST_TRACKS_SUCCESS, PLAYLIST_TRACKS_FAIL } from "../constants/authConstants";

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

export const updatePassword = (data) => async (dispatch) => {
  const cookie = useCookie()
  const authToken = cookie.get("user")
  let current_password = data.current_password;
  let password = data.new_password;
  let password_confirmation = data.confirm_password;
  try {
    const {data} = await axios.patch(`${BASE_URL}/api/v1/consumer/consumers/update_password`, { current_password, password, password_confirmation }, {
      headers: {
        "auth-token": authToken ? authToken : ""
      },
    });
    dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data
    })
  } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error
      })
  }
};

export const updateProfile = (data) => async (dispatch) => {
  const cookie = useCookie()
  const authToken = cookie.get("user")
  let first_name = data.first_name;
  let last_name = data.last_name;
  let consumer_profile_attributes = {
    phone: data.phone,
    organization: data.organization,
    city: data.city,
    address: data.address,
    country: data.country,
    postal_code: data.postal_code,
    youtube_url: data.youtube_url
  }
  try {
    const {data} = await axios.patch(`${BASE_URL}/api/v1/consumer/consumers/update_profile`, { first_name, last_name, consumer_profile_attributes }, {
      headers: {
        "auth-token": authToken ? authToken : ""
      },
    });
    dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: data
    })
  } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error
      })
  }
};

export const getUserInfo = (authToken) => async( dispatch ) => {
  const cookie = useCookie()
  const authToken = cookie.get("user")
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/consumers/show_profile`, {
      // headers: {
      //   "auth-token": authToken ? authToken : ""
      // }
    });
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

}

export const getFollowedPlaylists = () => async( dispatch ) => {
  const cookie = useCookie()
  const authToken = cookie.get("user")
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/favorites_following/favorited_followed_playlists`, { params: { type: "favorite" } });
    dispatch({
      type: GET_PLAYLISTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_PLAYLISTS_FAIL,
      payload: error
    })
    
  }

}

export const getFollowedArtists = () => async( dispatch ) => {
  const cookie = useCookie()
  const authToken = cookie.get("user")
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/favorites_following/followed_artists`);
    dispatch({
      type: GET_ARTISTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_ARTISTS_FAIL,
      payload: error
    })
    
  }

}

export const getPlaylistDetail = (data) => async( dispatch ) => {
  let id = data
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/consumers_playlists/${id}`);
    dispatch({
      type: PLAYLIST_TRACKS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PLAYLIST_TRACKS_FAIL,
      payload: error
    })
    
  }

}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}