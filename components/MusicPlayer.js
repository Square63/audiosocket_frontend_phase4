import React, {useEffect, useRef, useState} from "react";
import Image from 'next/Image';
// import PlayIcon from '../images/play.svg';
// import PauseIcon from '../images/pause.svg';
// import Forward from '../images/forward.svg';
// import Backward from '../images/backward.svg';
import PlayIcon from '../images/playWhite.svg';
import PauseIcon from '../images/pauseWhite.svg';
import Forward from '../images/forwardWhite.svg';
import Backward from '../images/backwardWhite.svg';
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
    <>
    <div className="musicplayerDemo">
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
    </div>
    <div className="auMusicPlayer">
      <div className="custom-container">
        <div className="player musicPlayerInner">
          <div className="buttons">
            <div ref={refPrevBtn} className="prev-track" onClick={prevTrack}><Image src={Backward} alt="prev" /></div>
            <div ref={refPlayPauseBtn} className="playpause-track" onClick={playpauseTrack}><Image src={!isPlaying ? PlayIcon : PauseIcon} alt="play" /></div>
            <div ref={refNextBtn} className="next-track" onClick={nextTrack}><Image src={Forward} alt="next" /></div>
          </div>
          <div className="slider_container playbackTimeline">
            <div ref={refCurrentTime} className="current-time">00:00</div>
            <input ref={refSeekSlider} type="range" min="1" max="100" defaultValue="0" className="seek_slider" onChange={seekTo} />
            <div ref={refTotalDuration} className="total-duration">00:00</div>
          </div>
          <div className="slider_container volumeTimeline">
            <Image className="volume-down" src={VolumeDown} alt="down" />
            <input ref={refVolumeSlider} type="range" min="1" max="100" defaultValue="99" className="volume_slider" onChange={setVolume} />
            <Image className="volume-up" src={VolumeUp} alt="up" />
          </div>
          <div className="trackDetails">
            <div ref={refTrackArt} className="track-art"></div>
            <div className="trackstats">
              <div ref={refTrackName} className="track-name">
                Track Name
              </div>
              <div ref={refTrackArtist} className="track-artist">
                Track Artist
              </div>
            </div>
          </div>
          {/* <ul className="playerActions">
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFF"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C5.13401 2 2 5.13401 2 9C2 12.548 4.63967 15.4795 8.06227 15.9377C8.52049 19.3603 11.452 22 15 22C18.866 22 22 18.866 22 15C22 11.452 19.3603 8.52049 15.9377 8.06227C15.4795 4.63967 12.548 2 9 2ZM13.9162 8.0834C13.4857 5.75974 11.4483 4 9 4C6.23858 4 4 6.23858 4 9C4 11.4483 5.75974 13.4857 8.0834 13.9162C8.54941 10.9181 10.9181 8.54941 13.9162 8.0834ZM13.8723 10.1277C12.0164 10.5555 10.5555 12.0164 10.1277 13.8723C11.9836 13.4445 13.4445 11.9836 13.8723 10.1277ZM10.0838 15.9166C13.0819 15.4506 15.4506 13.0819 15.9166 10.0838C18.2403 10.5143 20 12.5517 20 15C20 17.7614 17.7614 20 15 20C12.5517 20 10.5143 18.2403 10.0838 15.9166Z"></path></svg>
              <span>find fimilar</span>
            </li>
            <li> 
              <svg width="24" height="24" fill="#FFF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4H4.80701L6.06367 7.35103L9.06367 15.3508L9.30701 15.9997H10H18H18.693L18.9363 15.3508L21.9363 7.35103L22.443 5.9999H21H7.69299L6.43633 2.64887L6.19299 2H5.5H2V4ZM10.693 13.9997L8.44301 7.9999H19.557L17.307 13.9997H10.693ZM8 20C8 18.8954 8.89543 18 10 18C11.1046 18 12 18.8954 12 20C12 21.1046 11.1046 22 10 22C8.89543 22 8 21.1046 8 20ZM16 20C16 18.8954 16.8954 18 18 18C19.1046 18 20 18.8954 20 20C20 21.1046 19.1046 22 18 22C16.8954 22 16 21.1046 16 20Z"></path></svg>
              <span>add to cart</span>
            </li>
            <li>
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFF"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13V21H13V13H21V11H13V3H11V11H3V13H11Z"></path></svg>
              <span>Add to playlist</span>
            </li>
            <li></li>
            <li></li>
          </ul> */}

        </div>
      </div>
    </div>
    </>
  );
}

export default MusicPlayer;