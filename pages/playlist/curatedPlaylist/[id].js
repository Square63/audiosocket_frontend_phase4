import { useRouter } from "next/router";
import { getCuratedPlaylistDetail, getCuratedPlaylistTracks, removeFromPlaylist } from "../../../redux/actions/authActions";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import MyPlaylistTracks from "../../../components/MyPlaylistTracks";
import InpageLoader from '../../../components/InpageLoader';
import Image from 'next/image';
import Router from "next/router";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import playlist from "../../../styles/Playlist.module.scss";
import { duration } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_OPTIONS } from '../../../common/api';
import DownloadTrack from '../../../components/modals/DownloadTrack'
import DownloadTrackLicense from '../../../components/modals/DownloadTrackLicense'
import Sidebar from '../../../components/Sidebar'
import AddToCartLicense from "../../../components/modals/AddToCartLicense";
import { addToFavorites, removeFromFavorites } from '../../../redux/actions/trackActions';
import Notiflix from "notiflix";
import axios from "axios";
import { BASE_URL } from '../../../common/api';
import ShareModal from "../../../components/modals/ShareModal";
import {AuthContext} from "../../../store/authContext";

const Details = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const curatedPlaylistDetail = useSelector(state => state.user.curated_playlist_detail);
  const curatedPlaylistTracks = useSelector(state => state.user.curated_playlist_tracks);
  const curatedPlaylistTracksMeta = useSelector(state => state.user.curatedPlaylistTrackMeta);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([])
  const [updatedArtists, setUpdatedArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownModal, setShowDownModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false)
  const [index, setIndex] = useState(0)
  const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")
  const favoritesMessage = useSelector( state => state.allTracks)
  const [followed, setFollowed] = useState(false)
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);
  const [altVersionTrack, setAltVersionTrack] = useState(null);
  const cartItem = useSelector(state => state.user.cart)
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (cartItem && cartItem.id){
      toast.success("Track added to the cart successfully!")
    } else {
      toast.error(cartItem)
    }
  }, [cartItem]);

  useEffect(() => {
    if (query) {
      dispatch(getCuratedPlaylistDetail(query.id))
      dispatch(getCuratedPlaylistTracks(query.id))
    }
  }, [showEditModal]);

  useEffect(() => {
    if (curatedPlaylistDetail) {
      setIsLoading(false)
    }
  }, [curatedPlaylistDetail])

  useEffect(() => {
    if (curatedPlaylistTracks) {
      curatedPlaylistTracks.meta && setFavoriteTrackIds(curatedPlaylistTracks.meta.favorite_tracks_ids)
      setIsLoading(false)
    }
  }, [curatedPlaylistTracks])

  useEffect(() => {
    if(!favoritesMessage?.success) {
      toast.error(favoritesMessage.message, TOAST_OPTIONS);
    } else {
      toast.success(favoritesMessage.message, TOAST_OPTIONS);
    }
    setIsLoading(false)
  }, [favoritesMessage])


  const handleLoading = () => {
    setLoading(true)
  }

  const handleSimilarSearch = (trackName, trackId) => {
    localStorage.setItem("track_name", trackName)
    localStorage.setItem("track_id", trackId)
    Router.push({
      pathname: '/search'
    },
    undefined, { shallow: true }
    )
  }

  function totalDuration(tracks) {
    let duration = 0
    if (tracks.playlist_tracks) {
      tracks.playlist_tracks.map((track, index) =>
      duration += track.mediable.duration)
    } else {
      tracks.map((track, index) =>
      duration += track.mediable.duration)
    }

    return convertSecToMin(duration)
  }

  function convertSecToMin(duration) {

    if (duration != null) {
      let minutes = Math.floor(duration / 60).toString();
      minutes = minutes.length == 1 ? ("0" + minutes) : minutes
      let seconds = parseInt((duration - minutes * 60)).toString();
      seconds = seconds.length == 1 ? ("0" + seconds) : seconds
      return minutes+':'+seconds
    }

  }

  const handleAddToFavorites = (e, trackId) => {
    setIsLoading(true)
    if (localStorage.getItem("user")) {
      if (!favoriteTrackIds.includes(trackId)) {
        setFavoriteTrackIds([...favoriteTrackIds, trackId])
        e.target.closest("a").classList.add("controlActive")
        dispatch(addToFavorites(trackId));
      }
      else {
        favoriteTrackIds.splice(favoriteTrackIds.indexOf(trackId), 1)
        e.target.closest("a").classList.remove("controlActive")
        setFavoriteTrackIds(favoriteTrackIds)
        dispatch(removeFromFavorites(trackId));
      }
    }
    else {
      setShowSidebar(true)
      setSidebarType("login")
    }
  }

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

  function handleShareModalClose() {
    setShowShareModal(false)
  }

  function showAddTrackToCartLicenseModal(index, type) {
    setIndex(index%10)
    if (localStorage.getItem("user")) {
      if (type == "track") {
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
            authContext.handleAddToCart(type == "track" ? curatedPlaylistTracks.playlist_tracks[index%10].mediable.id : index.id, "Track", "");
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

  function handleAddToCartLicenseModalClose() {
    setShowAddToCartLicenseModal(false)
  }

  const handleSidebarHide = () => {
    setShowSidebar(false)
  }

  const handleDownloadZip = async (id) => {
    setShowDownloadMessage(true)
    await axios.request({
      headers: {
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
      },
      method: "get",
      url: (`${BASE_URL}/api/v1/consumer/curated_playlists/${id}/playlist_tracks/download_zip?file_type=mp3_file`)

    }).then(response => {
      if (response.status == 200) {
        const link = document.createElement("a");
        link.href = response.data.zip_file;
        link.download = curatedPlaylistDetail.name;
        link.click();
        setShowDownloadMessage(false)
      } else {
        toast.error("Error while downloading curated playlist.");
      }
    })
  }

  const removeTrackFromPlaylist = (trackId) => {
    setIsLoading(true)
    dispatch(removeFromPlaylist(query.id, trackId))
  }

  function addTrackToCartLicenseModalSidebar(index) {
    setShowSidebar(false)
    setShowAddToCartLicenseModal(true)
  }

  const handleFollowUnfollow = async (id, action) => {
    const userAuthToken = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";
    await axios.request({
      headers: {
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        "auth-token": userAuthToken
      },
      method: "post",
      url: (`${BASE_URL}/api/v1/consumer/favorites_following/${action}?id=${query.id}&klass=curated_playlist`)

    }).then(response => {
      if (!response.status === 200) {
        toast.error("Error while following playlist")
      } else {
        toast.success(response.data.status)
        setFollowed(action == "unfollow" ? false : true)
      }
    }).catch(error => {
      toast.error(error.response.data.message);
    });

  }

  return (
    <>
    {isLoading ? (
      <InpageLoader />
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
        <div className={playlist.myPlaylistShow}>
          <div className={playlist.playlistBanner} style={curatedPlaylistDetail && {backgroundImage: "url(" + curatedPlaylistDetail.compressed_banner_image + ")"}}>
            <div className="themeBreadcrumb">
              <div className="fixed-container">
                <Breadcrumb>
                  <Breadcrumb.Item href="/playlist/curatedPlaylist">Curated Playlists</Breadcrumb.Item>
                  <Breadcrumb.Item active>{curatedPlaylistDetail && curatedPlaylistDetail.name}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <div className={playlist.playlistInfo}>
              <div className={playlist.playlistCard}>
                <div className={playlist.imgSec}>
                {curatedPlaylistDetail && curatedPlaylistDetail.compressed_playlist_image && <Image src={curatedPlaylistDetail.compressed_playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                </div>
                <div className={playlist.contentSec}>
                  <div className={playlist.aboutPlaylist}>
                    <div className={playlist.playlistOwner}>
                      <div className={playlist.PlaylistName}>{curatedPlaylistDetail && curatedPlaylistDetail.name}</div>
                      <div className={playlist.createdBy}>
                        Created by: <span>Audiosocket</span>
                      </div>
                    </div>
                    <div className={playlist.playlistStats}>
                      <div className={playlist.tracksCount}>
                      {curatedPlaylistDetail && curatedPlaylistDetail.media_count} Tracks
                      </div>
                      <div className={playlist.tracksDuration}>
                        Duration: <span>{curatedPlaylistTracks && totalDuration(curatedPlaylistTracks)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={playlist.cardBtnWrapper}>
                    <Button variant="link" className="btn btnMainLarge" onClick={() => setShowShareModal(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.927" height="17.134" viewBox="0 0 16.927 17.134">
                        <g id="share-2" transform="translate(0.5 0.707)">
                          <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      Share
                    </Button>
                        <Button variant="link" className="btn btnMainLarge" onClick={() => handleDownloadZip(query.id)} disabled={curatedPlaylistDetail?.media_count <= 0 || showDownloadMessage}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.987" height="14.189" viewBox="0 0 14.987 14.189">
                        <g id="icon-download" transform="translate(0.5 13.689) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M7.455,2.737V.608A.592.592,0,0,0,6.881,0H.573A.592.592,0,0,0,0,.608V13.379a.592.592,0,0,0,.573.608H6.881a.592.592,0,0,0,.573-.608V11.251" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H10.9" transform="translate(2.294 6.994)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M2.867,0,0,3.041,2.867,6.081" transform="translate(2.294 3.953)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      Download
                    </Button>
                    {localStorage.getItem("user") && <Button variant="link" className="btn btnMainLarge" onClick={() => handleFollowUnfollow(query.id, followed ? "unfollow" : "follow")}>
                      {followed ? <svg xmlns="http://www.w3.org/2000/svg" width="17.39" height="17.39" viewBox="0 0 17.39 17.39">
                        <g id="Group_165" data-name="Group 165" transform="translate(0.5 0.5)">
                          <g id="playlist-add">
                            <path id="Shape_1147" data-name="Shape 1147" d="M207.831,1930.952v-7.126a.712.712,0,0,0-.713-.713h-11.4a.712.712,0,0,0-.713.713v11.4a.712.712,0,0,0,.713.712h7.126" transform="translate(-195.004 -1923.114)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Oval_187" data-name="Oval 187" d="M206.073,1935.251a1.069,1.069,0,1,0-1.069-1.069A1.069,1.069,0,0,0,206.073,1935.251Z" transform="translate(-197.878 -1925.988)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Oval_188" data-name="Oval 188" d="M199.073,1936.252a1.069,1.069,0,1,0-1.069-1.069A1.069,1.069,0,0,0,199.073,1936.252Z" transform="translate(-195.866 -1926.275)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_1148" data-name="Shape 1148" d="M201,1933.268v-4.094a.713.713,0,0,1,.517-.685l3.563-1.018a.713.713,0,0,1,.909.686v4.4" transform="translate(-196.728 -1924.358)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Oval_189" data-name="Oval 189" d="M211.567,1943.24a3.563,3.563,0,1,0-3.563-3.563A3.563,3.563,0,0,0,211.567,1943.24Z" transform="translate(-198.74 -1926.85)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_1150" data-name="Shape 1150" d="M211,1941.114h2.85" transform="translate(-199.603 -1928.287)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          </g>
                        </g>
                      </svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.39" height="17.39" viewBox="0 0 17.39 17.39">
                        <g id="Group_165" data-name="Group 165" transform="translate(0.5 0.5)">
                          <g id="playlist-add">
                            <path id="Shape_1147" data-name="Shape 1147" d="M207.831,1930.952v-7.126a.712.712,0,0,0-.713-.713h-11.4a.712.712,0,0,0-.713.713v11.4a.712.712,0,0,0,.713.712h7.126" transform="translate(-195.004 -1923.114)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Oval_187" data-name="Oval 187" d="M206.073,1935.251a1.069,1.069,0,1,0-1.069-1.069A1.069,1.069,0,0,0,206.073,1935.251Z" transform="translate(-197.878 -1925.988)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Oval_188" data-name="Oval 188" d="M199.073,1936.252a1.069,1.069,0,1,0-1.069-1.069A1.069,1.069,0,0,0,199.073,1936.252Z" transform="translate(-195.866 -1926.275)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_1148" data-name="Shape 1148" d="M201,1933.268v-4.094a.713.713,0,0,1,.517-.685l3.563-1.018a.713.713,0,0,1,.909.686v4.4" transform="translate(-196.728 -1924.358)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Oval_189" data-name="Oval 189" d="M211.567,1943.24a3.563,3.563,0,1,0-3.563-3.563A3.563,3.563,0,0,0,211.567,1943.24Z" transform="translate(-198.74 -1926.85)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_1149" data-name="Shape 1149" d="M213,1939.114v2.85" transform="translate(-200.177 -1927.712)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_1150" data-name="Shape 1150" d="M211,1941.114h2.85" transform="translate(-199.603 -1928.287)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          </g>
                        </g>
                      </svg>
                      }
                      {followed ? "Unfollow Playlist" : "Follow Playlist"}
                    </Button>}
                  </div>
                  {showDownloadMessage &&
                    <div className={playlist.downloadMessage}>Please wait while your download is in progress...</div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="fixed-container">
            {curatedPlaylistTracks ? <MyPlaylistTracks tracks={curatedPlaylistTracks.playlist_tracks ? curatedPlaylistTracks.playlist_tracks : curatedPlaylistTracks} myPlaylistTracksCount={curatedPlaylistDetail?.media_count} favoriteTrackIds={favoriteTrackIds} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} removeTrackFromPlaylist={removeTrackFromPlaylist} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} showDeleteButton={false} type="curated"/> : <InpageLoader />}
          </div>

          {curatedPlaylistDetail && curatedPlaylistTracks && curatedPlaylistDetail?.media_count > 0 && <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={curatedPlaylistTracks.playlist_tracks[index]} type="track"/> }
          <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
          {curatedPlaylistTracks && <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={curatedPlaylistTracks.playlist_tracks[index].mediable} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar}/>}
          {curatedPlaylistTracks && <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={curatedPlaylistTracks.playlist_tracks[index].mediable} type="Track" />}
          <ShareModal showModal={showShareModal} onCloseModal={handleShareModalClose} />
        </div>


      </>
    )}
  </>
  );
}

export default Details;
