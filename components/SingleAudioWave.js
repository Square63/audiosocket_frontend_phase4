import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import InpageLoader from "./InpageLoader";
import ShareModal from "./modals/ShareModal";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#CED2D9",
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
  hideScrollbar: true,
  backend: 'MediaElement'
});

export default function CustomAudioWave(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState();
  const [rowSeconds, setRowSeconds] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [peaks, setPeaks] = useState([]);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareId, setShareId] = useState(null);
  let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
  const url = isSafari ? props.track.mp3_file_compressed : props.track.opus_file

  const settings = {
    start: 2, min: 0,max: 10,step: 1,
    onChange: function(value) {
      wavesurfer.current.setVolume(value)
    }
  }

  useEffect(() => {
    const getJson = async () => {
      const data = await fetch(props.track.audio_peak?.file, {
        headers: {
          accept : "application/json"
        }
      })
      .then(response => {
        return response.json()
      })
      .then(peaks => {
        if (wavesurfer.current == null)
          create(url, peaks.data);
        setPeaks(peaks.data)
      })
    }

    getJson()

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.pause();
      }
    };
  }, []);


  const create = async (url, peaks) => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url, peaks);
    setIsLoading(false);

  };

  useEffect(() => {
    if (document.getElementsByClassName("play").length > 1)
      document.getElementsByClassName("first")[0]?.click();
    else if (document.getElementsByClassName("play").length == 1)
      document.getElementsByClassName("play")[0].classList.add('first');
  }, [playing]);

  wavesurfer.current?.on('ready', function() {
    if ((document.getElementsByClassName("play").length == 0) || (document.getElementsByClassName("play").length == 1 && !document.getElementsByClassName("play")[0].classList.contains(wavesurfer.current.container.classList)))
      wavesurfer.current.pause();
  });

  wavesurfer.current?.on('finish', function() {
    document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].classList.remove("play")
    document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].classList.remove("first")
    document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].classList.add("pause")
    if (document.getElementsByClassName("play").length != 1)
      document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling?.children[0]?.childNodes[0]?.childNodes[0]?.childNodes[0]?.click();
    setPlaying(!playing)
  });

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  function handleShareModalClose() {
    setShowShareModal(false)
  }

  function handleShareId(id) {
    setShareId(id);
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

  return (
    <div className="versionTrackBody">
      <div className="versionTrackRow">
        <div className="filterVersion">
          <div className="altVerArtist">
            {isLoading ?
              <InpageLoader /> :
              <div className="playPauseBtn" onClick={handlePlayPause}>
                <span className={(playing) ? "play" + ' ' +props.track.id+'alt' : "pause" + ' ' +props.track.id+'alt'}></span>
              </div>
            }
            <a href="" className="filterName">
              {props.track.title}
            </a>
          </div>
          <div className="waveTime">
            <div id="waveform" ref={waveformRef} className={props.track.id+'alt'} />
          </div>
          <div className="durationCount totalDuration">{convertSecToMin(props.track.duration)}</div>
          <div className="rowParticipant mood">{props.moodColumn}</div>
          <div className="rowParticipant BPM">
            {props.track.bpm}
          </div>
          <div className="rowParticipant controls">
            <OverlayTrigger overlay={<Tooltip>Similar Search</Tooltip>}>
              <a onClick={() => props.handleSimilarSearch(props.track.title, props.track.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26.536" height="26.536" viewBox="0 0 26.536 26.536">
                  <g id="icon-like-tracks" transform="translate(0.5 0.5)">
                    <path id="Path_1" data-name="Path 1" d="M310.243,311.623a10.621,10.621,0,1,0-10.621,10.62A10.623,10.623,0,0,0,310.243,311.623Z" transform="translate(-289 -301)" fill="transparent" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    <line id="Line_2" data-name="Line 2" x2="7.706" y2="6.672" transform="translate(17.624 18.659)" fill="none" stroke="#6e7377" strokLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    <g id="Icon_-_Mag-note" data-name="Icon - Mag-note" transform="translate(5.818 5.227)">
                      <path id="Shape_1577" data-name="Shape 1577" d="M244.306,2627.369c0,1.034-1.241,1.871-2.773,1.871s-2.773-.837-2.773-1.871,1.241-1.87,2.773-1.87S244.306,2626.334,244.306,2627.369Z" transform="translate(-238.759 -2618.826)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2622.028v-7.518a1.109,1.109,0,0,1,1.664-.963l2.219,1.27" transform="translate(-243.228 -2613.398)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    </g>
                  </g>
                </svg>
              </a>
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip>{props.favoriteTrackIds?.includes(props.track.id) ? "Remove from Favourites" : "Add to Favourites"}</Tooltip>}>
              <a onClick={(e) => props.handleAddToFavorites(e, props.track.id)} className={props.tracksMeta ? (props.tracksMeta.favorite_tracks_ids ? ((props.tracksMeta.favorite_tracks_ids.includes(props.track.id) || props.favoriteTrackIds.includes(props.track.id)) ? "controlActive" : "") : "") : ""}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22.93" height="20.303" viewBox="0 0 22.93 20.303">
                  <g id="icon-add-to-favorites" transform="translate(0.619 0.513)">
                    <path id="Shape_185" data-name="Shape 185" d="M181.253,573.9l-7.07-7.281a5.369,5.369,0,0,1-1.031-6.258h0a5.532,5.532,0,0,1,8.8-1.409l1.516,1.382,1.516-1.382a5.532,5.532,0,0,1,8.8,1.409h0a5.36,5.36,0,0,1,.182,4.452" transform="translate(-172.573 -557.365)" fill="transparent" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    <path id="Oval_11" data-name="Oval 11" d="M189.254,577.1a5.683,5.683,0,1,0-5.684-5.683A5.683,5.683,0,0,0,189.254,577.1Z" transform="translate(-173.153 -557.807)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73v5.684" transform="translate(-173.469 -557.965)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    <path id="Shape_187" data-name="Shape 187" d="M192.254,571.73h-5.683" transform="translate(-173.311 -558.123)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                  </g>
                </svg>
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Download Track</Tooltip>}>
              <a onClick={() => {props.showDownloadModal(props.track, "altVersion");}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
                  <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                    <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                    <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                  </g>
                </svg>
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Add to Cart</Tooltip>}>
              <a onClick={() => {props.showAddTrackToCartLicenseModal(props.track, "altVersion")}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22.994" height="23.024" viewBox="0 0 17.994 17.024">
                  <g id="icon-cart" transform="translate(0.5 0.5)">
                    <g id="Group_155" data-name="Group 155" transform="translate(0)">
                      <g id="shopping-cart-add">
                        <path id="Oval_67" data-name="Oval 67" d="M255.607,1411.542a1.047,1.047,0,1,0-1.108-1.045A1.078,1.078,0,0,0,255.607,1411.542Z" transform="translate(-250.067 -1397.608)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"/>
                        <path id="Shape_1172" data-name="Shape 1172" d="M248.5,1392.452h2a.732.732,0,0,1,.72.537l2.822,11.306H257" transform="translate(-248.5 -1392.452)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"/>
                        <path id="Shape_1173" data-name="Shape 1173" d="M265.656,1401.62l.8-2.251a.663.663,0,0,0-.1-.628.753.753,0,0,0-.6-.289H253.412" transform="translate(-249.783 -1394.272)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"/>
                        <path id="Shape_1174" data-name="Shape 1174" d="M255.293,1406.452h3.459" transform="translate(-250.274 -1396.698)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"/>
                        <path id="Oval_68" data-name="Oval 68" d="M265.2,1412.419a3.489,3.489,0,1,0-3.694-3.483A3.594,3.594,0,0,0,265.2,1412.419Z" transform="translate(-251.895 -1396.395)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"/>
                        <path id="Shape_1175" data-name="Shape 1175" d="M266.5,1408.452v2.787" transform="translate(-253.201 -1397.305)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"/>
                        <path id="Shape_1176" data-name="Shape 1176" d="M264.5,1410.452h2.955" transform="translate(-252.679 -1397.912)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"/>
                      </g>
                    </g>
                  </g>
                </svg>
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Add to Playlist</Tooltip>}>
              <a onClick={() => props.showTrackAddToPlaylistModal(props.track, "altVersion")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29.249" height="29.25" viewBox="0 0 29.249 29.25">
                  <g id="icon-add-to-playlist" transform="translate(0.5 0.5)">
                    <g id="Group_165" data-name="Group 165" transform="translate(0)">
                      <g id="playlist-add">
                        <path id="Shape_1147" data-name="Shape 1147" d="M217.112,1936.624v-12.282a1.228,1.228,0,0,0-1.228-1.229H196.232a1.227,1.227,0,0,0-1.228,1.229v19.652a1.228,1.228,0,0,0,1.228,1.228h12.282" transform="translate(-195.004 -1923.114)" fill="transparent" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Oval_187" data-name="Oval 187" d="M206.846,1936.8a1.842,1.842,0,1,0-1.842-1.842A1.843,1.843,0,0,0,206.846,1936.8Z" transform="translate(-192.722 -1920.831)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Oval_188" data-name="Oval 188" d="M199.846,1937.8a1.843,1.843,0,1,0-1.842-1.842A1.843,1.843,0,0,0,199.846,1937.8Z" transform="translate(-194.319 -1920.603)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1148" data-name="Shape 1148" d="M201,1937.484v-7.057a1.229,1.229,0,0,1,.891-1.18l6.141-1.755a1.228,1.228,0,0,1,1.566,1.182v7.583" transform="translate(-193.635 -1922.126)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Oval_189" data-name="Oval 189" d="M214.145,1948.4a6.141,6.141,0,1,0-6.141-6.141A6.142,6.142,0,0,0,214.145,1948.4Z" transform="translate(-192.037 -1920.147)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1149" data-name="Shape 1149" d="M213,1939.114v4.913" transform="translate(-190.896 -1919.462)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <path id="Shape_1150" data-name="Shape 1150" d="M211,1941.114h4.913" transform="translate(-191.352 -1919.006)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                      </g>
                    </g>
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
                { ((localStorage?.getItem('user')) && (props.followedArtists?.includes(props.track.artist_id))) ?
                (<Dropdown.Item>
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
                  <span onClick={() => {props.handleUnfollowArtist(props.track)}}>Unfollow Artist</span>
                </Dropdown.Item>) : (localStorage?.getItem('user')) ?
                (<Dropdown.Item>
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
                  <span onClick={() => {props.handleFollowArtist(props.track)}}>Follow Artist</span>
                </Dropdown.Item>) : ""}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <ShareModal showModal={showShareModal} onCloseModal={handleShareModalClose} shareId={shareId} />
    </div>
  );
}
