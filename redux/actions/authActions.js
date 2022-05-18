import axios from "axios";
import { BASE_URL } from "../../common/api";
import { useCookie } from "next-cookie";

import { LOGIN_SUCCESS, LOGIN_FAIL, CLEAR_ERRORS, SIGN_UP_SUCCESS, SIGN_UP_FAIL, UPDATE_PASSWORD_SUCCESS,
         UPDATE_PASSWORD_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, GET_PLAYLISTS_SUCCESS, GET_PLAYLISTS_FAIL,
         GET_USER_SUCCESS, GET_USER_FAIL, GET_ARTISTS_SUCCESS, GET_ARTISTS_FAIL, PLAYLIST_TRACKS_SUCCESS, PLAYLIST_TRACKS_FAIL,
         FAVORITE_TRACKS_SUCCESS, FAVORITE_TRACKS_FAIL, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL, GET_CART_SUCCESS, GET_CART_FAIL,
         DOWNLOADED_TRACKS_SUCCESS, DOWNLOADED_TRACKS_FAIL, DOWNLOADED_SFXS_SUCCESS, DOWNLOADED_SFXS_FAIL, MY_PLAYLISTS_SUCCESS,
         MY_PLAYLISTS_FAIL, GET_FORGOT_PASSWORD_SUCCESS, GET_FORGOT_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
         CURATED_PLAYLISTS_SUCCESS, CURATED_PLAYLISTS_FAIL, EDIT_WORK_TITLE_SUCCESS, EDIT_WORK_TITLE_FAIL, GET_PLANS_SUCCESS, GET_PLANS_FAIL,
         MY_PLAYLIST_DETAIL_SUCCESS, MY_PLAYLIST_DETAIL_FAIL, FACEBOOK_LOGIN_SUCCESS, GMAIL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAIL, SOCIAL_AUTH_SUCCESS, SOCIAL_AUTH_FAIL,
         MY_PLAYLIST_TRACKS_SUCCESS, MY_PLAYLIST_TRACKS_FAIL, MY_PLAYLIST_ARTISTS_SUCCESS, MY_PLAYLIST_ARTISTS_FAIL, REMOVE_FROM_PLAYLIST_SUCCESS, REMOVE_FROM_PLAYLIST_FAIL } from "../constants/authConstants";

export const authLogin = (data) => async (dispatch) => {
  let email = data.email;
  let password = data.password;
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/consumer/session`, {
      email,
      password,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error,
    });
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
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/consumer/session/signup`,
      {
        email,
        first_name,
        last_name,
        password,
        password_confirmation,
        content_type,
      }
    );
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIGN_UP_FAIL,
      payload: error,
    });
  }
};

export const facebookLogin = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/consumer/oauth/facebook_login`);
    dispatch({
      type: FACEBOOK_LOGIN_SUCCESS,
      payload: data
    })
  } catch (error) {
      dispatch({
        type: SOCIAL_LOGIN_FAIL,
        payload: error
      })
  }
};

export const gmailLogin = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/consumer/oauth/google_login`);
    dispatch({
      type: GMAIL_LOGIN_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SOCIAL_LOGIN_FAIL,
      payload: error
    })
  }
};

export const facebookCallback = (code) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/consumer/oauth/facebook_callback`, { code });
    dispatch({
      type: SOCIAL_AUTH_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SOCIAL_AUTH_FAIL,
      payload: error
    })
  }
};

export const gmailCallback = (code) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/v1/consumer/oauth/google_callback`, { code });
    dispatch({
      type: SOCIAL_AUTH_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SOCIAL_AUTH_FAIL,
      payload: error
    })
  }
};

export const updatePassword = (data) => async (dispatch) => {
  const cookie = useCookie();
  const authToken = cookie.get("user");
  let current_password = data.current_password;
  let password = data.new_password;
  let password_confirmation = data.confirm_password;
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/v1/consumer/consumers/update_password`,
      { current_password, password, password_confirmation },
      {
        headers: {
          "auth-token": authToken ? authToken : "",
        },
      }
    );
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error,
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  const cookie = useCookie();
  const authToken = cookie.get("user");
  let first_name = data.first_name;
  let last_name = data.last_name;
  let email = data.email;
  let consumer_profile_attributes = {
    phone: data.phone,
    organization: data.organization,
    city: data.city,
    address: data.address,
    country: data.country,
    postal_code: data.postal_code,
    youtube_url: data.youtube_url,
  };
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/v1/consumer/consumers/update_profile`,
      { first_name, last_name, email, consumer_profile_attributes },
      {
        headers: {
          "auth-token": authToken ? authToken : "",
        },
      }
    );
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error
    });
  }
};

export const getUserInfo = (authToken) => async (dispatch) => {
  const cookie = useCookie();
  const authToken = cookie.get("user");
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/consumer/consumers/show_profile`,
      {
        // headers: {
        //   "auth-token": authToken ? authToken : ""
        // }
      }
    );
    dispatch({
      type: GET_USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAIL,
      payload: error
    });
  }
};

export const getFollowedPlaylists = () => async (dispatch) => {
  const cookie = useCookie();
  const authToken = cookie.get("user");
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/consumer/favorites_following/favorited_followed_playlists`,
      { params: { type: "favorite" } }
    );
    dispatch({
      type: GET_PLAYLISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PLAYLISTS_FAIL,
      payload: error,
    });
  }
};

export const getFollowedArtists = () => async (dispatch) => {
  const cookie = useCookie();
  const authToken = cookie.get("user");
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/consumer/favorites_following/followed_artists`
    );
    dispatch({
      type: GET_ARTISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ARTISTS_FAIL,
      payload: error
    })

  }
};

export const getPlaylistDetail = (data) => async (dispatch) => {
  let id = data;
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/consumer/consumers_playlists/${id}`
    );
    dispatch({
      type: PLAYLIST_TRACKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAYLIST_TRACKS_FAIL,
      payload: error
    })

  }
};

export const getFavoriteTracks = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/consumer/favorites_following/favorite_tracks`
    );
    dispatch({
      type: FAVORITE_TRACKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAVORITE_TRACKS_FAIL,
      payload: error
    })

  }
};

export const addToCart = (itemableId, itemableType, mediableLicenseId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("itemable_id", itemableId);
  formData.append("itemable_type", itemableType);
  formData.append("work_title", "itemableType");
  formData.append("mediable_license_id", mediableLicenseId);
  try {
    const { data } = await axios.request({
      method: "post",
      url: `${BASE_URL}/api/v1/consumer/line_items`,
      data: formData,
    });
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error,
    });
  }
};

export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/consumer/line_items/`);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error,
    });
  }
};

export const removeCartItem = (itemableId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/v1/consumer/line_items/${itemableId}`
    );
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error,
    });
  }
};

export const checkout = (totalPrice) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/v1/consumer/line_items/${itemableId}`
    );
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAIL,
      payload: error,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getDownloadedTracks = () => async( dispatch ) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/tracks/get_downloaded_tracks`);
    dispatch({
      type: DOWNLOADED_TRACKS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: DOWNLOADED_TRACKS_FAIL,
      payload: error
    })

  }

}

export const getDownloadedSfxs = () => async( dispatch ) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/sfxes/get_downloaded_sfxes`);
    dispatch({
      type: DOWNLOADED_SFXS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: DOWNLOADED_SFXS_FAIL,
      payload: error
    })

  }

}

export const getMyPlaylists = (page) => async( dispatch ) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/consumers_playlists?page=${page}&per_page=15`);
    dispatch({
      type: MY_PLAYLISTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: MY_PLAYLISTS_FAIL,
      payload: error
    })

  }

}
export const editWorkTitle = (itemableId, workTitle) => async (dispatch) => {
  let work_title = workTitle
  try {
    const { data } = await axios.patch(`${BASE_URL}/api/v1/consumer/line_items/${itemableId}`, { work_title });
    dispatch({
      type: EDIT_WORK_TITLE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: EDIT_WORK_TITLE_FAIL,
      payload: error
    })

  }

}

export const getSubscriptionPlans = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/consumer/plans`);
    dispatch({
      type: GET_PLANS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_PLANS_FAIL,
      payload: error
    })

  }

}

export const getCuratedPlaylists = (query, page) => async( dispatch ) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/api/v1/consumer/curated_playlists?query=${query}&page=${page}`);
    dispatch({
      type: CURATED_PLAYLISTS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CURATED_PLAYLISTS_FAIL,
      payload: error
    })

  }

}

export const forgotPassword = (data) => async (dispatch) => {
  let email = data.email;
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/v1/consumer/consumers/forgot_password`,
      {email}
    );
    dispatch({
      type: GET_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FORGOT_PASSWORD_FAIL,
      payload: error,
    });
  }
};

export const resetPassword = (data) => async (dispatch) => {
  let password = data.password;
  let password_confirmation = data.password_confirmation;
  let reset_password_token = data.reset_password_token;
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/v1/consumer/consumers/reset_password`,
      { password, password_confirmation, reset_password_token }
    );
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error,
    });
  }
};

export const getMyPlaylistDetail = (data) => async (dispatch) => {
  let id = data;
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/consumer/consumers_playlists/${id}`
    );
    dispatch({
      type: MY_PLAYLIST_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_PLAYLIST_DETAIL_FAIL,
      payload: error,
    });
  }
};

export const getMyPlaylistTracks = (data) => async (dispatch) => {
  const formData = new FormData();
  formData.append('klass', "consumer_playlist")
  let id = data;
  try {
    const { data } = await axios.request({
      method: "get",
      url: `${BASE_URL}/api/v1/consumer/consumers_playlists/${id}/playlist_tracks?klass=consumer_playlist`,
      data: formData
    });
    dispatch({
      type: MY_PLAYLIST_TRACKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_PLAYLIST_TRACKS_FAIL,
      payload: error,
    });
  }
};

export const getMyPlaylistArtists = (data) => async (dispatch) => {
  let id = data;
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/v1/consumer/consumers_playlists/${id}/playlist_artists`
    );
    dispatch({
      type: MY_PLAYLIST_ARTISTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_PLAYLIST_ARTISTS_FAIL,
      payload: error,
    });
  }
};

export const removeFromPlaylist = (pId, tId) => async (dispatch) => {
  let playlistId = pId;
  let trackId = tId;
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/v1/consumer/consumers_playlists/${playlistId}/playlist_tracks/${trackId}?klass=consumer_playlist`
    );
    dispatch({
      type: REMOVE_FROM_PLAYLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_PLAYLIST_FAIL,
      payload: error,
    });
  }
};
