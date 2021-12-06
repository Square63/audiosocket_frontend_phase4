import { useEffect, useRef, useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



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

  const url = props.track.file

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
		wavesurfer.current.setVolume(0.4)
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
  };

  const handleVolume= () => {
    let volume = parseFloat(document.querySelector('#volume').value)
    wavesurfer.current.setVolume(volume)
    console.log("After set Volume", wavesurfer.current.getVolume());
  };

  return (
    
    <>
      
			<div id="waveform" ref={waveformRef}  />
			<div className="playPauseBtn" onClick={handlePlayPause}>
				<span className={playing ? "play" : "pause"}></span>
				<span className="pause d-none"></span>
			</div>
			<div className="PlayerControls">
				<input id="volume" type="range" min="0" max="1" step="0.1" onChange={handleVolume}></input>
			</div>
    </>
  );
}
