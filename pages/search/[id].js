import { useEffect, useRef, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import Tracks from "../../components/Tracks";
import playlist from "../../styles/Playlist.module.scss";
import { Slider } from "react-semantic-ui-range";
import { Grid } from 'semantic-ui-react';
import InpageLoader from "../../components/InpageLoader";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import { addToFavorites, removeFromFavorites, getTrackDetails, attachToMedia } from '../../redux/actions/trackActions';
import dynamic from 'next/dynamic'
import Notiflix from "notiflix";
import AddToPlaylist from "../../components/modals/AddToPlaylist";
import DownloadTrack from "../../components/modals/DownloadTrack";
import AddToCartLicense from "../../components/modals/AddToCartLicense";
import { TOAST_OPTIONS } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../../store/authContext";
import Sidebar from '../../components/Sidebar';
import ShareModal from "../../components/modals/ShareModal";

const AltVersion = dynamic(
  () => import('../../components/SingleAudioWave'),
  { ssr: false }
)

const formWaveSurferOptions = (ref) => (
   {
    container: ref,
    waveColor: "#CDD2DA",
    progressColor: "#C1D72E",
    cursorColor: "",
    cursorWidth: 0,
    barWidth: 1,
    barRadius: 0,
    responsive: true,
    barHeight: 30,
    height: 35,
    barGap: 1,
    normalize: true,
    partialRender: true,
    pixelRatio: 1,
    hideScrollbar: true,
    backend: 'MediaElement'
  }
);

const Details = () => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const { query } = useRouter();
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [track, setTrack] = useState([])
  const [similarTracks, setSimilarTracks] = useState([])
  const [peaks, setPeaks] = useState([]);
  const allTracks = useSelector(state => state.allTracks)
  const cartItem = useSelector(state => state.user.cart)
  const [similarTracksIndex, setSimilarTracksIndex] = useState(0);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false)
  const [altVersionTrack, setAltVersionTrack] = useState(null);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([])
  const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
  const [index, setIndex] = useState(0)
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")
  const [showDownModal, setShowDownModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareId, setShareId] = useState(null);
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allTracks.similarTracks) {
      dispatch(getTrackDetails(query.id))
    }
    else if (allTracks && allTracks.similarTracks) {
      setTrack(allTracks.track)
      setSimilarTracks(allTracks.similarTracks)
    }

    if (!allTracks?.success) {
      toast.error(allTracks.message, TOAST_OPTIONS);
    } else {
      toast.success(allTracks.message, TOAST_OPTIONS);
    }
  }, [allTracks]);

  useEffect(() => {
    if (track.audio_peak) {
      const getJson = async () => {
        const data = await fetch(track.audio_peak?.file, {
          headers: {
            accept: "application/json"
          }
        })
          .then(response => {
            return response.json()
          })
          .then(peaks => {
            if (wavesurfer.current == null)
              create(track.mp3_file_compressed, peaks.data);
            setPeaks(peaks.data)
          })
      }
      getJson()
    }
  }, [track]);


  useEffect(() => {
    // if (false) {
    //   setTimeout(() => setSeconds(seconds ? (seconds - 1) : (30 - 1)), 1000);
    // } else {
    //   setSeconds(seconds);


    // if (wavesurfer.current) {
    //   wavesurfer.current.play();
    // } else if (wavesurfer.current && !localStorage.getItem('playing')) {
    //   wavesurfer.current.pause();
    // }

    // return () => {
    //   if (wavesurfer.current) {
    //     wavesurfer.current.pause();
    //   }
    // };
  }, [seconds]);

  useEffect(() => {
    if (document.getElementsByClassName("play").length > 1)
      document.getElementsByClassName("first")[0]?.click();
    else if (document.getElementsByClassName("play").length == 1)
      document.getElementsByClassName("play")[0].classList.add('first');
  }, [playing]);

  wavesurfer.current?.on('ready', function () {
    if ((document.getElementsByClassName("play").length == 0) || (document.getElementsByClassName("play").length == 1 && !document.getElementsByClassName("play")[0].classList.contains(wavesurfer.current.container.classList)))
      wavesurfer.current.pause();
  });

  wavesurfer.current?.on('finish', function () {
    document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].classList.remove("play")
    document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].classList.remove("first")
    document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].classList.add("pause")
    if (document.getElementsByClassName("play").length != 1)
      document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].closest(".trackRow").nextElementSibling?.querySelectorAll('.pause')[0].click();
    setPlaying(!playing)
  });

  function handlePlayPause() {
    setPlaying(!playing)
    wavesurfer.current?.playPause();
  };

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      return minutes + ':' + parseInt(seconds)
    }
  }

  const create = async (url, peaks) => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url, peaks);
    setIsLoading(false);
  };

  useEffect(() => {
    if (cartItem && cartItem.id) {
      toast.success("Track added to the cart successfully!")
    } else {
      toast.error(cartItem)
    }
  }, [cartItem]);


  function updateSegmentTracksIndex(index) {
    setSimilarTracksIndex(index)
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

  function showTrackAddToPlaylistModal(index, type) {
    if (localStorage.getItem("user")) {
      if (type == "track") {
        setAltVersionTrack(null)
        setIndex(index)
      }
      else {
        setAltVersionTrack(index)
      }
      setShowAddToPlaylistModal(true)
    }
    else {
      Notiflix.Report.failure('Alert', 'You must be logged in to be able to add a track to your playlists.', 'Ok');
    }
  }

  function handleAddToPlaylistModalClose() {
    setShowAddToPlaylistModal(false)
  }

  function handleShareModalClose() {
    setShowShareModal(false)
  }

  function handleShareId(id) {
    setShareId(id);
  }

  const handleAddToFavorites = (e, trackId) => {
    // setLoading(true)
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

  function showDownloadModal(index, type) {
    if (localStorage.getItem("user")) {
      if (type == "track") {
        setAltVersionTrack(null)
        setIndex(index)
      }
      else {
        setAltVersionTrack(index)
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

  function showAddTrackToCartLicenseModal(index, type) {
    setIndex(index)
    if (localStorage.getItem("user")) {
      if (type=="similarTrack") {
        setAltVersionTrack(null)
      }
      else {
        setAltVersionTrack(index)
      }
      if (typeof (localStorage.getItem("has_subscription")) !== undefined) {
        if (JSON.parse(localStorage.getItem("has_subscription"))) {
            authContext.handleAddToCart(type == "similarTrack" ? similarTracks[index].id : index.id, "Track", "");
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

  function addTrackToCartLicenseModalSidebar(index) {
    setShowSidebar(false)
    setShowAddToCartLicenseModal(true)
  }

  function handleAddToCartLicenseModalClose() {
    setShowAddToCartLicenseModal(false)
  }

  const handleLicenseClick = (e, trackId, licenseId) => {
    if (licenseId) {
      e.preventDefault()
      dispatch(attachToMedia(trackId, licenseId));
    }
  }

  const handleSidebarHide = () => {
    setShowSidebar(false)
  }

  return (
    <div className={playlist.myPlaylistShow+' '+playlist.similarTrackDetail}>
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
      <div className={playlist.playlistBanner}>
        <div className={playlist.playlistInfo}>
          <div className={playlist.playlistCard}>
            <div className={playlist.imgSec}>
              <a href="javascript:void(0)" className="tileOverlay">
                {/* <Image src={mood1} alt="Mood" className="tilesImg"></Image> */}
                {isLoading ?
                  <InpageLoader /> :
                  <div className="playPauseBtn" onClick={() => { handlePlayPause() }} >
                    <span className={(playing) ? "play" + ' ' + query.id : "pause" + ' ' + query.id}></span>
                    <span className="pause d-none"></span>
                  </div>
                }
              </a>
            </div>
            <div className={playlist.contentSec}>
              <div className={playlist.aboutPlaylist}>
                {isLoading ?
                  <InpageLoader /> :
                  <div className={playlist.playlistOwner}>
                    <div className={playlist.PlaylistName}>
                      <h3>{track.title}</h3>
                      <span className={playlist.artistName}>{track.artist_name}</span>
                    </div>
                    <div className="singleTrackDetail controls">
                      <OverlayTrigger overlay={<Tooltip>Add to Favourites</Tooltip>}>
                        <a>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22.93" height="20.303" viewBox="0 0 22.93 20.303">
                            <g id="icon-add-to-favorites" transform="translate(0.619 0.513)">
                              <path id="Shape_185" data-name="Shape 185" d="M181.253,573.9l-7.07-7.281a5.369,5.369,0,0,1-1.031-6.258h0a5.532,5.532,0,0,1,8.8-1.409l1.516,1.382,1.516-1.382a5.532,5.532,0,0,1,8.8,1.409h0a5.36,5.36,0,0,1,.182,4.452" transform="translate(-172.573 -557.365)" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_11" data-name="Oval 11" d="M189.254,577.1a5.683,5.683,0,1,0-5.684-5.683A5.683,5.683,0,0,0,189.254,577.1Z" transform="translate(-173.153 -557.807)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73v5.684" transform="translate(-173.469 -557.965)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_187" data-name="Shape 187" d="M192.254,571.73h-5.683" transform="translate(-173.311 -558.123)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </svg>
                        </a>
                      </OverlayTrigger>

                      <OverlayTrigger overlay={<Tooltip>Download Track</Tooltip>}>
                        <a>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
                            <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                              <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </svg>
                        </a>
                      </OverlayTrigger>

                      <Dropdown alignCenter>
                        <OverlayTrigger overlay={<Tooltip>More</Tooltip>}>
                          <Dropdown.Toggle variant="" id="dropdown-autoclose-true dropdown-button-drop-up">
                              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                <g id="icon-elipsis" transform="translate(-422 -334)">
                                  <path id="Oval_12" data-name="Oval 12" d="M429,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,429,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Oval_13" data-name="Oval 13" d="M434,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,434,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Oval_14" data-name="Oval 14" d="M439,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,439,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Oval_15" data-name="Oval 15" d="M433,355.5A10.5,10.5,0,1,0,422.5,345,10.5,10.5,0,0,0,433,355.5Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                </g>
                              </svg>
                          </Dropdown.Toggle>
                        </OverlayTrigger>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.994" height="17.024" viewBox="0 0 17.994 17.024">
                              <g id="icon-cart" transform="translate(0.5 0.5)">
                                <g id="Group_155" data-name="Group 155" transform="translate(0)">
                                  <g id="shopping-cart-add">
                                    <path id="Oval_67" data-name="Oval 67" d="M255.607,1411.542a1.047,1.047,0,1,0-1.108-1.045A1.078,1.078,0,0,0,255.607,1411.542Z" transform="translate(-250.067 -1397.608)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Shape_1172" data-name="Shape 1172" d="M248.5,1392.452h2a.732.732,0,0,1,.72.537l2.822,11.306H257" transform="translate(-248.5 -1392.452)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Shape_1173" data-name="Shape 1173" d="M265.656,1401.62l.8-2.251a.663.663,0,0,0-.1-.628.753.753,0,0,0-.6-.289H253.412" transform="translate(-249.783 -1394.272)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Shape_1174" data-name="Shape 1174" d="M255.293,1406.452h3.459" transform="translate(-250.274 -1396.698)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Oval_68" data-name="Oval 68" d="M265.2,1412.419a3.489,3.489,0,1,0-3.694-3.483A3.594,3.594,0,0,0,265.2,1412.419Z" transform="translate(-251.895 -1396.395)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Shape_1175" data-name="Shape 1175" d="M266.5,1408.452v2.787" transform="translate(-253.201 -1397.305)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Shape_1176" data-name="Shape 1176" d="M264.5,1410.452h2.955" transform="translate(-252.679 -1397.912)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  </g>
                                </g>
                              </g>
                            </svg>
                            <span>Add to Cart</span>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {handleShareId(track.id); setShowShareModal(true) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16.927" height="17.134" viewBox="0 0 16.927 17.134">
                              <g id="Interface-Essential_Share_share-2" data-name="Interface-Essential / Share / share-2" transform="translate(-518 -3841.793)">
                                <g id="Group_395" data-name="Group 395" transform="translate(518.5 3842.5)">
                                  <g id="share-2">
                                    <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  </g>
                                </g>
                              </g>
                            </svg>
                            <span>Share</span>
                          </Dropdown.Item>
                          { (localStorage?.getItem('user')) ?
                          <Dropdown.Item href="#/action-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15.432" height="16.579" viewBox="0 0 15.432 16.579">
                              <g id="Music-Audio_Modern-Music_modern-music-dj" data-name="Music-Audio / Modern-Music / modern-music-dj" transform="translate(-343.015 -1624.558)">
                                <g id="Social-Medias-Rewards-Rating_Social-Profile_social-profile-avatar" data-name="Social-Medias-Rewards-Rating / Social-Profile / social-profile-avatar" transform="translate(170.108 1540.602)">
                                  <g id="Group" transform="translate(173.415 84.471)">
                                    <g id="social-profile-avatar">
                                      <path id="Shape" d="M182.888,100.035v-2.03h.677a2.03,2.03,0,0,0,2.03-2.03v-2.03h1.9a.338.338,0,0,0,.32-.441c-1.269-3.927-2.186-8.143-6.375-8.909a6.759,6.759,0,0,0-8,5.856,6.583,6.583,0,0,0,2.678,5.935v3.646" transform="translate(-173.415 -84.471)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                    </g>
                                  </g>
                                  <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73V574.8" transform="translate(-9.341 -479.918)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Shape_187" data-name="Shape 187" d="M192.636,571.73h-6.066" transform="translate(-9.373 -479.885)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                </g>
                              </g>
                            </svg>
                            <span>Follow Artist</span>
                          </Dropdown.Item> : "" }
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                }
                <div className={playlist.waveformBlock}>
                  <div id="waveform" ref={waveformRef} className={query.id} />
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
                {/* <Button variant="link" className="btn btnMainLarge">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14.987" height="14.189" viewBox="0 0 14.987 14.189">
                    <g id="icon-download" transform="translate(0.5 13.689) rotate(-90)">
                      <path id="Shape_111" data-name="Shape 111" d="M7.455,2.737V.608A.592.592,0,0,0,6.881,0H.573A.592.592,0,0,0,0,.608V13.379a.592.592,0,0,0,.573.608H6.881a.592.592,0,0,0,.573-.608V11.251" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_112" data-name="Shape 112" d="M0,0H10.9" transform="translate(2.294 6.994)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_113" data-name="Shape 113" d="M2.867,0,0,3.041,2.867,6.081" transform="translate(2.294 3.953)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    </g>
                  </svg>
                  Lyrics
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-container">
        {isLoading ?
          <InpageLoader /> :
          <>
            {track.alternate_versions?.map((altVersion, index) => {
              return (
                <AltVersion key={index} track={altVersion} moodColumn={handleMoodColumn(altVersion, moodColumn)} handleSimilarSearch={handleSimilarSearch} showTrackAddToPlaylistModal={showTrackAddToPlaylistModal} handleAddToFavorites={handleAddToFavorites} tracksMeta={tracksMeta} favoriteTrackIds={favoriteTrackIds} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} showAddTrackToCartLicenseModal={props.showAddTrackToCartLicenseModal} handleUnfollowArtist={handleUnfollowArtist} handleFollowArtist={handleFollowArtist} followedArtists={followedArtists} />
              )
            })}
            {similarTracks.length > 0 ? <Tracks tracks={similarTracks.slice(similarTracksIndex, similarTracksIndex + 10)} tracksMeta={similarTracks.length} showDownloadModal={showDownloadModal} showTrackAddToPlaylistModal={showTrackAddToPlaylistModal} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} handleAddToFavorites={handleAddToFavorites} handleSimilarSearch={handleSimilarSearch} fromAims={true} updateSegmentTracksIndex={updateSegmentTracksIndex} type="similarTrack" />: <center>No Similar Track Found</center>}
          </>
        }
      </div>
      <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={altVersionTrack ? altVersionTrack : similarTracks[index]} type="track" />
      {localStorage.getItem("user") && <AddToPlaylist showModal={showAddToPlaylistModal} onCloseModal={handleAddToPlaylistModalClose} track={altVersionTrack ? altVersionTrack : similarTracks[index]} />}
      <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={altVersionTrack ? altVersionTrack : similarTracks[index]} handleLicenseClick={handleLicenseClick} type="Track" />
      <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={altVersionTrack ? altVersionTrack : similarTracks[index]} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar} />
      <ShareModal showModal={showShareModal} onCloseModal={handleShareModalClose} shareId={shareId} />
    </div>
  );
}
export default Details;
