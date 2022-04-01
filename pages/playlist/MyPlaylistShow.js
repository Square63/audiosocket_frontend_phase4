import { useRouter } from "next/router";
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import Image from 'next/image';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import playlist from "../../styles/Playlist.module.scss";
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import mood1 from '../../images/mood1.png';
import mood2 from '../../images/mood2.png';
import mood3 from '../../images/mood3.jpg';
import mood4 from '../../images/mood4.jpg';
import Sample1 from '../../images/sample1.jpeg';
import Sample2 from '../../images/sample2.jpeg';

function MyPlaylistShow() {
  return (
    <div className={playlist.myPlaylistShow}>
      <div className={playlist.playlistBanner}>
        <div className="themeBreadcrumb">
          <div className="fixed-container">
            <Breadcrumb>
              <Breadcrumb.Item href="#">My Playlists</Breadcrumb.Item>
              <Breadcrumb.Item active>Egg Promo Video</Breadcrumb.Item>
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
                  <div className={playlist.PlaylistName}>Aim to Inspire</div>
                  <div className={playlist.createdBy}>
                    Created by: <span>Audiosocket</span>
                  </div>
                </div>
                <div className={playlist.playlistStats}>
                  <div className={playlist.tracksCount}>
                    71 Tracks
                  </div>
                  <div className={playlist.tracksDuration}>
                    Duration: <span>03:34:20</span>
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
    </div>
  );
}

export default MyPlaylistShow;