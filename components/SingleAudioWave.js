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
  barWidth: 3,
  barRadius: 0,
  responsive: true,
  barHeight: 47,
  height: 50,
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
    
    <div className="stickyMiniPlayerInner">
			<div className="songsStuff">
        <a href="javascript:void(0)" className="SongName">Saving</a>
        <a href="javascript:void(0)" className="SongArtist">Justin G. Marcellus</a>
      </div>
			<div className="playPauseBtn" onClick={handlePlayPause}>
        <span className={(playing || props.footerPlaying) ? "play" : "pause"}></span>
			</div>
      <div className="waveWithDuration">
        <div className="durationCount durationObtained">02:21</div>
        <div id="waveform" ref={waveformRef}  />
        <div className="durationCount totalDuration">03:43</div>
      </div>
      <div className="volumeBarWrapper">
        <div className="volumeBar">
          <svg xmlns="http://www.w3.org/2000/svg" width="19.368" height="18.115" viewBox="0 0 19.368 18.115">
            <g id="Group_204" data-name="Group 204" transform="translate(0.5 0.513)">
              <g id="volume-control-medium">
                <path id="Shape_1295" data-name="Shape 1295" d="M249.112,2175.109h-3.218a1.379,1.379,0,0,0-1.379,1.379v2.759a1.379,1.379,0,0,0,1.379,1.379h3.218l5.652,5.651a.46.46,0,0,0,.784-.325v-16.17a.46.46,0,0,0-.784-.325Z" transform="translate(-244.515 -2169.323)" fill="none" stroke="#1a1c1d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                <path id="Shape_1296" data-name="Shape 1296" d="M261.515,2172.614a6.93,6.93,0,0,1,0,11.034" transform="translate(-245.884 -2169.588)" fill="none" stroke="#1a1c1d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                <path id="Shape_1297" data-name="Shape 1297" d="M259.515,2175.114c2.462,1.79,2.454,4.652,0,6.436" transform="translate(-245.723 -2169.79)" fill="none" stroke="#1a1c1d" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
  );
}
