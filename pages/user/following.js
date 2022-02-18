import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import mood1 from '../../images/mood1.png';
import mood2 from '../../images/mood2.png';
import mood3 from '../../images/mood3.jpg';
import mood4 from '../../images/mood4.jpg';
import Sample1 from '../../images/sample1.jpeg';
import Sample2 from '../../images/sample2.jpeg';
import Sample3 from '../../images/sample3.jpeg';

function Following() {
  return (
    <div className={user.followingPlaylist}>
      <div className={user.listingWrapper}>
        <div className={user.listingHeading}>
          <h2>Followed Playlists</h2>
        </div>
        <div className="tilesWrapper">
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood1} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood2} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood3} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood4} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={Sample1} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={Sample2} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={Sample3} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={anime} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Anime</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={cinemetic} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Cinematic</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={hiphop} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Hip Hop Pop</span>
          </a>
        </div>

        <div className={user.listingHeading+' mt-5'}>
          <h2>Followed Artists</h2>
        </div>
        <div className="tilesWrapper">
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood1} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood2} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood3} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={mood4} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={Sample1} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={Sample2} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={Sample3} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Aspire</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={anime} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Anime</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={cinemetic} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Cinematic</span>
          </a>
          <a href="javascript:void(0)" className="tileOverlay">
            <Image src={hiphop} alt="Mood" className="tilesImg"></Image>
            <span className="tileOverlayText">Hip Hop Pop</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default withPrivateRoute(Following);