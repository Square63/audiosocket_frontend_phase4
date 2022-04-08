import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadedTracks } from "../../redux/actions/authActions";
import { getDownloadedSfxs } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import DownloadedTracks from "../../components/DownloadedTracks";

function Downloads() {
  const dispatch = useDispatch();
  const downloadedTracks = useSelector(state => state.user.downloaded_tracks);
  const downloadedSfxs = useSelector(state => state.user.downloaded_sfxs);
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

  return (
    <>
      {isLoading ? (
        <InpageLoader/>
      ) : (
      <>
        {downloadedTracks && <DownloadedTracks tracks={downloadedTracks} sfxs={downloadedSfxs} />}
      </>

      )}
    </>
    
  );
}

export default withPrivateRoute(Downloads);