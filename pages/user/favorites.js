import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import Image from 'next/image';
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import wave from '../../images/sound-wave.png';
import play from '../../images/playWhite.svg';
import pause from '../../images/pause.svg';
import {useState} from "react";
function Favorites() {
  const [type, setType] = useState('songs');

  const handleSelectType = (type) => {
    setType(type);
  }

  return (
    <div className={'userContent '+user.favouritePlaylists}>
      <div className={user.favouriteTabs}>
        <div className={user.tabs}>
          <div onClick={() => handleSelectType('songs')} className={`${user.tab} ${type === 'songs' ? user.active : ''}`}>Songs</div>
          <div onClick={() => handleSelectType('playlists')} className={`${user.tab} ${type === 'playlists' ? user.active : ''}`}>Playlists</div>
        </div>
      </div>
      {type === 'songs'
        ?
        <div className={user.songsWrapper}>
          <div className={user.songsRow+' ' +user.rowHead}>
            <div className={user.songsData+' ' +user.playSection}></div>
            <div className={user.songsData+' ' +user.songsTitle}>title</div>
            <div className={user.songsData+' ' +user.songsArtist}>artist</div>
            <div className={user.songsData+' ' +user.songsWaveform}></div>
            <div className={user.songsData+' ' +user.songsGenres}>genres</div>
            <div className={user.songsData+' ' +user.songsAction}>actions</div>
          </div>
          <div className={user.songsRow+' ' +user.rowBody}>
            <div className={user.songsData+' ' +user.playSection}>
              <span className={user.playbtn}>
                <div className={user.imgwrapper}>
                  <Image src={play} className={user.playIcon} alt="Play Icon"/>
                  {/* <Image src={pause} className={user.pauseIcon} alt="Pause Icon"/> */}
                </div>
              </span>
            </div>
            <div className={user.songsData+' ' +user.songsTitle+' ' +user.featuredItem}>
              <span>next generation</span>
            </div>
            <div className={user.songsData+' ' +user.songsArtist}>just fiction</div>
            <div className={user.songsData+' ' +user.songsWaveform}>
              <Image src={wave} alt="Sound Wave"/>
            </div>
            <div className={user.songsData+' ' +user.songsGenres}>pop</div>
            <div className={user.songsData+' ' +user.songsAction}>actions</div>
          </div>
          <div className={user.songsRow+' ' +user.rowBody}>
            <div className={user.songsData+' ' +user.playSection}>
              <span className={user.playbtn}>
                <div className={user.imgwrapper}>
                  <Image src={play} className={user.playIcon} alt="Play Icon"/>
                  {/* <Image src={pause} className={user.pauseIcon} alt="Pause Icon"/> */}
                </div>
              </span>
            </div>
            <div className={user.songsData+' ' +user.songsTitle+' ' +user.featuredItem}>
              <span>next generation</span>
            </div>
            <div className={user.songsData+' ' +user.songsArtist}>just fiction</div>
            <div className={user.songsData+' ' +user.songsWaveform}>
              <Image src={wave} alt="Sound Wave"/>
            </div>
            <div className={user.songsData+' ' +user.songsGenres}>pop</div>
            <div className={user.songsData+' ' +user.songsAction}>actions</div>
          </div>
        </div>
        :
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
      }
    </div>
  );
}

export default withPrivateRoute(Favorites);