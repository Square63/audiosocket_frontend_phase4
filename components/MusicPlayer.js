import React, {useEffect, useRef, useState} from "react";
import Image from 'next/Image';
import PlayIcon from '../images/play.svg';
import PauseIcon from '../images/pause.svg';
import Forward from '../images/forward.svg';
import Backward from '../images/backward.svg';
import VolumeUp from '../images/volume-up.svg';
import VolumeDown from '../images/volume-down.svg';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [updateTimer, setUpdateTimer] = useState(null);
  const [trackIndex, setTrackIndex] = useState(0);

  const refNowPlaying = useRef(null);
  const refTrackArt = useRef(null);
  const refTrackName = useRef(null);
  const refTrackArtist = useRef(null);

  const refPlayPauseBtn = useRef(null);
  const refPrevBtn = useRef(null);
  const refNextBtn = useRef(null);

  const refCurrentTime = useRef(null);
  const refTotalDuration = useRef(null);
  const refSeekSlider = useRef(null);
  const refVolumeSlider = useRef(null);

  const currentTrack = useRef(
    typeof Audio !== "undefined" ? new Audio("") : undefined
  );

  useEffect(() => {
    loadTrack(trackIndex);
  }, [])

  // Define the tracks that have to be played
  const track_list = [
    {
      name: "Night Owl",
      artist: "Broke For Free",
      image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    },
    {
      name: "Enthusiast",
      artist: "Tours",
      image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    },
    {
      name: "Shipping Lanes",
      artist: "Chad Crouch",
      image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
      path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
    },
  ];

  const loadTrack = (trackIndex) => {
    clearInterval(updateTimer);
    resetValues();
    currentTrack.current.src = track_list[trackIndex].path;
    currentTrack.current?.load();

    refTrackArt.current.style.backgroundImage = "url(" + track_list[trackIndex].image + ")";
    refTrackName.current.textContent = track_list[trackIndex].name;
    refTrackArtist.current.textContent = track_list[trackIndex].artist;
    refNowPlaying.current.textContent = "PLAYING " + (trackIndex + 1) + " OF " + track_list.length;

    setUpdateTimer(setInterval(seekUpdate, 1000));
    currentTrack.current.addEventListener("ended", nextTrack);
  }

  const resetValues = () => {
    refCurrentTime.current.textContent = "00:00";
    refTotalDuration.current.textContent = "00:00";
    refSeekSlider.current.value = 0;
  }

  const playpauseTrack = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setIsPlaying(true);
      playTrack();
    }
    else {
      setIsPlaying(false);
      pauseTrack();
    }
  }

  const playTrack = () => {
    currentTrack.current?.play();
  }

  const pauseTrack = () => {
    currentTrack.current?.pause();
  }

  const nextTrack = () => {
    if (trackIndex < track_list.length - 1)
      setTrackIndex(trackIndex + 1);
    else
      setTrackIndex(0);
    loadTrack(trackIndex);
    playTrack();
  }

  const prevTrack = () => {
    if (trackIndex > 0)
      setTrackIndex(trackIndex - 1);
    else
      setTrackIndex(track_list.length);
    loadTrack(trackIndex);
    playTrack();
  }

  const seekTo = () => {
    currentTrack.current.currentTime = currentTrack.current?.duration * (refSeekSlider.current.value / 100);
  }

  const setVolume = () => {
    currentTrack.current.volume = refVolumeSlider.current.value / 100;
  }

  const seekUpdate = () => {
    let seekPosition = 0;

    if (!isNaN(currentTrack.current?.duration)) {
      seekPosition = currentTrack.current?.currentTime * (100 / currentTrack.current?.duration);

      refSeekSlider.current.value = seekPosition;

      let currentMinutes = Math.floor(currentTrack.current?.currentTime / 60);
      let currentSeconds = Math.floor(currentTrack.current?.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(currentTrack.current?.duration / 60);
      let durationSeconds = Math.floor(currentTrack.current?.duration - durationMinutes * 60);

      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

      refCurrentTime.current.textContent = currentMinutes + ":" + currentSeconds;
      refTotalDuration.current.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  return (
    <div className="player">
      <div className="details">
        <div ref={refNowPlaying} className="now-playing">PLAYING x OF y</div>
        <div ref={refTrackArt} className="track-art"></div>
        <div ref={refTrackName} className="track-name">Track Name</div>
        <div ref={refTrackArtist} className="track-artist">Track Artist</div>
      </div>
      <div className="buttons">
        <div ref={refPrevBtn} className="prev-track" onClick={prevTrack}><Image src={Backward} alt="prev" /></div>
        <div ref={refPlayPauseBtn} className="playpause-track" onClick={playpauseTrack}><Image src={!isPlaying ? PlayIcon : PauseIcon} alt="play" /></div>
        <div ref={refNextBtn} className="next-track" onClick={nextTrack}><Image src={Forward} alt="next" /></div>
      </div>
      <div className="slider_container">
        <div ref={refCurrentTime} className="current-time">00:00</div>
        <input ref={refSeekSlider} type="range" min="1" max="100" defaultValue="0" className="seek_slider" onChange={seekTo} />
        <div ref={refTotalDuration} className="total-duration">00:00</div>
      </div>
      <div className="slider_container">
        <Image className="volume-down" src={VolumeDown} alt="down" />
        <input ref={refVolumeSlider} type="range" min="1" max="100" defaultValue="99" className="volume_slider" onChange={setVolume} />
        <Image className="volume-up" src={VolumeUp} alt="up" />
      </div>
    </div>
  );
}

export default MusicPlayer;