import { useRouter } from "next/router";
import { Form, Button, FormGroup, FormControl, Tabs, Tab, TabContainer, TabContent, TabPane } from "react-bootstrap";
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


function creatorKits() {
  return (
    <div className={playlist.creatorKits}>
      <div className={playlist.playlistBanner}>
        <div className="themeBreadcrumb">
          <div className="fixed-container">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Playlists</Breadcrumb.Item>
              <Breadcrumb.Item href="#">Creator Kits</Breadcrumb.Item>
              <Breadcrumb.Item active>Action</Breadcrumb.Item>
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
                  <div className={playlist.PlaylistName}>Creator Kits - Action</div>
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
          <Tabs defaultActiveKey="tracks" id="uncontrolled-tab-example">
            <Tab eventKey="tracks" title="Tracks">
              <p>lorem 50</p>
            </Tab>
            <Tab eventKey="sfx" title="SFX">
            <p>lorem 51</p>
            </Tab>
            <Tab eventKey="soundDesign" title="Sound Design">
            <p>lorem 52</p>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default creatorKits;
