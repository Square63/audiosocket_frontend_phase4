import React from "react";
import {useState, useRef} from "react";
// import ReactWaves from "@dschoon/react-waves";
// import AudioPlayer from 'react-h5-audio-player';
import ClippPlayer from 'clipp-player'
import 'react-h5-audio-player/lib/styles.css';
// import audio from "../audio/sample.mp3";
 
export default function AudioWave() {
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(0.5)

	return (
		<div>
			<ClippPlayer
				className={'clipp-player'}
				src={"./sample.mp3"}
				btnStyle={{
					color: '#FFF',
					background: '#49368B',
					borderRadius: '30px',
				}}
				counterStyle={{
					color: '#49368B',
				}}
				volume={volume}
				zoom={1}
				options={{
					audioRate: 1,
					autoCenter: false,
					barGap: 1,
					cursorColor: '#FFF',
					cursorWidth: 1,
					fillParent: true,
					height: 50,
					hideScrollbar: true,
					normalize: true,
					partialRender: true,
					progressColor: '#49368B',
					responsive: true,
					waveColor: '#e1e5ea',
				}}
			/>
			<input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          onChange={event => {
            setVolume(event.target.valueAsNumber)
          }}
        />
		</div>
	);
}