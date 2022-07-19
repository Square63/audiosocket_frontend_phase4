import { useRouter } from "next/router";
import { getMyPlaylistDetail, getMyPlaylistTracks, getMyPlaylistArtists, removeFromPlaylist } from "../../../redux/actions/authActions";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import MyPlaylistTracks from "../../../components/MyPlaylistTracks";
import InpageLoader from '../../../components/InpageLoader';
import Image from 'next/image';
import Router from "next/router";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import playlist from "../../../styles/Playlist.module.scss";
import mood1 from '../../../images/mood1.png';
import mood2 from '../../../images/mood2.png';
import EditPlaylist from "../../../components/modals/EditPlaylist";
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_OPTIONS } from '../../../common/api';
import DownloadTrack from '../../../components/modals/DownloadTrack'
import DownloadTrackLicense from '../../../components/modals/DownloadTrackLicense'
import Sidebar from '../../../components/Sidebar'
import AddToCartLicense from "../../../components/modals/AddToCartLicense";
import { addToFavorites, removeFromFavorites } from '../../../redux/actions/trackActions';
import Notiflix from "notiflix";
import Pluralize from 'pluralize';
import axios from "axios";
import { BASE_URL } from '../../../common/api';
import DownloadPlaylist from "../../../components/modals/DownloadPlaylist";
import {AuthContext} from "../../../store/authContext";
import ShareModal from "../../../components/modals/ShareModal"

const Details = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const myPlaylistDetail = useSelector(state => state.user.my_playlist_detail);
  const myPlaylistTracks = useSelector(state => state.user.my_playlist_tracks);
  const myPlaylistArtists = useSelector(state => state.user.my_playlist_artists);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([])
  const [favoriteSfxIds, setFavoriteSfxIds] = useState([])
  const [followedArtistsIds, setFollowedArtistsIds] = useState([]);
  const [updatedArtists, setUpdatedArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDownModal, setShowDownModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showDownloadPlaylist, setShowDownloadPlaylist] = useState(false);
  const [index, setIndex] = useState(0)
  const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);
  const favoritesMessage = useSelector( state => state.allTracks)
  const firstName = JSON.parse(localStorage.getItem("first_name")).charAt(0).toUpperCase() + JSON.parse(localStorage.getItem("first_name")).slice(1)
  const lastName = JSON.parse(localStorage.getItem("last_name")).charAt(0).toUpperCase() + JSON.parse(localStorage.getItem("last_name")).slice(1)
  const [altVersionTrack, setAltVersionTrack] = useState(null);
  const cartItem = useSelector(state => state.user.cart)
  const authContext = useContext(AuthContext);
  const [updatedTracks, setUpdatedTracks] = useState([])
  const [mediableType, setMediableType] = useState("")
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareId, setShareId] = useState(null);

  useEffect(() => {
    if (cartItem && cartItem.id){
      toast.success("Track added to the cart successfully!")
    } else {
      toast.error(cartItem)
    }
  }, [cartItem]);

  useEffect(() => {
    if (query) {
      dispatch(getMyPlaylistDetail(query.id))
      dispatch(getMyPlaylistTracks(query.id, 1))
    }
  }, [showEditModal]);

  useEffect(() => {
    if (myPlaylistDetail) {
      setIsLoading(false)
    }
  }, [myPlaylistDetail])

  useEffect(() => {
    if (myPlaylistTracks) {
      dispatch(getMyPlaylistArtists(query.id))
      if (myPlaylistTracks.meta) {
        myPlaylistTracks.meta.favorite_tracks_ids && setFavoriteTrackIds(myPlaylistTracks.meta.favorite_tracks_ids)
        myPlaylistTracks.meta.followed_artist_ids && setFollowedArtistsIds(myPlaylistTracks.meta.followed_artist_ids)
        myPlaylistTracks.meta.followed_sfx_ids && setFavoriteSfxIds(myPlaylistTracks.meta.followed_sfx_ids)
      }
      setIsLoading(false)
      if (myPlaylistTracks.meta && updatedTracks[0]?.id != myPlaylistTracks.playlist_tracks[0]?.id){
        setUpdatedTracks(updatedTracks => [...updatedTracks, ...myPlaylistTracks.playlist_tracks]);
      }
    }
  }, [myPlaylistTracks])

  useEffect(() => {
    if (myPlaylistArtists) {
      setIsLoading(false)
      setUpdatedArtists(myPlaylistArtists)
    }
  }, [myPlaylistArtists])

  useEffect(() => {
    if(!favoritesMessage?.success) {
      toast.error(favoritesMessage.message, TOAST_OPTIONS);
    } else {
      toast.success(favoritesMessage.message, TOAST_OPTIONS);
    }
    setIsLoading(false)
  }, [favoritesMessage])

  const handleEditClose = (show) => {
    setShowEditModal(show)
  }

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

  const handleTrackSearchOfArtist = (artistId, artistName) => {
    localStorage.setItem("artistId", artistId)
    localStorage.setItem("artistName", artistName)
    Router.push({
      pathname: '/search'
    },
      undefined, { shallow: true }
    )
  }

  function totalDuration(tracks) {
    let duration = 0
    if (!(tracks.tracks == 'No Track Found')){
      if (tracks.playlist_tracks) {
        tracks.playlist_tracks.map((track, index) =>
        duration += track.mediable.duration)
      } else {
        tracks.tracks.map((track, index) =>
        duration += track.mediable.duration)
      }
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
        dispatch(addToFavorites(trackId, "track"));
      }
      else {
        favoriteTrackIds.splice(favoriteTrackIds.indexOf(trackId), 1)
        e.target.closest("a").classList.remove("controlActive")
        setFavoriteTrackIds(favoriteTrackIds)
        dispatch(removeFromFavorites(trackId, "track"));
      }
    }
    else {
      setShowSidebar(true)
      setSidebarType("login")
    }
  }

  function showDownloadModal(index) {
    setIndex(index)
    if (localStorage.getItem("user")) {

      setShowDownModal(true)
    }
    else {
      Notiflix.Report.failure('Alert', 'You must be logged in to be able to download a track.', 'Ok');
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

  function handleDownloadPlaylistClose() {
    setShowDownloadPlaylist(false)
  }

  function showAddTrackToCartLicenseModal(index, type) {
    setIndex(index)
    setMediableType(type)
    if (localStorage.getItem("user")) {
      if (type == "track" || type == "Track" || type == "sfx" || type == "Sfx") {
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
            authContext.handleAddToCart(type == "Track" || type == "Sfx"? updatedTracks[index].mediable.id : index.id, type, "");
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
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.9kL4HmyjCYJgdpBHX1g3JHAp235eKlLAO_vcPb4bYGk',
      },
      method: "get",
      url: (`${BASE_URL}/api/v1/consumer/consumers_playlists/${id}/playlist_tracks/download_zip?klass=consumer_playlist&file_type=mp3_file`)
    }).then(response => {
      if (response.status == 200) {
        const link = document.createElement("a");
        link.href = response.data.zip_file;
        link.download = myPlaylistDetail.name;
        link.click();
        setShowDownloadMessage(false)
        setShowDownloadPlaylist(false)
      } else {
        toast.error("Error while downloading your playlist.");
      }
    })
  }

  const removeTrackFromPlaylist = (track) => {
    Notiflix.Confirm.show(
      'Please confirm',
      `Are you sure you want to delete track ${track.mediable.title}?`,
      'Yes',
      'No',
      function() {
        setIsLoading(true)
        dispatch(removeFromPlaylist(query.id, track.id))
      }
    );
  }

  function addTrackToCartLicenseModalSidebar(index) {
    setShowSidebar(false)
    setShowAddToCartLicenseModal(true)
  }

  function handleShareModalClose() {
    setShowShareModal(false)
  }

  function handleShareId(id) {
    setShareId(id);
  }

  const emptyUpdatedTracks = () => {
    setUpdatedTracks([])
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
          <div className={playlist.playlistBanner} style={myPlaylistDetail && {backgroundImage: "url(" + myPlaylistDetail.compressed_banner_image + ")"}}>
            <div className="themeBreadcrumb">
              <div className="fixed-container">
                <Breadcrumb>
                  <Breadcrumb.Item href="/playlist/myPlaylists">My Playlists</Breadcrumb.Item>
                  <Breadcrumb.Item active>{myPlaylistDetail && myPlaylistDetail.name}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <div className={playlist.playlistInfo}>
              <div className={playlist.playlistCard}>
                <div className={playlist.imgSec+" "+ 'tileOverlay'}>
                  {myPlaylistDetail && myPlaylistDetail.playlist_image && <Image src={myPlaylistDetail.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                </div>
                <div className={playlist.contentSec}>
                  <div className={playlist.aboutPlaylist}>
                    <div className={playlist.playlistOwner}>
                      <div className={playlist.PlaylistName}>{myPlaylistDetail && myPlaylistDetail.name}</div>
                      <div className={playlist.createdBy}>
                        Created by: <span>{firstName + ' ' + lastName}</span>
                      </div>
                    </div>
                    <div className={playlist.playlistStats}>
                      <div className={playlist.tracksCount}>
                        {myPlaylistDetail && myPlaylistDetail?.media_count == 0 || myPlaylistDetail?.media_count == null ? '0 Tracks' : myPlaylistDetail?.media_count + Pluralize(' Track', myPlaylistDetail?.media_count) }
                      </div>
                      <div className={playlist.tracksDuration}>
                        Duration: <span>{myPlaylistTracks && totalDuration(myPlaylistTracks)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={playlist.cardBtnWrapper}>
                    <Button variant="link" className="btn btnMainLarge" onClick={() => {handleShareId(null); setShowShareModal(true) }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.927" height="17.134" viewBox="0 0 16.927 17.134">
                        <g id="share-2" transform="translate(0.5 0.707)">
                          <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      Share
                    </Button>
                      <Button variant="link" className="btn btnMainLarge" onClick={() => {setShowDownloadPlaylist(true); handleDownloadZip(query.id);}} disabled={myPlaylistTracks?.playlist_tracks?.length <= 0 || showDownloadMessage}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14.987" height="14.189" viewBox="0 0 14.987 14.189">
                        <g id="icon-download" transform="translate(0.5 13.689) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M7.455,2.737V.608A.592.592,0,0,0,6.881,0H.573A.592.592,0,0,0,0,.608V13.379a.592.592,0,0,0,.573.608H6.881a.592.592,0,0,0,.573-.608V11.251" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H10.9" transform="translate(2.294 6.994)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M2.867,0,0,3.041,2.867,6.081" transform="translate(2.294 3.953)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      Download
                    </Button>
                    <Button variant="link" className="btn btnMainLarge" onClick={() => setShowEditModal(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13.685" height="13.686" viewBox="0 0 13.685 13.686">
                        <g id="pencil" transform="translate(-425.625 -3148.782)">
                          <path id="Shape_1730" data-name="Shape 1730" d="M432.265,3161.234l-4.554,1.952,1.952-4.555,8.131-8.132,2.6,2.6-8.131,8.132Z" transform="translate(-1.586 -1.217)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1731" data-name="Shape 1731" d="M439.438,3154.943l-2.6-2.6" transform="translate(-2.317 -1.365)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_1732" data-name="Shape 1732" d="M432.435,3161.943l-2.6-2.6" transform="translate(-1.756 -1.925)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      Edit Playlist
                    </Button>
                  </div>
                  {showDownloadMessage &&
                    <div className={playlist.downloadMessage}>Please wait while your download is in progress...</div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="fixed-container">
            {myPlaylistTracks ?
              <>
                    <MyPlaylistTracks tracks={myPlaylistTracks.playlist_tracks ? myPlaylistTracks.playlist_tracks : myPlaylistTracks} myPlaylistTracksCount={myPlaylistTracks.meta?.playlist_track_count} followed_artist_ids={followedArtistsIds} favoriteTrackIds={favoriteTrackIds} handleSimilarSearch={handleSimilarSearch} handleTrackSearchOfArtist={handleTrackSearchOfArtist} handleAddToFavorites={handleAddToFavorites} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} removeTrackFromPlaylist={removeTrackFromPlaylist} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} showDeleteButton={true} type="myplaylist" emptyUpdatedTracks={emptyUpdatedTracks}/>
                <div className={playlist.artistTiles}>
                  <h3>Artists On This Playlist</h3>
                  {updatedArtists && updatedArtists.length == 0 ?
                    <center>No Artist Found</center> :
                    <section className={playlist.myPlaylists}>
                      <div className="tilesWrapper">
                        {updatedArtists.length > 0 && updatedArtists.map((artist, index) =>
                          <a key={index} className="tileOverlay">
                            <Image src={index > 0 ? mood1 : mood2} alt="Mood" className="tilesImg"></Image>
                            <span className="tileOverlayText">
                              {artist.first_name + ' ' + artist.last_name}
                            </span>
                          </a>)
                        }
                      </div>
                    </section>
                  }
                </div>
              </>
              :
              <InpageLoader />
            }
          </div>
          {(showEditModal && myPlaylistDetail) && <EditPlaylist showModal={showEditModal} onCloseModal={handleEditClose} loading={handleLoading} myPlaylistDetail={myPlaylistDetail} myPlaylistTracks={myPlaylistTracks} />}
          {myPlaylistDetail && myPlaylistTracks && myPlaylistTracks.playlist_tracks?.length > 0 && <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={updatedTracks[index]} type="track"/> }
          <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
          {myPlaylistTracks && <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={altVersionTrack ? altVersionTrack : updatedTracks[index]?.mediable} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar}/>}
          {myPlaylistTracks && <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]?.mediable} type={mediableType} />}
          <DownloadPlaylist showModal={showDownloadPlaylist} onCloseModal={handleDownloadPlaylistClose} />
        </div>
      </>
    )}
    <ShareModal showModal={showShareModal} onCloseModal={handleShareModalClose} shareId={shareId} />
  </>
  );
}

export default Details;
