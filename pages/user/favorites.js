import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import Image from 'next/image';
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';

function Favorites() {
  return (
    <div className={'userContent '+user.favouritePlaylists}>
      <div className={user.followingWrapper}>
        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
            <Image src={anime} alt="anime"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>anime</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>follow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
            <Image src={cinemetic} alt="Card Image"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>cinemetic</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>unfollow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
            <Image src={hiphop} alt="Card Image"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>hiphop</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>follow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
          <Image src={cinemetic} alt="Card Image"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>cinemetic</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>unfollow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
          <Image src={hiphop} alt="Card Image"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>hiphop</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>follow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
          <Image src={cinemetic} alt="Card Image"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>cinemetic</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>unfollow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
          <Image src={hiphop} alt="Card Image"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>hiphop</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>follow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
            <Image src={anime} alt="anime"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>anime</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>unfollow</a>
        </div>

        <div className={user.followingColumn}>
          <div className={user.imgOverlayText}>
          <Image src={hiphop} alt="Card Image"/>
            <div className={user.overlayText}>
              <span className={user.playlistName}>hiphop</span>
            </div>
          </div>
          <a href="" className={user.favouritesCardTitle}>follow</a>
        </div>
      </div>
    </div>
  );
}

export default withPrivateRoute(Favorites);