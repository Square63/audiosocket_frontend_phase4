import { useEffect, useRef, useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Slider } from "react-semantic-ui-range";
import 'semantic-ui-css/semantic.min.css';
import { Segment, Grid, Label, Input } from 'semantic-ui-react';



const formWaveSurferOptions = (ref) => ({
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
      setTimeout(() => setSeconds(seconds ? (seconds -1) : (props.track.duration - 1)), 1000);
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

    if (props.track)
      wavesurfer.current.load("./test.mp3");
  };

  const handlePlayPause = () => {
    setPlaying(!playing); 
    wavesurfer.current.playPause();
  };

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      return minutes+':'+parseInt(seconds)
    }
  }


  return (
    <>
			<div id="waveform" ref={waveformRef}  />
      <div>{props.track ? convertSecToMin(props.track.duration) : "0:0"}</div>
      <div>{convertSecToMin(seconds)}</div>
			<div className="playPauseBtn" onClick={handlePlayPause}>
				<span className={(playing || props.footerPlaying) ? "play" : "pause"}></span>
				<span className="pause d-none"></span>
			</div>
      
      <Grid>
        <Grid.Column width={2}>
          <Slider discrete color="red" inverted={false} settings={settings}/>
        </Grid.Column>
      </Grid>
      
    </>
  );
}
