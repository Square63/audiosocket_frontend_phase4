import { useEffect, useRef, useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Slider } from "react-semantic-ui-range";
import { Segment, Grid, Label, Input } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min";



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
  plugins: [
    RegionsPlugin.create({
        regionsMinLength: 2,
        regions: [
          {
            id: 'region-1',
            start: 0,
            end: 30,
            loop: false,
            color: 'hsla(200, 50%, 70%, 0.4)',
          }
        ],
        dragSelection: {
          slop: 5
        }
    })
  ]
});

export default function SearchAudioWave(props) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState();
  const [segment, setSegment] = useState({start: 0.0, end: 5.0});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // const url = props.track.file? props.track.file : "./test.mp3"
  const url = "./test.mp3"
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
    // }
  }, [playing, seconds, segment, props.track, props.footerPlaying]);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.on('region-update-end', function (region) {
      segment.start = region.start
      segment.end = region.end
    });

    wavesurfer.current.load(url);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.play(segment.start, segment.end);
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
      <div className="playPauseBtn" onClick={() => { handlePlayPause(); }} >
        <span className={(playing) ? "play" : "pause"}></span>
        <span className="pause d-none"></span>
      </div>
      <div className="versionTrackRow">
        <div className="filterVersion">
          <div id="waveform" ref={waveformRef} />
        </div>
      </div>
      <a href="javascript:void(0)" className="btn btnMainXlarge" onClick={props.handleUploadSearch}>
        Upload Segment
      </a>
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
