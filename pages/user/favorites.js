import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteTracks } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import FavoriteTracks from "../../components/FavoriteTracks";
import { removeFromFavorites } from '../../redux/actions/trackActions';
import { TOAST_OPTIONS } from '../../common/api';
import { TOAST_OPTIONS_ERROR } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Router from "next/router";


function Favorites() {
  const [type, setType] = useState('songs');
  const dispatch = useDispatch();
  const router = useRouter();
  const favoriteTracks = useSelector(state => state.user.favorite_tracks);
  const [isLoading, setIsLoading] = useState(true);
  const favoritesMessage = useSelector( state => state.allTracks)

  useEffect(() => {
    if(!favoritesMessage?.success) {
      toast.error(favoritesMessage.message, TOAST_OPTIONS_ERROR);
    } else {
      toast.success(favoritesMessage.message, TOAST_OPTIONS);
    }
  }, [favoritesMessage])

  useEffect(() => {
    dispatch(getFavoriteTracks())
  }, [favoritesMessage]);

  useEffect(() => {
    if (favoriteTracks) {
      setIsLoading(false)
    }
  }, [favoriteTracks])

  const handleAddToFavorites = (e, trackId) => {
    dispatch(removeFromFavorites(trackId));
  }

  const handleSimilarSearch = (trackName, trackId) => {
    setIsLoading(true)
    localStorage.setItem("track_name", trackName)
    localStorage.setItem("track_id", trackId)
    Router.push({
      pathname: '/search'
    }, 
    undefined, { shallow: true }
    )
    // router.push('/search')
  }

  const handleSelectType = (type) => {
    setType(type);
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
        {favoriteTracks && <FavoriteTracks type="Favorite" tracks={favoriteTracks.tracks} handleAddToFavorites={handleAddToFavorites} handleSimilarSearch={handleSimilarSearch}/>}
      </>

      )}
    </>
  );
}

export default withPrivateRoute(Favorites);