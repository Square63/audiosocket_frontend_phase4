import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadedTracks, getDownloadedSfxs, updateWorkTitleOfDownloadedTrack } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InpageLoader from '../../components/InpageLoader';
import DownloadedTracks from "../../components/DownloadedTracks";
import axios from "axios";
import { BASE_URL } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';

function Downloads() {
  const dispatch = useDispatch();
  const router = useRouter();
  const downloadedTracks = useSelector(state => state.user.downloaded_tracks);
  const downloadedSfxs = useSelector(state => state.user.downloaded_sfxs);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const downloadsMessage = useSelector( state => state.allTracks)

  // useEffect(() => {
  //   if(!downloadsMessage?.success) {
  //     toast.error(downloadsMessage.message, TOAST_OPTIONS_ERROR);
  //   } else {
  //     toast.success(downloadsMessage.message, TOAST_OPTIONS);
  //   }
  // }, [downloadsMessage])

  useEffect(() => {
    dispatch(getDownloadedTracks())
    dispatch(getDownloadedSfxs())
  }, [downloadsMessage]);

  useEffect(() => {
    if (downloadedTracks) {
      setIsLoading(false)
      setTracks(downloadedTracks)
    }
  }, [downloadedTracks, downloadedSfxs])

  useEffect(() => {
    if (responseStatus == 422) {
      window.localStorage.clear();
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    }
  }, [responseStatus]);

  function handleSubmitWorkTitle(e, trackId) {
    dispatch(updateWorkTitleOfDownloadedTrack(trackId, e.target.value))
  }

  function handleDeleteTrack(trackId) {
    setIsLoading(true)
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");
    axios.request({
      headers: {
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        "auth-token": authToken
      },
      method: "delete",
      url: (`${BASE_URL}/api/v1/consumer/consumer_downloads/${trackId}`)
    }).then(response => {
      setIsLoading(false)
      if (!response.status === 200) {
        toast.error("Error while deleting downloaded track.");
      } else {
        setIsLoading(false);
        setTracks(response.data)
        toast.success("Track has been deleted.");
      }
    }).catch(error => {
      setIsLoading(false)
      toast.error("Error while deleting downloaded track.");
    });
  }

  return (
    <>
      {isLoading ? (
        <InpageLoader/>
      ) : (
        <>
          {tracks && <DownloadedTracks tracks={tracks} sfxs={downloadedSfxs} handleDeleteTrack={handleDeleteTrack} handleSubmitWorkTitle={handleSubmitWorkTitle} />}
        </>
      )}
    </>

  );
}

export default withPrivateRoute(Downloads);
