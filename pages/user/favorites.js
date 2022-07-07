import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteTracks, getFavoriteSfxes } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import FavoriteTracks from "../../components/FavoriteTracks";
import { removeFromFavorites } from '../../redux/actions/trackActions';
import { TOAST_OPTIONS } from '../../common/api';
import { TOAST_OPTIONS_ERROR } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import DownloadTrack from "../../components/modals/DownloadTrack";
import AddToPlaylist from "../../components/modals/AddToPlaylist";
import DownloadTrackLicense from "../../components/modals/DownloadTrackLicense";
import Notiflix from "notiflix";

function Favorites() {
  const [type, setType] = useState('songs');
  const dispatch = useDispatch();
  const router = useRouter();
  const favoriteTracks = useSelector(state => state.user.favorite_tracks);
  const favoriteSfxes = useSelector(state => state.user.favorite_sfxes);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const favoritesMessage = useSelector( state => state.allTracks)
  const [showDownModal, setShowDownModal] = useState(false)
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const [altVersionTrack, setAltVersionTrack] = useState(null);
  const [index, setIndex] = useState(0)
  const [updatedTracks, setUpdatedTracks] = useState([])

  function showDownloadModal(index) {
    if (localStorage.getItem("user")) {
      if (index > 9) {
        setIndex(index + 10)
      }
      else {
        setIndex(index)
      }
      setShowDownModal(true)
    }
    else {
      Notiflix.Report.failure('Alert', 'You must be logged in to be able to add a track to cart.', 'Ok');
    }
  }

  const handleDownloadClose = (show) => {
    setShowDownModal(show)
  }

  function showDownloadLicenseModal() {
    setShowLicenseModal(true)
  }

  function handleLicenseModalClose() {
    setShowLicenseModal(false)
  }

  useEffect(() => {
    if (favoriteTracks?.tracks?.length > 0) {
      setUpdatedTracks(updatedTracks => [...updatedTracks, ...favoriteTracks.tracks]);
    } else if (favoriteSfxes?.sfxes?.length > 0)
      setUpdatedTracks(updatedTracks => [...updatedTracks, ...favoriteSfxes.sfxes]);
  }, [favoriteTracks, favoritesMessage, favoriteSfxes]);

  useEffect(() => {
    if(!favoritesMessage?.success) {
      toast.error(favoritesMessage.message, TOAST_OPTIONS_ERROR);
    } else {
      toast.success(favoritesMessage.message, TOAST_OPTIONS);
    }
  }, [favoritesMessage])

  useEffect(() => {
    dispatch(getFavoriteTracks())
    dispatch(getFavoriteSfxes())
  }, [favoritesMessage]);

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
  }, [responseStatus])

  useEffect(() => {
    if (favoriteTracks) {
      setIsLoading(false)
    }
  }, [favoriteTracks])

  const handleRemoveFromFavorites = (e, track, type) => {
    Notiflix.Confirm.show(
      'Please confirm',
      `Are you sure you want to remove ${track.title} from favorites?`,
      'Yes',
      'No',
      function () {
        setIsLoading(true)
        dispatch(removeFromFavorites(track.id, type));
      }
    );
  }

  const handleSimilarSearch = (trackName, trackId) => {
    setIsLoading(true)
    localStorage.setItem("track_name", trackName)
    localStorage.setItem("track_id", trackId)
    router.push({
      pathname: '/search'
    },
    undefined, { shallow: true }
    )
    // router.push('/search')
  }

  const handleSelectType = (type) => {
    setType(type);
  }

  function showTrackAddToPlaylistModal(index, type) {
    if (type == "track") {
      setAltVersionTrack(null)
      setIndex(index)
    }
    else {
      setAltVersionTrack(index)
    }
    setShowAddToPlaylistModal(true)

  }

  function handleAddToPlaylistModalClose() {
    setShowAddToPlaylistModal(false)
  }

  return (
    <>
      {isLoading ? (
        <InpageLoader/>
      ) : (
      <>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: "auto" }}
        />
        {favoriteTracks && <FavoriteTracks type="Favorite" sfxes={favoriteSfxes?.sfxes} tracks={favoriteTracks.tracks} tracksMeta={favoriteTracks.meta} handleRemoveFromFavorites={handleRemoveFromFavorites} handleSimilarSearch={handleSimilarSearch} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} showTrackAddToPlaylistModal={showTrackAddToPlaylistModal} />}
        <AddToPlaylist showModal={showAddToPlaylistModal} onCloseModal={handleAddToPlaylistModalClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]} />
        <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={updatedTracks[index]} type="track"/>
        <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
      </>

      )}
    </>
  );
}

export default withPrivateRoute(Favorites);
