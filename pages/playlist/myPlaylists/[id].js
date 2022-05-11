import { useRouter } from "next/router";
import { getMyPlaylistDetail } from "../../../redux/actions/authActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import MyPlaylistTracks from "../../../components/MyPlaylistTracks";
import InpageLoader from '../../../components/InpageLoader';
import Image from 'next/image';
import Router from "next/router";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import playlist from "../../../styles/Playlist.module.scss";
import mood1 from '../../../images/mood1.png';
import mood2 from '../../../images/mood2.png';
import mood3 from '../../../images/mood3.jpg';
import mood4 from '../../../images/mood4.jpg';
import Sample1 from '../../../images/sample1.jpeg';
import EditPlaylist from "../../../components/modals/EditPlaylist";
import { duration } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import DownloadTrack from '../../../components/modals/DownloadTrack'
import DownloadTrackLicense from '../../../components/modals/DownloadTrackLicense'
import Sidebar from '../../../components/Sidebar'

const Details = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const myPlaylistDetail = useSelector(state => state.user.my_playlist_detail);
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([])
  const [isLoading, setIsLoading] = useState(true);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDownModal, setShowDownModal] = useState(false);
	const [showLicenseModal, setShowLicenseModal] = useState(false);
	const [index, setIndex] = useState(0)
	const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
	const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")

  useEffect(() => {
    if (query) {
      dispatch(getMyPlaylistDetail(query.id))
    }
  }, [showEditModal]);

  useEffect(() => {
    if (myPlaylistDetail) {
      setIsLoading(false)
    }
  }, [myPlaylistDetail])

	const handleEditClose = (show) => {
    setShowEditModal(show)
  }

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
		tracks.map((track, index) =>
			duration += track.duration
		)
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
    if (localStorage.getItem("user")) {
      if (!favoriteTrackIds.includes(trackId) && !tracksMeta.favorite_tracks_ids.includes(trackId)) {
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
      // alert("You must be logged in to be able to add a track to your favorites.")
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
      alert("You must be logged in to be able to add a track to cart.")
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
    if (localStorage.getItem("user")) {
      if (index > 9) {
        setIndex(index + 10)
      }
      else {
        setIndex(index)
      }
      setShowAddToCartLicenseModal(true)
      setShowSidebar(true)
      setSidebarType("cart")
    }
    else {
      // alert("You must be logged in to be able to add a track to cart.")
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
		debugger
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
      debugger
      
    } else {
      
    }
    
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
									<Breadcrumb.Item href="#">My Playlists</Breadcrumb.Item>
									<Breadcrumb.Item active>{myPlaylistDetail.name}</Breadcrumb.Item>
								</Breadcrumb>
							</div>
						</div>
						<div className={playlist.playlistInfo}>
							<div className={playlist.playlistCard}>
								<div className={playlist.imgSec}>
								{myPlaylistDetail.playlist_image && <Image src={myPlaylistDetail.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
								</div>
								<div className={playlist.contentSec}>
									<div className={playlist.aboutPlaylist}>
										<div className={playlist.playlistOwner}>
											<div className={playlist.PlaylistName}>{myPlaylistDetail.name}</div>
											<div className={playlist.createdBy}>
												Created by: <span>Audiosocket</span>
											</div>
										</div>
										<div className={playlist.playlistStats}>
											<div className={playlist.tracksCount}>
											{myPlaylistDetail.tracks.length} Tracks
											</div>
											<div className={playlist.tracksDuration}>
												Duration: <span>{totalDuration(myPlaylistDetail.tracks)}</span>
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
										<Button variant="link" className="btn btnMainLarge" onClick={() => handleDownloadZip(query.id)}>
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
								</div> 
							</div>
						</div>
					</div>
					<div className="fixed-container">
						{myPlaylistDetail.tracks && myPlaylistDetail.tracks.length > 0 && <MyPlaylistTracks tracks={myPlaylistDetail.tracks} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal}/>}
					</div>
					
					<div className={playlist.artistTiles}>
						<div className="fixed-container">
							<h3>Artists On This Playlist</h3>
							<section className={playlist.myPlaylists}>
								<div className="tilesWrapper">
									<a href="javascript:void(0)" className="tileOverlay">
										<Image src={mood1} alt="Mood" className="tilesImg"></Image>
										<span className="tileOverlayText">
											The Kelseys
										</span>
									</a>
									<a href="javascript:void(0)" className="tileOverlay">
										<Image src={mood2} alt="Mood" className="tilesImg"></Image>
										<span className="tileOverlayText">
											Mark Ulrich
										</span>
									</a>
									<a href="javascript:void(0)" className="tileOverlay">
										<Image src={mood3} alt="Mood" className="tilesImg"></Image>
										<span className="tileOverlayText">
											Justin G. Marcellus
										</span>
									</a>
									<a href="javascript:void(0)" className="tileOverlay">
										<Image src={mood4} alt="Mood" className="tilesImg"></Image>
										<span className="tileOverlayText">
											Michael Ayers
										</span>
									</a>
									<a href="javascript:void(0)" className="tileOverlay">
										<Image src={Sample1} alt="Mood" className="tilesImg"></Image>
										<span className="tileOverlayText">
											justin abady
										</span>
									</a>
								</div>
							</section>
						</div>
					</div>
					{(showEditModal && myPlaylistDetail) && <EditPlaylist showModal={showEditModal} onCloseModal={handleEditClose} loading={handleLoading} myPlaylistDetail={myPlaylistDetail} />}
					{myPlaylistDetail.tracks && myPlaylistDetail.tracks.length > 0 && <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={myPlaylistDetail.tracks[index]} type="track"/> }
      		<DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
					<Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={myPlaylistDetail.tracks[index]}/>
				</div>

				
			</>
		)}
	</>
  );
}

export default Details;