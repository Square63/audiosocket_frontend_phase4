import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import InpageLoader from "./InpageLoader";
import {useState, useEffect} from "react";
import Select from "react-select";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import user from "../styles/User.module.scss";
import dynamic from 'next/dynamic'
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../redux/actions/trackActions';
import InfiniteScroll from 'react-infinite-scroll-component';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import Fade from 'react-bootstrap/Fade';

const CustomAudioWave = dynamic(
  () => import('../components/CustomAudioWave'),
  { ssr: false }
)
const AltVersion = dynamic(
  () => import('../components/SingleAudioWave'),
  { ssr: false }
)

function FavoriteTracks(props) {
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([])
  const [infifniteLoop, setInfiniteLoop] = useState(false)
  const [sortBy, setSortBy] = useState("")
  const [sortDir, setSortDir] = useState("")
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasMore, sethasMore] = useState(true)
  const [moodColumn, setMoodColumn] = useState("moods")

  useEffect(() => {
    let isMounted = true;
    if (infifniteLoop) {
      setTracks(tracks => [...tracks, ...props.tracks])
      setInfiniteLoop(false)
    } else {
      setTracks(tracks=> props.tracks)
    }

    if (props.tracks && props.tracks.length < 10) {
      sethasMore(false)
    }

    return () => {
      isMounted = false;
    };
    
  },[props.tracks])
  
  const fetchData = () => {
    let query = document.getElementById("searchField").value
    if (query === "" && props.appliedFiltersList.length == 0) {
      dispatch(getTracks(query, query_type(query), props.appliedFiltersList, sortBy, sortDir, (tracks.length/10 + 1)));
      // setTracks(tracks => [...tracks, ...props.tracks])
      setInfiniteLoop(true)
    } else {
      setTracks(tracks=> props.tracks)
      setInfiniteLoop(false)
    }
  }

  const options = [
    { value: 'relevence', label: 'Relevence' },
    { value: 'featured', label: 'Featured' },
    { value: 'mostRecentlyPublished', label: ' Most Recently Published' },
    { value: 'durationLongtoShort', label: 'Duration Long to Short' },
    { value: 'durationShorttoLong', label: 'Duration Short to Long' }
  ]

  const handleSorting = (e, filters, sort_by, sort_dir) => {
    e.preventDefault()
    setSortDir(sort_dir)
    setSortBy(sort_by)
    e.target.classList.add("disableSortBtn")
    sort_dir == "DESC" ? e.target.nextElementSibling.classList.remove("disableSortBtn") : e.target.previousElementSibling.classList.remove("disableSortBtn") 
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), filters, sort_by, sort_dir));
  }

  const handleDropdownSorting = (sort_by, sort_dir) => {
    setSortDir(sort_dir)
    setSortBy(sort_by)
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), props.appliedFiltersList, sort_by, sort_dir));
  }

  function query_type(query) {
    return query.includes("https") ? "aims_search" : "local_search"
  }

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60).toString();
      minutes = minutes.length == 1 ? ("0" + minutes) : minutes
      let seconds = parseInt((duration - minutes * 60)).toString();
      seconds = seconds.length == 1 ? ("0" + seconds) : seconds
      return minutes+':'+seconds
    } else {
      return "00:00"
    }

  }

  const handleCollapse = (e) => {
    e.target.classList.toggle("rotateArrow")
  }


  const handleMood = (e, mood) => {
    setMoodColumn(mood)
    if (document.getElementsByClassName("activeState")[0])
      document.getElementsByClassName("activeState")[0].classList.remove("activeState")
    e.target.parentElement.classList.add("activeState")
    let capitalMood = mood.charAt(0).toUpperCase() + mood.slice(1);
    document.getElementById("headerMood").innerText = capitalMood
  }

  const handleMoodColumn = (track, mood) => {
    switch(mood) {

      case "moods":   return track.moods.join(", ");
      case "genres":   return track.genres.join(", ");
      case "themes": return track.themes.join(", ");
      case "instruments":  return track.instruments.join(", ");
      default: return ""
    }
  }

  const handleFilterDropdown = (e) => {
    if (e.value === "durationLongtoShort")
      handleDropdownSorting("duration", "DESC")
    else if (e.value === "durationShorttoLong")
      handleDropdownSorting("duration", "ASC")
    else if (e.value === "mostRecentlyPublished")
      handleDropdownSorting("publish_date", "ASC")
    else if (e.value === "featured")
      handleDropdownSorting("featured", "DESC")
    else
      handleDropdownSorting("featured", "ASC")
  }

  return (
    <>
    {!tracks ? (
      <center><p>No favotite tracks</p></center>
    ) : (
      <div className={user.favoritesListing}>
        <div className={user.listingWrapper}>
          <div className={user.listingHeading}>
            <h2>Favorite Tracks</h2>
          </div>
          <div className="trackRowWrapper">
            <div className="trackRow headingRow">
              <div className="rowParticipant artistName">
                Title / Artist
              </div>
              <div className="rowParticipant audioWave"></div>
              <div className="rowParticipant duration">
                Duration
              </div>
              <div className="rowParticipant genres">
                Genres
              </div>
              <div className="rowParticipant controls"></div>
            </div>
            {tracks.map((track,index)=> {
              return(<div key={index} className="trackRow">
                <CustomAudioWave track={track} handleFooterTrack={props.handleFooterTrack} footer={false} footerPlaying={false}/>
                <div className="rowParticipant duration">
                  {convertSecToMin(track.duration)}
                </div>
                <div className="rowParticipant genres">
                  {handleMoodColumn(track, moodColumn)}
                </div>
                <div className="rowParticipant controls">
                  <OverlayTrigger overlay={<Tooltip>Similar Search</Tooltip>}>
                    <a onClick={(e) => props.handleSimilarSearch(track.title, track.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26.536" height="26.536" viewBox="0 0 26.536 26.536">
                        <g id="icon-like-tracks" transform="translate(0.5 0.5)">
                          <path id="Path_1" data-name="Path 1" d="M310.243,311.623a10.621,10.621,0,1,0-10.621,10.62A10.623,10.623,0,0,0,310.243,311.623Z" transform="translate(-289 -301)" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <line id="Line_2" data-name="Line 2" x2="7.706" y2="6.672" transform="translate(17.624 18.659)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <g id="Icon_-_Mag-note" data-name="Icon - Mag-note" transform="translate(5.818 5.227)">
                            <path id="Shape_1577" data-name="Shape 1577" d="M244.306,2627.369c0,1.034-1.241,1.871-2.773,1.871s-2.773-.837-2.773-1.871,1.241-1.87,2.773-1.87S244.306,2626.334,244.306,2627.369Z" transform="translate(-238.759 -2618.826)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2622.028v-7.518a1.109,1.109,0,0,1,1.664-.963l2.219,1.27" transform="translate(-243.228 -2613.398)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          </g>
                        </g>
                      </svg>
                    </a>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Add to Playlist</Tooltip>}>
                    <a href="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="29.249" height="29.25" viewBox="0 0 29.249 29.25">
                        <g id="icon-add-to-playlist" transform="translate(0.5 0.5)">
                          <g id="Group_165" data-name="Group 165" transform="translate(0)">
                            <g id="playlist-add">
                              <path id="Shape_1147" data-name="Shape 1147" d="M217.112,1936.624v-12.282a1.228,1.228,0,0,0-1.228-1.229H196.232a1.227,1.227,0,0,0-1.228,1.229v19.652a1.228,1.228,0,0,0,1.228,1.228h12.282" transform="translate(-195.004 -1923.114)" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_187" data-name="Oval 187" d="M206.846,1936.8a1.842,1.842,0,1,0-1.842-1.842A1.843,1.843,0,0,0,206.846,1936.8Z" transform="translate(-192.722 -1920.831)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_188" data-name="Oval 188" d="M199.846,1937.8a1.843,1.843,0,1,0-1.842-1.842A1.843,1.843,0,0,0,199.846,1937.8Z" transform="translate(-194.319 -1920.603)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1148" data-name="Shape 1148" d="M201,1937.484v-7.057a1.229,1.229,0,0,1,.891-1.18l6.141-1.755a1.228,1.228,0,0,1,1.566,1.182v7.583" transform="translate(-193.635 -1922.126)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_189" data-name="Oval 189" d="M214.145,1948.4a6.141,6.141,0,1,0-6.141-6.141A6.142,6.142,0,0,0,214.145,1948.4Z" transform="translate(-192.037 -1920.147)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1149" data-name="Shape 1149" d="M213,1939.114v4.913" transform="translate(-190.896 -1919.462)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1150" data-name="Shape 1150" d="M211,1941.114h4.913" transform="translate(-191.352 -1919.006)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </g>
                          </g>
                        </svg>
                    </a>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip>Remove from Favourites</Tooltip>}>
                    <a onClick={(e) => props.handleAddToFavorites(e, track.id)} className={user.favoriteSong}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22.93" height="20.303" viewBox="0 0 22.93 20.303">
                        <g id="icon-add-to-favorites" transform="translate(0.619 0.513)">
                          <path id="Shape_185" data-name="Shape 185" d="M181.253,573.9l-7.07-7.281a5.369,5.369,0,0,1-1.031-6.258h0a5.532,5.532,0,0,1,8.8-1.409l1.516,1.382,1.516-1.382a5.532,5.532,0,0,1,8.8,1.409h0a5.36,5.36,0,0,1,.182,4.452" transform="translate(-172.573 -557.365)" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Oval_11" data-name="Oval 11" d="M189.254,577.1a5.683,5.683,0,1,0-5.684-5.683A5.683,5.683,0,0,0,189.254,577.1Z" transform="translate(-173.153 -557.807)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73v5.684" transform="translate(-173.469 -557.965)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_187" data-name="Shape 187" d="M192.254,571.73h-5.683" transform="translate(-173.311 -558.123)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                    </a>
                  </OverlayTrigger>

                  <Dropdown drop="up" alignLeft>
                    <OverlayTrigger overlay={<Tooltip>Download Track</Tooltip>}>
                      <Dropdown.Toggle variant="" id="dropdown-autoclose-true dropdown-button-drop-up">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
                          <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                            <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          </g>
                        </svg>
                      </Dropdown.Toggle>
                    </OverlayTrigger>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18.528" height="18.528" viewBox="0 0 18.528 18.528">
                          <g id="Music-Audio_Playlists_playlist-lock" data-name="Music-Audio / Playlists / playlist-lock" transform="translate(-242.504 -1970.614)">
                            <g id="Group_176" data-name="Group 176" transform="translate(243.004 1971.114)">
                              <g id="playlist-lock">
                                <path id="Shape_1189" data-name="Shape 1189" d="M256.722,1977.973v-6.1a.762.762,0,0,0-.762-.762H243.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-243.004 -1971.114)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Oval_216" data-name="Oval 216" d="M254.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,254.147,1983.4Z" transform="translate(-245.383 -1973.493)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Oval_217" data-name="Oval 217" d="M247.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,247.147,1984.4Z" transform="translate(-243.718 -1973.731)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Shape_1190" data-name="Shape 1190" d="M249,1981.673v-4.379a.762.762,0,0,1,.553-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-244.431 -1972.144)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Rectangle-path_81" data-name="Rectangle-path 81" d="M257,1987.876a.761.761,0,0,1,.762-.762H263.1a.762.762,0,0,1,.762.762v3.81a.762.762,0,0,1-.762.762h-5.335a.762.762,0,0,1-.762-.762Z" transform="translate(-246.335 -1974.92)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Shape_1191" data-name="Shape 1191" d="M261.266,1989.614a.762.762,0,1,0,.762.762A.761.761,0,0,0,261.266,1989.614Z" transform="translate(-247.167 -1975.515)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Shape_1192" data-name="Shape 1192" d="M259,1986.162v-1.143a1.905,1.905,0,1,1,3.81,0v1.143" transform="translate(-246.81 -1973.969)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>Download to License</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.89" height="16.927" viewBox="0 0 17.89 16.927">
                          <g id="icon-download" transform="translate(0.5 16.427) rotate(-90)">
                            <path id="Shape_111" data-name="Shape 111" d="M9,3.3V.734A.715.715,0,0,0,8.31,0H.692A.715.715,0,0,0,0,.734V16.156a.715.715,0,0,0,.692.734H8.31A.715.715,0,0,0,9,16.156v-2.57" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_112" data-name="Shape 112" d="M0,0H13.157" transform="translate(2.77 8.445)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            <path id="Shape_113" data-name="Shape 113" d="M3.462,0,0,3.672,3.462,7.344" transform="translate(2.77 4.773)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          </g>
                        </svg>
                        <span>Download to Preview</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown drop="up" alignCenter>
                    <OverlayTrigger overlay={<Tooltip>More</Tooltip>}>
                      <Dropdown.Toggle variant="" id="dropdown-autoclose-true dropdown-button-drop-up">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                            <g id="icon-elipsis" transform="translate(-422 -334)">
                              <path id="Oval_12" data-name="Oval 12" d="M429,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,429,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_13" data-name="Oval 13" d="M434,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,434,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_14" data-name="Oval 14" d="M439,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,439,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_15" data-name="Oval 15" d="M433,355.5A10.5,10.5,0,1,0,422.5,345,10.5,10.5,0,0,0,433,355.5Z" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </svg>
                      </Dropdown.Toggle>
                    </OverlayTrigger>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16.927" height="17.134" viewBox="0 0 16.927 17.134">
                          <g id="Interface-Essential_Share_share-2" data-name="Interface-Essential / Share / share-2" transform="translate(-518 -3841.793)">
                            <g id="Group_395" data-name="Group 395" transform="translate(518.5 3842.5)">
                              <g id="share-2">
                                <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span>Share</span>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15.432" height="16.579" viewBox="0 0 15.432 16.579">
                          <g id="Music-Audio_Modern-Music_modern-music-dj" data-name="Music-Audio / Modern-Music / modern-music-dj" transform="translate(-343.015 -1624.558)">
                            <g id="Social-Medias-Rewards-Rating_Social-Profile_social-profile-avatar" data-name="Social-Medias-Rewards-Rating / Social-Profile / social-profile-avatar" transform="translate(170.108 1540.602)">
                              <g id="Group" transform="translate(173.415 84.471)">
                                <g id="social-profile-avatar">
                                  <path id="Shape" d="M182.888,100.035v-2.03h.677a2.03,2.03,0,0,0,2.03-2.03v-2.03h1.9a.338.338,0,0,0,.32-.441c-1.269-3.927-2.186-8.143-6.375-8.909a6.759,6.759,0,0,0-8,5.856,6.583,6.583,0,0,0,2.678,5.935v3.646" transform="translate(-173.415 -84.471)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                </g>
                              </g>
                              <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73V574.8" transform="translate(-9.341 -479.918)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_187" data-name="Shape 187" d="M192.636,571.73h-6.066" transform="translate(-9.373 -479.885)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </g>
                        </svg>
                        <span>Follow Artist</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>)
              })}
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default FavoriteTracks