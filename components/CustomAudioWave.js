import { useEffect, useRef, useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Slider } from "react-semantic-ui-range";
import {Grid} from 'semantic-ui-react'
import MultiCanvas from "wavesurfer.js"
import $ from 'jquery';

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
    partialRender: true
  }
);

const footerFormWaveSurferOptions = (ref) => (
  {
    container: ref,
    waveColor: "#CDD2DA",
    progressColor: "#C1D72E",
    cursorColor: "",
    cursorWidth: 0,
    barWidth: 3,
    barRadius: 0,
    responsive: true,
    barHeight: 47,
    height: 50,
    barGap: 1,
    normalize: true,
    partialRender: true
  }
);

export default function CustomAudioWave(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const lastwavesurfer = useRef(null);
  const footerwaveformRef = useRef(null);
  const footerwavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [footer, setFooter] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [peaks, setPeaks] = useState([]);
  const [seconds, setSeconds] = useState(false)
  const url = props.track ? props.track.mp3_file_compressed : '';
 
  const settings = {
    start: 0.4, min: 0,max: 1,step: 0.2,

    onChange: function(value) {
      setVolume(value)
    }
  }

  useEffect(() => {
    if (props.track) {
      getJson(props.track, "row")
    }
  });

  const getJson = async (track, type) => {
    const data = await fetch(track.audio_peak.file, {
      headers: {
        accept : "application/json"
      }
    })
    .then(response => {
      return response.json()
    })
    .then(peaks => {
      if (type == "row" && wavesurfer.current == null) {
        create(url, peaks.data);
      } else if (type == "footer") {
        footerwavesurfer.current.load(track.mp3_file_compressed, peaks.data);
        wavesurfer.current.pause()
        footerwavesurfer.current.pause();
        wavesurfer.current.playPause()
        footerwavesurfer.current.playPause();
        setPlaying(!playing)
      }
      else if (type == "last"){
        lastwavesurfer.current.load(track.mp3_file_compressed, peaks.data);
      }
      setPeaks(peaks.data)
    })
  }

  useEffect(() => {
    if (document.getElementsByClassName("play").length > 1) {
      clearLastPlaying(document.getElementsByClassName("first")[0].id)
      document.getElementsByClassName("first")[0].click();
      document.getElementById("footerPlayPause").classList.remove("footerPause")
      document.getElementById("footerPlayPause").classList.add("footerPlay")
    }
    else if (document.getElementsByClassName("play").length == 1) {
      document.getElementsByClassName("play")[0].classList.add('first');
      document.getElementById("footerPlayPause").classList.remove("footerPause")
      document.getElementById("footerPlayPause").classList.add("footerPlay")
    }
    
  }, [playing]);

  wavesurfer.current?.on('audioprocess', function() {
    if (wavesurfer.current.isPlaying()) {
      let totalTime = wavesurfer.current.getDuration(),
        currentTime = wavesurfer.current.getCurrentTime(),
        remainingTime = totalTime - currentTime;
      document.getElementsByClassName('totalDuration')[0].innerText = convertSecToMin(totalTime.toFixed(1));
      document.getElementsByClassName('durationObtained')[0].innerText = convertSecToMin(remainingTime.toFixed(1));
    }
  });

  const handlePlayPause = (id) => {
    if(id && id !== localStorage.getItem("playing_track_id")) {
      localStorage.setItem("last_playing_track_id", localStorage.getItem("playing_track_id"))
      localStorage.setItem("playing_track_id", id)
    }
    footerCreate(props.track)
  };

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      return minutes+':'+parseInt(seconds)
    }
  }

  const create = async (url, peaks) => {
    const options = formWaveSurferOptions(waveformRef.current ? waveformRef.current : footerwaveformRef.current);
    wavesurfer.current = MultiCanvas.create(options);
    url && wavesurfer.current.load(url, peaks);
  };

  const footerCreate = async (track) => {
    if (footerwaveformRef.current == null) {
      document.getElementById("footerPlayPause").classList.remove("footerPlay")
      document.getElementById("footerPlayPause").classList.add("footerPause")
      document.getElementById("footerwaveform").innerHTML = ''

      footerwaveformRef.current = document.getElementById("footerwaveform")
      const options = footerFormWaveSurferOptions(footerwaveformRef.current);
      footerwavesurfer.current = MultiCanvas.create(options);
      getJson(track, "footer")
      document.getElementsByClassName("SongArtist")[0].innerHTML = track.artist_name

    } else {
      if (wavesurfer.current?.isPlaying()) {
        document.getElementById("footerPlayPause").classList.remove("footerPlay")
        document.getElementById("footerPlayPause").classList.add("footerPause")
        // document.getElementsByClassName("first")[0]?.click();
        wavesurfer.current.pause()
        footerwavesurfer.current?.pause();
      }
      else if(document.getElementsByClassName("play").length == 1){
        document.getElementsByClassName("first")[0]?.click();
      }
      else {
        document.getElementById(localStorage.getItem("playing_track_id")).click();
        wavesurfer.current?.play()
        footerwavesurfer.current?.play();
      }
      setPlaying(!playing)
    }
    
  };

  const clearLastPlaying = (id) => {
    let track = props.tracks.filter(track => track.id == id)[0]
    document.getElementsByClassName(id)[0].innerHTML = ''

    document.getElementsByClassName(id)[0]
    const options = formWaveSurferOptions(document.getElementsByClassName(id)[0]);
    lastwavesurfer.current = MultiCanvas.create(options);
    
    getJson(track, "last")
  }

  return (
    !props.footer ?
      (<>
        <div className="rowParticipant artistName">
          <div className="playPauseBtn" onClick={() => { handlePlayPause(props.track.id); props.handleFooterTrack && props.handleFooterTrack(props.track);}} >
            <span id={props.track.id} className={(playing) ? "play" : "pause"}></span>
            <span className="pause d-none"></span>
          </div>
          {props.track && <div className="aboutSong">
            <div className="songData">
              <OverlayTrigger overlay={<Tooltip>{props.track.title}</Tooltip>}>
                <a href="javascript:void(0)" className="songName defaultCursor">{props.track.title}</a>
              </OverlayTrigger>
              {props.track.featured &&
                <>
                  <OverlayTrigger overlay={<Tooltip>Featured</Tooltip>}>
                    <a href="" className={`fire ${props.notClickable ? "notClickable" : ""}`}></a>
                  </OverlayTrigger>
                </>
              }
            </div>
            {props.track.artist_name && <div className="songArtist">
              <a href="javascript:void(0)" className={`${props.notClickable ? "notClickable" : ""}`} onClick={() => props.handleTrackSearchOfArtist(props.track.artist_id, props.track.artist_name)}>
                {props.track.artist_name}
              </a>
            </div>}
          </div>}
        </div>
        <div className="rowParticipant audioWave">
          <div id="waveform" ref={waveformRef} className={props.track.id} />
          <div className="PlayerControls">
            <div className="startStopBtn">
              {/* {<SingleAudioWave/>} */}
              {!playing ? "Play" : "Pause"}
              <span className="playSong">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17">
                  <rect id="Rectangle_134" data-name="Rectangle 134" width="5" height="17" fill="#1a1c1d"/>
                  <rect id="Rectangle_135" data-name="Rectangle 135" width="5" height="17" transform="translate(8)" fill="#1a1c1d"/>
                </svg>
              </span>
              <span className="pauseSong d-none"></span>
            </div>
          </div>
        </div>
      </>)
    :
    (<>
      <div className="stickyMiniPlayerInner">
        <div className="songsStuff">
          {props.footertrack && <a href="javascript:void(0)" className="SongName">{props.footertrack.title}</a>}
          <a href="javascript:void(0)" className="SongArtist"></a>
        </div>
        <div className="playPauseBtn" onClick={() => {handlePlayPause(); props.handleFooterTrack(props.track);}}>
          <div id="footerPlayPause" className="footerPause"></div>
        </div>
        <div className="waveWithDuration">
          <div className="durationCount durationObtained">{convertSecToMin(seconds)}</div>
          <div id="footerwaveform" ref={footerwaveformRef}/>
          <div className="durationCount totalDuration">{props.track ? convertSecToMin(props.track.duration) : "0:0"}</div>
        </div>
        {/* <div className="volumeBarWrapper">
          <div className="volumeBar">
            <svg xmlns="http://www.w3.org/2000/svg" width="19.368" height="18.115" viewBox="0 0 19.368 18.115">
              <g id="Group_204" data-name="Group 204" transform="translate(0.5 0.513)">
                <g id="volume-control-medium">
                  <path id="Shape_1295" data-name="Shape 1295" d="M249.112,2175.109h-3.218a1.379,1.379,0,0,0-1.379,1.379v2.759a1.379,1.379,0,0,0,1.379,1.379h3.218l5.652,5.651a.46.46,0,0,0,.784-.325v-16.17a.46.46,0,0,0-.784-.325Z" transform="translate(-244.515 -2169.323)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                  <path id="Shape_1296" data-name="Shape 1296" d="M261.515,2172.614a6.93,6.93,0,0,1,0,11.034" transform="translate(-245.884 -2169.588)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                  <path id="Shape_1297" data-name="Shape 1297" d="M259.515,2175.114c2.462,1.79,2.454,4.652,0,6.436" transform="translate(-245.723 -2169.79)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                </g>
              </g>
            </svg>

            <Grid>
              <Grid.Column width={100}>
                <Slider discrete color="red" inverted={false} ref={footerwaveformRef} settings={settings} />
              </Grid.Column>
            </Grid>
          </div>
        </div> */}
        {/* <button className="btn btnMainLarge">Add to Cart</button> */}
      </div>
    </>)
  )
}
