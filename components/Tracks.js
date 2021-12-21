import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import InpageLoader from "./InpageLoader";
import {useState, useEffect} from "react";
import Select from "react-select";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import search from "../styles/Search.module.scss";
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

function Tracks(props) {
  const dispatch = useDispatch();
  const [tracks, setTracks] = useState([])
  const [infifniteLoop, setInfiniteLoop] = useState(false)
  const [sortBy, setSortBy] = useState("")
  const [sortDir, setSortDir] = useState("")
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasMore, sethasMore] = useState(true)

  useEffect(() => {
    if (infifniteLoop) {
      setTracks(tracks => [...tracks, ...props.tracks])
      setInfiniteLoop(false)
    } else {
      setTracks(tracks=> props.tracks)
    }

    if (props.tracks.length < 10)
      sethasMore(false)
    
  },[props.tracks])
  
  const fetchData = () => {
    let query = document.getElementById("searchField").value
    if (query === "" && props.appliedFiltersList.length == 0) {
      dispatch(getTracks(query, query_type(query), props.appliedFiltersList, sortBy, sortDir, (tracks.length/10)));
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
    { value: ' mostRecentlyPublished', label: ' Most Recently Published' },
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

  function query_type(query) {
    return query.includes("https") ? "aims_search" : "local_search"
  }

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      return minutes+':'+parseInt(seconds)
    }

  }

  // function handleFooterTrack(track) {
  // 	localStorage.setItem('playing', true)
  //   // props.setFooterPlaying(!props.footerPlaying)
  // 	props.setTrack(track)
  // }

  return (
    <div className={search.tracksWrapper}>
      <div className={search.tracksHeading}>
        <h2>Tracks <span className={search.tracksCount}>{tracks.length}</span></h2>
        <div className={search.tracksSorting}>
          <form>
              <Form.Label className="required">Sort By:</Form.Label>
              <Select
                className='react-select-container'
                classNamePrefix="react-select"
                placeholder="Relevence"
                options={options}
                defaultValue='Relevence'
                theme={theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#c0d72d',
                  },
                  height: 43,
                })}
              />
          </form>
        </div>
      </div>
      <div className="trackRowWrapper">
        <div className="trackRow headingRow">
          <div className="rowParticipant artistName">
            Title / Artist
            <span className="sortingMedium">
              <a href="" className="decending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "title", "DESC")}></a>
              <a href="" className="ascending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "title", "ASC")}></a>
            </span>
          </div>
          <div className="rowParticipant audioWave"></div>
          <div className="rowParticipant duration">
            Duration
            <span className="sortingMedium">
              <a href="" className="decending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "duration", "DESC")}></a>
              <a href="" className="ascending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "duration", "ASC")}></a>
            </span>
          </div>
          <div className="rowParticipant mood controls">
            <Dropdown alignLeft>
              <Dropdown.Toggle variant="">
                Mood
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <span>Genres</span>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  <span>Themes</span>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-1">
                  <span>Instruments</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <span className="sortingMedium">
              <a href="" className="decending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "mood", "DESC")}></a>
              <a href="" className="ascending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "mood", "ASC")}></a>
            </span> */}
          </div>
          <div className="rowParticipant BPM">
            BPM
            <span className="sortingMedium">
              <a href="" className="decending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "bpm", "DESC")}></a>
              <a href="" className="ascending" onClick={(e) => handleSorting(e, props.appliedFiltersList, "bpm", "ASC")}></a>
            </span>
          </div>
          <div className="rowParticipant controls"></div>
        </div>
        <InfiniteScroll
          dataLength={tracks.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<InpageLoader />}
          // endMessage={<h4>Nothing more to show</h4>}
        >
          {tracks.map((track,index)=> {
            return(<div className="trackRow" key={index}>
              <CustomAudioWave track={track} handleFooterTrack={props.handleFooterTrack} footer={false} footerPlaying={false}/>
              <div className="rowParticipant duration">
                {convertSecToMin(track.duration)}
              </div>
              <div className="rowParticipant mood">
                {track.moods.join(", ")}
              </div>
              <div className="rowParticipant BPM">
                {track.bpm}
              </div>
              <div className="rowParticipant controls">
                <OverlayTrigger overlay={<Tooltip>Similar Search</Tooltip>}>
                  <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26.536" height="26.536" viewBox="0 0 26.536 26.536">
                      <g id="icon-like-tracks" transform="translate(0.5 0.5)">
                        <path id="Path_1" data-name="Path 1" d="M310.243,311.623a10.621,10.621,0,1,0-10.621,10.62A10.623,10.623,0,0,0,310.243,311.623Z" transform="translate(-289 -301)" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        <line id="Line_2" data-name="Line 2" x2="7.706" y2="6.672" transform="translate(17.624 18.659)" fill="none" stroke="#6e7377" strokLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
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
                <OverlayTrigger overlay={<Tooltip>Add to Favourites</Tooltip>}>
                  <a href="">
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

                <Dropdown drop="up" alignLeft className="downloadStuff">
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
                    <Dropdown.Item href="#/action-1" onClick={props.showLicenseModal}>
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
                    <Dropdown.Item href="#/action-1" onClick={props.showDownloadModal}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.89" height="16.927" viewBox="0 0 17.89 16.927">
                        <g id="icon-download" transform="translate(0.5 16.427) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M9,3.3V.734A.715.715,0,0,0,8.31,0H.692A.715.715,0,0,0,0,.734V16.156a.715.715,0,0,0,.692.734H8.31A.715.715,0,0,0,9,16.156v-2.57" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H13.157" transform="translate(2.77 8.445)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M3.462,0,0,3.672,3.462,7.344" transform="translate(2.77 4.773)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                        </g>
                      </svg>
                      <a download>Download to Preview</a>
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.994" height="17.024" viewBox="0 0 17.994 17.024">
                        <g id="icon-cart" transform="translate(0.5 0.5)">
                          <g id="Group_155" data-name="Group 155" transform="translate(0)">
                            <g id="shopping-cart-add">
                              <path id="Oval_67" data-name="Oval 67" d="M255.607,1411.542a1.047,1.047,0,1,0-1.108-1.045A1.078,1.078,0,0,0,255.607,1411.542Z" transform="translate(-250.067 -1397.608)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1172" data-name="Shape 1172" d="M248.5,1392.452h2a.732.732,0,0,1,.72.537l2.822,11.306H257" transform="translate(-248.5 -1392.452)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1173" data-name="Shape 1173" d="M265.656,1401.62l.8-2.251a.663.663,0,0,0-.1-.628.753.753,0,0,0-.6-.289H253.412" transform="translate(-249.783 -1394.272)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1174" data-name="Shape 1174" d="M255.293,1406.452h3.459" transform="translate(-250.274 -1396.698)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_68" data-name="Oval 68" d="M265.2,1412.419a3.489,3.489,0,1,0-3.694-3.483A3.594,3.594,0,0,0,265.2,1412.419Z" transform="translate(-251.895 -1396.395)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1175" data-name="Shape 1175" d="M266.5,1408.452v2.787" transform="translate(-253.201 -1397.305)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1176" data-name="Shape 1176" d="M264.5,1410.452h2.955" transform="translate(-252.679 -1397.912)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Add to Cart</span>
                    </Dropdown.Item>
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
                    <Dropdown.Item href="#/action-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18.528" height="18.528" viewBox="0 0 18.528 18.528">
                        <g id="Music-Audio_Playlists_playlist-share" data-name="Music-Audio / Playlists / playlist-share" transform="translate(-578.504 -1970.614)">
                          <g id="Group_183" data-name="Group 183" transform="translate(579.004 1971.114)">
                            <g id="playlist-share">
                              <path id="Shape_1219" data-name="Shape 1219" d="M592.722,1979.5v-7.621a.762.762,0,0,0-.762-.762H579.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-579.004 -1971.114)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_234" data-name="Oval 234" d="M590.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,590.147,1983.4Z" transform="translate(-581.383 -1973.493)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_235" data-name="Oval 235" d="M583.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,583.147,1984.4Z" transform="translate(-579.718 -1973.731)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1220" data-name="Shape 1220" d="M585,1981.673v-4.379a.762.762,0,0,1,.552-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-580.431 -1972.144)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_236" data-name="Oval 236" d="M599.528,1993.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1993.162Z" transform="translate(-583.524 -1975.634)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_237" data-name="Oval 237" d="M599.528,1987.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1987.162Z" transform="translate(-583.524 -1974.207)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_238" data-name="Oval 238" d="M593.528,1990.662a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,593.528,1990.662Z" transform="translate(-582.097 -1975.039)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1221" data-name="Shape 1221" d="M595.728,1988.257l1.943-1.133" transform="translate(-582.983 -1974.923)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1222" data-name="Shape 1222" d="M595.85,1990.384l1.759.733" transform="translate(-583.012 -1975.698)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Stems</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="altVersions">
                <Button
                  variant="link"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="8.844" height="6.17" viewBox="0 0 8.844 6.17">
                    <g id="icon-arrow-down-small" transform="translate(0.18 1.058)">
                      <path id="Shape_1939" data-name="Shape 1939" d="M335.361,2401.3l-3.179-4.053" transform="translate(-331.309 -2397.247)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                      <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2401.3l3.553-4.053" transform="translate(-330.379 -2397.247)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    </g>
                  </svg>
                  <span className="versionCount">1</span> alt. versions
                </Button>
                <Collapse in={open}>
                  <div id="example-collapse-text" >
                    <AltVersion/>
                  </div>
                </Collapse>
              </div>
            </div>)
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Tracks