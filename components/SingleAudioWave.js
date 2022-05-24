import { useEffect, useRef, useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Slider } from "react-semantic-ui-range";
import { Segment, Grid, Label, Input } from 'semantic-ui-react';



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
});

export default function CustomAudioWave(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState();

  const url = props.track != undefined ? props.track.file : ""

  const settings = {
    start: 2, min: 0,max: 10,step: 1,
    onChange: function(value) {
      wavesurfer.current.setVolume(value)
    }
  }

  useEffect(() => {
    if (wavesurfer.current == null)
      create();
    if (playing || props.footerPlaying) {
      setTimeout(() => setSeconds(seconds ? (seconds -1) : (props.track ? (props.track.duration - 1) : (props.altVersionTrack.duration - 1))), 1000);
    } else {
      setSeconds(seconds);
    }
    if (wavesurfer.current && props.footerPlaying) {
      wavesurfer.current.play();
    } else if (wavesurfer.current && !props.footerPlaying && !playing){
      wavesurfer.current.pause();
    }
    // wavesurfer.current.playPause();
    // return () => {
    //   if (wavesurfer.current) {
    //     wavesurfer.current.destroy();
    //   }
    // };
  }, [playing, seconds, props.track, props.footerPlaying]);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load("./test.mp3");
  };

  useEffect(() => {
    if (document.getElementsByClassName("play").length > 1)
      document.getElementsByClassName("first")[0].click();
    else if (document.getElementsByClassName("play").length == 1)
      document.getElementsByClassName("play")[0].classList.add('first');
  }, [playing]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

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
          <div className="playPauseBtn" onClick={handlePlayPause}>
            <span className={(playing || props.footerPlaying) ? "play" : "pause"}></span>
          </div>
          <a href="" className="filterName">
            {props.altVersionTrack.title}
          </a>
          <div className="waveTime">
            <div id="waveform" ref={waveformRef}  />
            <div className="durationCount totalDuration">{convertSecToMin(props.altVersionTrack.duration)}</div>
          </div>
        </div>
      </div>
      {/* <div className="versionTrackRow">
        <div className="filterVersion">
          <div className="playPauseBtn" onClick={handlePlayPause}>
            <span className={(playing || props.footerPlaying) ? "play" : "pause"}></span>
          </div>
          <a href="" className="filterName">
            Backing Vocals
          </a>
          <div className="waveTime">
            <div id="waveform" ref={waveformRef}  />
            <div className="durationCount totalDuration">03:43</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
