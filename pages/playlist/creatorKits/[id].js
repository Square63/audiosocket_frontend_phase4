import { useRouter } from "next/router";
import { Form, Button, FormGroup, FormControl, Tabs, Tab, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { getCreatotKitsDetail } from "../../../redux/actions/authActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import playlist from "../../../styles/Playlist.module.scss";
import anime from '../../../images/animi.jpeg';
import cinemetic from '../../../images/cinimetic.jpeg';
import hiphop from '../../../images/hiphop.jpeg';
import mood1 from '../../../images/mood1.png';
import mood2 from '../../../images/mood2.png';
import mood3 from '../../../images/mood3.jpg';
import mood4 from '../../../images/mood4.jpg';
import Sample1 from '../../../images/sample1.jpeg';
import Sample2 from '../../../images/sample2.jpeg';
import CreatorKitsTracks from "../../../components/CreatorKitsTracks";
import InpageLoader from '../../../components/InpageLoader';
import Router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { TOAST_OPTIONS } from '../../../common/api';
import DownloadTrack from '../../../components/modals/DownloadTrack'
import DownloadTrackLicense from '../../../components/modals/DownloadTrackLicense'
import Sidebar from '../../../components/Sidebar'
import AddToCartLicense from "../../../components/modals/AddToCartLicense";
import { addToFavorites, removeFromFavorites } from '../../../redux/actions/trackActions';
import Notiflix from "notiflix";
import Pluralize from 'pluralize';



const Details = ()  => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [type, setType] = useState("tracks")
  const [isLoading, setIsLoading] = useState(true);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [index, setIndex] = useState(0)
  const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([])
  const [showDownModal, setShowDownModal] = useState(false);
  const [updatedTracks, setUpdatedTracks] = useState([])
  const creatorKitsDetail = useSelector(state => state.user.creator_kits_detail);
  // const creatorKitsTracks = useSelector(state => state.user.meta.tracks);
  // const creatorKitsSfxes = useSelector(state => state.user.meta.sfxes);

  useEffect(() => {
    if (query && !creatorKitsDetail) {
      dispatch(getCreatotKitsDetail(query.id, type, 1))
      // dispatch(getMyPlaylistTracks(query.id, 1))
    }
  }, [creatorKitsDetail]);

  useEffect(() => {
    if (creatorKitsDetail) {
      if (type == "tracks") {
        if (creatorKitsDetail.meta.tracks.length > 0) {
          if (updatedTracks[0]?.id != creatorKitsDetail.meta.tracks[0].id)
            setUpdatedTracks(updatedTracks => [...updatedTracks, ...creatorKitsDetail.meta.tracks]);
        }
      } else {
        if (creatorKitsDetail.meta.sfxes?.length > 0) {
          if (updatedTracks[0]?.id != creatorKitsDetail.meta.sfxes[0].id)
            setUpdatedTracks(updatedTracks => [...updatedTracks, ...creatorKitsDetail.meta.sfxes]);
        }
      }
      setIsLoading(false)
      creatorKitsDetail.meta && setFavoriteTrackIds(creatorKitsDetail.meta.favorite_tracks_ids)
    }
  }, [creatorKitsDetail])

  useEffect(() => {
    dispatch(getCreatotKitsDetail(query.id, type, 1))
  }, [type])

  const handleType = (e) => {
    setUpdatedTracks([])
    setType(e)
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
      setIndex(index)
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
      setIndex(index)
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
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
          "auth-token": userAuthToken
        },
        method: "GET"
      });
    if(response.ok) {

    } else {

    }

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

  const handleAddFilter = async(e) => {
    
  }

  return (
    <>
    {creatorKitsDetail ? 
    <div className={playlist.creatorKits}>
      
      <div className={playlist.playlistBanner}>
        <div className="themeBreadcrumb">
          <div className="fixed-container">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Playlists</Breadcrumb.Item>
              <Breadcrumb.Item href="#">Creator Kits</Breadcrumb.Item>
              <Breadcrumb.Item active>{creatorKitsDetail.curated_playlist.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className={playlist.playlistInfo}>
          <div className={playlist.playlistCard}>
            <div className={playlist.imgSec}>
              <Image src={mood1} alt="Mood" className="tilesImg"></Image>
            </div>
            <div className={playlist.contentSec}>
              <div className={playlist.aboutPlaylist}>
                <div className={playlist.playlistOwner}>
                  <div className={playlist.PlaylistName}>Creator Kits - {creatorKitsDetail.curated_playlist.name}</div>
                  <div className={playlist.createdBy}>
                    Created by: <span>plarson</span>
                  </div>
                </div>



                <div className={playlist.playlistStats}>
                  <div className={playlist.tracksCount}>
                    71 Music Tracks
                  </div>
                  <div className={playlist.tracksDuration}>
                    21 SFX
                  </div>
                  <div className={playlist.tracksDuration}>
                    18 Sound Design Tracks
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
                <Button variant="link" className="btn btnMainLarge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14.987" height="14.189" viewBox="0 0 14.987 14.189">
                    <g id="icon-download" transform="translate(0.5 13.689) rotate(-90)">
                      <path id="Shape_111" data-name="Shape 111" d="M7.455,2.737V.608A.592.592,0,0,0,6.881,0H.573A.592.592,0,0,0,0,.608V13.379a.592.592,0,0,0,.573.608H6.881a.592.592,0,0,0,.573-.608V11.251" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_112" data-name="Shape 112" d="M0,0H10.9" transform="translate(2.294 6.994)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_113" data-name="Shape 113" d="M2.867,0,0,3.041,2.867,6.081" transform="translate(2.294 3.953)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    </g>
                  </svg>
                  Download
                </Button>
                <Button variant="link" className="btn btnMainLarge">
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
                  Follow Kit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-container">
        <div className={playlist.creatorKitsContent}>
          <Tabs defaultActiveKey="tracks" id="uncontrolled-tab-example" onSelect={(e)=> handleType(e)}>
            <Tab eventKey="tracks" title="Tracks">      
            {creatorKitsDetail.meta && creatorKitsDetail.meta.tracks?
              <CreatorKitsTracks tracks={creatorKitsDetail.meta.tracks} favoriteTrackIds={favoriteTrackIds} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} removeTrackFromPlaylist={removeTrackFromPlaylist} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} showDeleteButton={true} type={type}/>
              :
              <InpageLoader/>
            }
            </Tab>
            <Tab eventKey="sfx" title="SFX">
            {creatorKitsDetail.meta && creatorKitsDetail.meta.sfxes?
              <CreatorKitsTracks tracks={creatorKitsDetail.meta.sfxes} favoriteTrackIds={favoriteTrackIds} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} removeTrackFromPlaylist={removeTrackFromPlaylist} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} showDeleteButton={true} type={type}/>
              :
              <InpageLoader/>
            }
            </Tab>
            <Tab eventKey="soundDesign" title="Sound Design">
            <p>lorem 52</p>
            </Tab>
          </Tabs>
        </div>
      </div>
      {creatorKitsDetail && <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={updatedTracks[index]} type={type}/> }
      <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
      {creatorKitsDetail && <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={updatedTracks[index]} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar} type={type}/>}
      {creatorKitsDetail && <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={updatedTracks[index]} type={type}/>}
    </div> : <InpageLoader/>
    }
    </>
  );
}

export default Details;
