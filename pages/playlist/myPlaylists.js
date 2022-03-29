import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import NewPlaylist from "../../components/modals/NewPlaylist";
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import mood1 from '../../images/mood1.png';
import mood2 from '../../images/mood2.png';
import mood3 from '../../images/mood3.jpg';
import mood4 from '../../images/mood4.jpg';
import Sample1 from '../../images/sample1.jpeg';
import Sample2 from '../../images/sample2.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { getFollowedPlaylists } from "../../redux/actions/authActions";
import { getFollowedArtists } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import Link from "next/link";


function MyPlaylists() {
  const [showModal, setShowModal] = useState(false);
  const handleLoading = () => {
    setLoading(true)
  }
  const handleClose = (show) => {
    setShowModal(show)
  }
  return (
    <div className={playlist.myPlaylistWrapper}>
      <div className="fixed-container">
        <h1>My playlists</h1>
        <section className={playlist.myPlaylists}>
          <div className="tilesWrapper">
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={mood1} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                The Least of These Documentary
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={mood2} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Aspire
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={mood3} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Aspire
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={mood4} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Aspire
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={Sample1} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Aspire
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={Sample2} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Aspire
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              {/* <Image src={Sample3} alt="Mood" className="tilesImg"></Image> */}
              <span className="tileOverlayText">
                Aspire
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={anime} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Anime
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={cinemetic} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Cinematic
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={hiphop} alt="Mood" className="tilesImg"></Image>
              <span className="tileOverlayText">
                Hip Hop Pop
                <small className="playlistTracksCount">33 tracks</small>
              </span>
            </a>
          </div>
          <div className={playlist.btnWrapper}>
            <button className="btn btnMainLarge" onClick={() => setShowModal(true)}>New Playlist</button>
          </div>
        </section>
      </div>
      <NewPlaylist showModal={showModal} onCloseModal={handleClose} loading={handleLoading} />
    </div>
  );
}
  
export default withPrivateRoute(MyPlaylists);
