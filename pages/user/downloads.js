import withPrivateRoute from "../../components/withPrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadedTracks, getDownloadedSfxs, updateWorkTitleOfDownloadedTrack } from "../../redux/actions/authActions";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import InpageLoader from '../../components/InpageLoader';
import DownloadedTracks from "../../components/DownloadedTracks";
import axios from "axios";
import { BASE_URL } from '../../common/api';
import { toast } from 'react-toastify';
import Notiflix from "notiflix";
import Sidebar from "../../components/Sidebar";
import AddToCartLicense from "../../components/modals/AddToCartLicense";
import {AuthContext} from "../../store/authContext";

function Downloads() {
  const dispatch = useDispatch();
  const router = useRouter();
  const downloadedTracks = useSelector(state => state.user.downloaded_tracks);
  const downloadedSfxs = useSelector(state => state.user.downloaded_sfxs);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const downloadsMessage = useSelector( state => state.allTracks)
  const [mediableType, setMediableType] = useState("")
  const [altVersionTrack, setAltVersionTrack] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")
  const [index, setIndex] = useState(0)
  const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
  const authContext = useContext(AuthContext);
  const cartItem = useSelector(state => state.user.cart)

  // useEffect(() => {
  //   if(!downloadsMessage?.success) {
  //     toast.error(downloadsMessage.message, TOAST_OPTIONS_ERROR);
  //   } else {
  //     toast.success(downloadsMessage.message, TOAST_OPTIONS);
  //   }
  // }, [downloadsMessage])

  useEffect(() => {
    if (cartItem && cartItem.id){
        toast.success(`${cartItem.itemable_type} added to the cart successfully!`)
    } else {
      toast.error(cartItem)
    }
  }, [cartItem]);

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

  function handleDeleteTrack(track) {
    Notiflix.Confirm.show(
      'Please confirm',
      `Are you sure you want to delete track ${track.mediable.title}?`,
      'Yes',
      'No',
      async function () {
        setIsLoading(true)
        const authToken = JSON.parse(localStorage.getItem("user") ?? "");
        axios.request({
          headers: {
            "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
            "auth-token": authToken
          },
          method: "delete",
          url: (`${BASE_URL}/api/v1/consumer/consumer_downloads/${track.id}`)
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
    );
  }

  function showAddTrackToCartLicenseModal(index, type) {
    setIndex(index)
    setMediableType(type)
    if (localStorage.getItem("user")) {
      if (type == "Track" || type == "Sfx") {
        setAltVersionTrack(null)
      }
      else {
        setAltVersionTrack(index)
      }
      if (typeof(localStorage.getItem("has_subscription")) !== undefined) {
        if (JSON.parse(localStorage.getItem("has_subscription"))) {
          if (type == "footer")
            authContext.handleAddToCart(index, "Track", "");
          else
            authContext.handleAddToCart(type == "Track" || type == "Sfx"? tracks[index].mediable.id : index.id, type, "");
        } else {
          setShowSidebar(true)
          setSidebarType("cart")
        }
      }
    }
    else {
      setShowSidebar(true)
      setSidebarType("login")
    }
  }

  const handleSidebarHide = () => {
    setShowSidebar(false)
  }

  function addTrackToCartLicenseModalSidebar(index) {
    setShowSidebar(false)
    setShowAddToCartLicenseModal(true)
  }

  function handleAddToCartLicenseModalClose() {
    setShowAddToCartLicenseModal(false)
  }

  return (
    <>
      {isLoading ? (
        <InpageLoader/>
      ) : (
        <>
          {tracks && <DownloadedTracks tracks={tracks} sfxs={downloadedSfxs} handleDeleteTrack={handleDeleteTrack} handleSubmitWorkTitle={handleSubmitWorkTitle} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} />}
          {tracks && <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={tracks[index]?.mediable} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar}/>}
          {tracks && <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={tracks[index]?.mediable} type={mediableType} />}
        </>
      )}
    </>

  );
}

export default withPrivateRoute(Downloads);
