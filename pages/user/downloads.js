import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadedTracks, getDownloadedSfxs, deleteDownloadedTrack, updateWorkTitleOfDownloadedTrack } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InpageLoader from '../../components/InpageLoader';
import DownloadedTracks from "../../components/DownloadedTracks";

function Downloads() {
  const dispatch = useDispatch();
  const router = useRouter();
  const downloadedTracks = useSelector(state => state.user.downloaded_tracks);
  const downloadedSfxs = useSelector(state => state.user.downloaded_sfxs);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [isLoading, setIsLoading] = useState(true);
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
    dispatch(deleteDownloadedTrack(trackId));
  }

  return (
    <>
      {isLoading ? (
        <InpageLoader/>
      ) : (
        <>
          {downloadedTracks && <DownloadedTracks tracks={downloadedTracks} sfxs={downloadedSfxs} handleDeleteTrack={handleDeleteTrack} handleSubmitWorkTitle={handleSubmitWorkTitle} />}
        </>
      )}
    </>

  );
}

export default withPrivateRoute(Downloads);
