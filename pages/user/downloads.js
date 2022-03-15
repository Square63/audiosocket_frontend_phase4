import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import {useState} from "react";

function Downloads() {
  return (
    <div className={user.downloadListing}>
      <div className={user.listingWrapper}>
        <div className={user.listingHeading}>
          <h2>Downloads</h2>
          <p>If you need to License tracks that you downloaded, please add the name of your Work and click “License Track”.</p>
        </div>
        <div className="trackRowWrapper">
          <div className="trackRow headingRow">
            <div className="rowParticipant artistName">
              Title / Artist
              <span className="sortingMedium">
                <a href="" className="decending"></a>
                <a href="" className="ascending"></a>
              </span>
            </div>
            <div className={user.workTitle+' rowParticipant'}>
              Work Title
            </div>
            <div className={user.licenseBtn+' rowParticipant'}>
              License
            </div>
            <div className={user.downloadDate+' rowParticipant'}>
              Download Date
              <span className="sortingMedium">
                <a href="" className="decending"></a>
                <a href="" className="ascending"></a>
              </span>
            </div>
            <div className="rowParticipant controls"></div>
          </div>

          <div className="trackRow">
            <div className="rowParticipant artistName">
              <div className="playPauseBtn">
                <span className="play d-none"></span>
                <span className="pause"></span>
              </div>
              <div className="aboutSong">
                <div className="songData">
                  <a href="" className="songName">saving</a>
                </div>
                <div className="songArtist">
                  <a href="" className="noTextLine">
                    Justin G. Marcellus Abady
                  </a>
                </div>
              </div>
            </div>
            <div className={user.workTitle+' rowParticipant'}>
              <Form>
                <Form.Control type="text" placeholder="Enter work title…" />
              </Form>
            </div>
            <div className={user.licenseBtn+' rowParticipant'}>
              <button variant="link" className="btn btnMainSmall">License Track</button>
            </div>
            <div className={user.downloadDate+' rowParticipant'}>
              Nov 4, 2021
            </div>
            <div className="rowParticipant controls">
              <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                <a href="javascript:void(0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g id="Actions" transform="translate(-1050 -29.5)">
                    <g id="icon-trashcan" transform="translate(772 -3264.5)">
                      <path id="Shape_1765" data-name="Shape 1765" d="M299,3298.5l-1.812,17.209a2,2,0,0,1-1.988,1.791H284.8a2,2,0,0,1-1.989-1.791L281,3298.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h23" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3298.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v3" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1769" data-name="Shape 1769" d="M294.5,3303l-.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    </g>
                  </g>
                </svg>
                </a>
              </OverlayTrigger>
            </div>
          </div>

          <div className="trackRow">
            <div className="rowParticipant artistName">
              <div className="playPauseBtn">
                <span className="play d-none"></span>
                <span className="pause"></span>
              </div>
              <div className="aboutSong">
                <div className="songData">
                  <a href="" className="songName">saving</a>
                </div>
                <div className="songArtist">
                  <a href="" className="noTextLine">
                    Justin G. Marcellus Abady
                  </a>
                </div>
              </div>
            </div>
            <div className={user.workTitle+' rowParticipant'}>
              <Form>
                <Form.Control type="text" placeholder="Enter work title…" />
              </Form>
            </div>
            <div className={user.licenseBtn+' rowParticipant'}>
              <button variant="link" className="btn btnMainSmall">License Track</button>
            </div>
            <div className={user.downloadDate+' rowParticipant'}>
              Nov 4, 2021
            </div>
            <div className="rowParticipant controls">
              <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                <a href="javascript:void(0)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <g id="Actions" transform="translate(-1050 -29.5)">
                    <g id="icon-trashcan" transform="translate(772 -3264.5)">
                      <path id="Shape_1765" data-name="Shape 1765" d="M299,3298.5l-1.812,17.209a2,2,0,0,1-1.988,1.791H284.8a2,2,0,0,1-1.989-1.791L281,3298.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h23" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3298.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v3" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1769" data-name="Shape 1769" d="M294.5,3303l-.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    </g>
                  </g>
                </svg>
                </a>
              </OverlayTrigger>
            </div>
          </div>

          <div className="trackRow">
            <div className="rowParticipant artistName">
              <div className="playPauseBtn">
                <span className="play d-none"></span>
                <span className="pause"></span>
              </div>
              <div className="aboutSong">
                <div className="songData">
                  <a href="" className="songName">saving</a>
                </div>
                <div className="songArtist">
                  <a href="" className="noTextLine">
                    Justin G. Marcellus Abady
                  </a>
                </div>
              </div>
            </div>
            <div className={user.workTitle+' rowParticipant'}>
              <Form>
                <Form.Control type="text" placeholder="Enter work title…" />
              </Form>
            </div>
            <div className={user.licenseBtn+' rowParticipant'}>
              <button variant="link" className="btn btnMainSmall">License Track</button>
            </div>
            <div className={user.downloadDate+' rowParticipant'}>
              Nov 4, 2021
            </div>
            <div className="rowParticipant controls">
              <OverlayTrigger overlay={<Tooltip>Remove</Tooltip>}>
                <a href="javascript:void(0)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="Actions" transform="translate(-1050 -29.5)">
                      <g id="icon-trashcan" transform="translate(772 -3264.5)">
                        <path id="Shape_1765" data-name="Shape 1765" d="M299,3298.5l-1.812,17.209a2,2,0,0,1-1.988,1.791H284.8a2,2,0,0,1-1.989-1.791L281,3298.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h23" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3298.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v3" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1769" data-name="Shape 1769" d="M294.5,3303l-.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      </g>
                    </g>
                  </svg>
                </a>
              </OverlayTrigger>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default withPrivateRoute(Downloads);