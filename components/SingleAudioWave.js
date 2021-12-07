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

  const url = props.track.file

  const settings = {
    start: 2, min: 0,max: 10,step: 1,
    onChange: function(value) {
      wavesurfer.current.setVolume(value)
    }
  }

  useEffect(() => {
    create();

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, []);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load("./test.mp3");
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  return (
    
    <div className="stickyMiniPlayerInner">
			<div className="songsStuff">
        <a href="javascript:void(0)" className="SongName">Saving</a>
        <a href="javascript:void(0)" className="SongArtist">Justin G. Marcellus</a>
      </div>
			<div className="playPauseBtn" onClick={handlePlayPause}>
				<span className={playing ? "play" : "pause"}></span>
			</div>
      <div className="waveWithDuration">
        <div className="durationCount durationObtained">02:21</div>
        <div id="waveform" ref={waveformRef}  />
        <div className="durationCount totalDuration">03:43</div>
      </div>
      <Grid>
        <Grid.Column width={2}>
          <Slider discrete color="red" inverted={false} settings={settings}/>
        </Grid.Column>
      </Grid>
      <button className="btn btnMainLarge">Add to Cart</button>
    </div>
  );
}
