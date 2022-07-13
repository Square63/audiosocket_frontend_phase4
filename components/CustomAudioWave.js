import { useEffect, useRef, useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Slider } from "react-semantic-ui-range";
import { Grid } from 'semantic-ui-react';
import InpageLoader from "./InpageLoader";

const formWaveSurferOptions = (ref, footer) => (
  !footer ? {
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
    partialRender: true,
    pixelRatio: 1,
    hideScrollbar: true
  } :
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
    partialRender: true,
    pixelRatio: 1,
    hideScrollbar: true
  }
);

export default function CustomAudioWave(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState();
  const [rowSeconds, setRowSeconds] = useState();
  const [footer, setFooter] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [peaks, setPeaks] = useState([]);
  const url = props.track.mp3_file_compressed? props.track.mp3_file_compressed : "./test.mp3"

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
  }, []);

  useEffect(() => {
    if (props.footerPlaying) {
      setTimeout(() => setSeconds(seconds ? (seconds -1) : (30 - 1)), 1000);
    } else {
      setSeconds(seconds);
    }

    if (wavesurfer.current && props.footerPlaying) {
      wavesurfer.current.play();
    } else if (wavesurfer.current && !localStorage.getItem('playing')){
      wavesurfer.current.pause();
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.pause();
      }
    };
  }, [seconds]);

  useEffect(() => {
    if (props.footerTrack) {
      wavesurfer.current.destroy();
      footerCreate(props.footerTrack.file)
    }
  }, [props.footerTrack]);

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
      document.getElementsByClassName(wavesurfer.current.container.classList[0])[0].parentElement.parentElement.parentElement.nextElementSibling.children[0].childNodes[0].childNodes[0].click();
    setPlaying(!playing)
  });

  function handlePlayPause() {
    setPlaying(!playing)
    wavesurfer.current?.playPause();
  };

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      return minutes+':'+parseInt(seconds)
    }
  }

  const create = async (url, peaks) => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current, props.footer);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url, peaks);
    setIsLoading(false);
  };

  const footerCreate = async (url) => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current, true);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(url);
    wavesurfer.current.play();
  };

  return (
    !props.footer ?
      (<>
        <div className="rowParticipant artistName">
          {isLoading ?
            <InpageLoader /> :
            <div className="playPauseBtn" onClick={() => { handlePlayPause(); props.handleFooterTrack && props.handleFooterTrack(props.track);}} >
              <span className={(playing) ? "play" + ' ' +props.track.id : "pause" + ' ' +props.track.id}></span>
              <span className="pause d-none"></span>
            </div>
          }
          <div className="aboutSong">
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
              <a href="javascript:void(0)" className={`${props.notClickable ? "notClickable" : ""}`}onClick={() => props.handleTrackSearchOfArtist(props.track.artist_id, props.track.artist_name)}>
                {props.track.artist_name}
              </a>
            </div>}
          </div>
        </div>
        <div className="rowParticipant audioWave">
          <div id="waveform" ref={waveformRef} className={props.track.id}  />
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
          <a href="javascript:void(0)" className="SongName">Saving</a>
          <a href="javascript:void(0)" className="SongArtist">Justin G. Marcellus</a>
        </div>
        <div className="playPauseBtn" onClick={() => {handlePlayPause(); props.handleFooterTrack(props.track);}}>
          <span className={(props.footerPlaying) ? "play" : "pause"}></span>
        </div>
        <div className="waveWithDuration">
          <div className="durationCount durationObtained">{convertSecToMin(seconds)}</div>
          <div id="waveform" ref={waveformRef}  />
          <div className="durationCount totalDuration">{props.track ? convertSecToMin(props.track.duration) : "0:0"}</div>
        </div>
        <div className="volumeBarWrapper">
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
                <Slider discrete color="red" inverted={false} settings={settings}/>
              </Grid.Column>
            </Grid>
          </div>
        </div>
        <button className="btn btnMainLarge">Add to Cart</button>
      </div>
    </>)
  )
}
