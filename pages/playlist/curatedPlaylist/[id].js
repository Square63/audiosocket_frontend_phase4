import { useRouter } from "next/router";
import { getCuratedPlaylistDetail, getCuratedPlaylistTracks, removeFromPlaylist } from "../../../redux/actions/authActions";
import { useState, useEffect } from "react";
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

const Details = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const curatedPlaylistDetail = useSelector(state => state.user.curated_playlist_detail);
  const curatedPlaylistTracks = useSelector(state => state.user.curated_playlist_tracks);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([])
  const [updatedArtists, setUpdatedArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownModal, setShowDownModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [index, setIndex] = useState(0)
  const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")
  const favoritesMessage = useSelector( state => state.allTracks)

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
    setIsLoading(true)
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

  function showAddTrackToCartLicenseModal(index) {
    setIsLoading(true)
    if (localStorage.getItem("user")) {
      if (index > 9) {
        setIndex(index + 10)
      }
      else {
        setIndex(index)
      }
      setShowSidebar(true)
      setSidebarType("cart")
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
    setIsLoading(true)
    let url = `${BASE_URL}/api/v1/consumer/curated_playlists/58/playlist_tracks/download_zip?file_type=wav_file`
    const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    const response = await fetch(url,
      {
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.9kL4HmyjCYJgdpBHX1g3JHAp235eKlLAO_vcPb4bYGk",
          "auth-token": userAuthToken
        },
        method: "GET"
      });
    if(response.ok) {

    } else {

    }

  }

  const removeTrackFromPlaylist = (trackId) => {
    setIsLoading(true)
    dispatch(removeFromPlaylist(query.id, trackId))
  }

  function addTrackToCartLicenseModalSidebar(index) {
    setShowSidebar(false)
    setShowAddToCartLicenseModal(true)
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
          <div className={playlist.playlistBanner}>
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
                {curatedPlaylistDetail && curatedPlaylistDetail.playlist_image && <Image src={curatedPlaylistDetail.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
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
                    <Button variant="link" className="btn btnMainLarge">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.927" height="17.134" viewBox="0 0 16.927 17.134">
                        <g id="share-2" transform="translate(0.5 0.707)">
                          <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      Share
                    </Button>
                    <Button variant="link" className="btn btnMainLarge" onClick={() => handleDownloadZip(query.id)} disabled={curatedPlaylistDetail?.media_count <= 0}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.987" height="14.189" viewBox="0 0 14.987 14.189">
                        <g id="icon-download" transform="translate(0.5 13.689) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M7.455,2.737V.608A.592.592,0,0,0,6.881,0H.573A.592.592,0,0,0,0,.608V13.379a.592.592,0,0,0,.573.608H6.881a.592.592,0,0,0,.573-.608V11.251" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H10.9" transform="translate(2.294 6.994)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M2.867,0,0,3.041,2.867,6.081" transform="translate(2.294 3.953)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed-container">
            {curatedPlaylistTracks ? <MyPlaylistTracks tracks={curatedPlaylistTracks.playlist_tracks ? curatedPlaylistTracks.playlist_tracks : curatedPlaylistTracks} favoriteTrackIds={favoriteTrackIds} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} removeTrackFromPlaylist={removeTrackFromPlaylist} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} showDeleteButton={false}/> : <InpageLoader />}
          </div>

          {curatedPlaylistDetail && curatedPlaylistTracks && curatedPlaylistDetail?.media_count > 0 && <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={curatedPlaylistTracks.playlist_tracks[index]} type="track"/> }
          <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
          {curatedPlaylistTracks && <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={curatedPlaylistTracks[index]} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar}/>}
          {curatedPlaylistTracks && <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={curatedPlaylistTracks[index]} />}
        </div>


      </>
    )}
  </>
  );
}

export default Details;
