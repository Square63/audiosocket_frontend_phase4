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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomAudioWave = dynamic(
  () => import('../components/CustomAudioWave'),
  { ssr: false }
)
const AltVersion = dynamic(
  () => import('../components/SingleAudioWave'),
  { ssr: false }
)

function DownloadedTracks(props) {
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([])
  const [sfxs, setSfxs] = useState([])
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
      setSfxs(sfxs => [...sfxs, ...props.sfxs])
      setInfiniteLoop(false)
    } else {
      setTracks(tracks=> props.tracks)
      setSfxs(sfxs=> props.sfxs)
    }

    if (props.tracks && props.tracks.length < 10) {
      sethasMore(false)
    }

    return () => {
      isMounted = false;
    };

  },[props.tracks, props.sfxs])

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
    {!tracks && !sfxs ? (
      <center><p>No downloaded tracks</p></center>
    ) : (
      <div className={user.downloadListing}>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: "auto" }}
        />
        <div className={user.listingWrapper+' userListingWrapper'}>
          <div className={user.listingHeading}>
            <h2>Downloads</h2>
            <p>If you need to License tracks that you downloaded, please add the name of your Work and click “License Track”.</p>
          </div>
          <div className="trackRowWrapper">
            <div className="trackRow headingRow">
              <div className="rowParticipant artistName">
                Title / Artist
                <span className="sortingMedium">
                  <a href="" className="decending"></a>
                  <a href="" className="ascending"></a>
                </span>
              </div>
              <div className={user.workTitle+' rowParticipant'}>
                Work Title
              </div>
              <div className={user.licenseBtn+' rowParticipant'}>
                License
              </div>
              <div className={user.downloadDate+' rowParticipant'}>
                Download Date
                <span className="sortingMedium">
                  <a href="" className="decending"></a>
                  <a href="" className="ascending"></a>
                </span>
              </div>
              <div className="rowParticipant controls"></div>
            </div>
            {tracks.length > 0 &&
              tracks.map((track, index)=> {
                return(
                  <div className="trackRow" key={index}>
                    <div className="rowParticipant artistName">
                      <div className="playPauseBtn">
                        <span className="play d-none"></span>
                        <span className="pause"></span>
                      </div>
                      <div className="aboutSong">
                        <div className="songData">
                          <a href="" className="songName">{track.mediable.title}</a>
                        </div>
                        <div className="songArtist">
                          <a href="" className="noTextLine">
                            {track.mediable.artist_name}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={user.workTitle+' rowParticipant'}>
                      <Form>
                        <Form.Control type="text" placeholder="Enter work title…" defaultValue={track.work_title ? track.work_title : ""} onBlur={(e) => { props.handleSubmitWorkTitle(e, track.id) }}/>
                      </Form>
                    </div>
                    <div className={user.licenseBtn+' rowParticipant'}>
                      <button variant="link" className="btn btnMainSmall">License Track</button>
                    </div>
                    <div className={user.downloadDate+' rowParticipant'}>
                      {new Date(track.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="rowParticipant controls">
                      <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                        <a onClick={() => { props.handleDeleteTrack(track) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <g id="Actions" transform="translate(-1050 -29.5)">
                              <g id="icon-trashcan" transform="translate(772 -3264.5)">
                                  <path id="Shape_1765" data-name="Shape 1765" d="M299,3298.5l-1.812,17.209a2,2,0,0,1-1.988,1.791H284.8a2,2,0,0,1-1.989-1.791L281,3298.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h23" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3298.5v-3a1,1,0,0,1,1-1h7a1,1,0,0,1,1,1v3" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Shape_1769" data-name="Shape 1769" d="M294.5,3303l-.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                                  <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.5,10.5" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              </g>
                              </g>
                          </svg>
                        </a>
                      </OverlayTrigger>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default DownloadedTracks
