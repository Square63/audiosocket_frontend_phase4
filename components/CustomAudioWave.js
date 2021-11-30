import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
  partialRender: true
});

export default function CustomAudioWave() {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);

  const url =
    "http://artist-portal-backend-phase4.square63.net//…eb62616ab325994d4e64c19c502/Soft-techno-music.mp3";

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
    <div>
      <div id="waveform" ref={waveformRef}  />
      <div className="PlayerControls">
        <div className="startStopBtn" onClick={handlePlayPause}>
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
  );
}
