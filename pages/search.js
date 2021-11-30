import Alert from 'react-bootstrap/Alert';
import DownloadTrack from "../components/modals/DownloadTrack";
import {useState} from "react";
import dynamic from 'next/dynamic'
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Image from 'next/image';
import Tooltip from 'react-bootstrap/Tooltip';
import Select from "react-select";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import search from "../styles/Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../redux/store';
import { getFilters } from '../redux/actions/filterActions';
import { getTracks } from '../redux/actions/trackActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PreferenceModal from "../components/modals/PreferenceModal";
import $ from 'jquery';

const CustomAudioWave = dynamic(
  () => import('../components/CustomAudioWave'),
  { ssr: false }
)

function Search() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showChilderDiv, setShowChilderDiv] = useState(false);
  const [lastChildFilters, setLastChildFilters] = useState([]);
  const [appliedFiltersList, setAppliedFiltersList] = useState([]);

  const options = [
    { value: 'relevence', label: 'Relevence' },
    { value: 'featured', label: 'Featured' },
    { value: ' mostRecentlyPublished', label: ' Most Recently Published' },
    { value: 'durationLongtoShort', label: 'Duration Long to Short' },
    { value: 'durationShorttoLong', label: 'Duration Short to Long' }
  ]
  
  const handleClose = (show) => {
    setShowModal(show)
  }
  
  const handleSearch = async(e) => {
    dispatch(getTracks(e.target.value));
  }

  const handleClearAllFilter = () => {
    hideAllFilterDiv()
  }

  function handleClearSingleFilter(e) {
    let singleFilterText = e.target.previousElementSibling.textContent
    let singleFilterTextWithoutCount = removeCount(singleFilterText)
    let elements = $( "a:contains("+singleFilterTextWithoutCount+")" );

    appliedFiltersList.splice(appliedFiltersList.indexOf(singleFilterTextWithoutCount), 1);
    console.log("Discard Filter after", appliedFiltersList)

    for (let i = 0; i < elements.length; i++) {
      elements[i].closest(".filterSelf").classList.remove("activeFilter")
    }

    if (e) {
      e.target.parentElement.style.display = 'none';
      let length = $(".selectedFilter li:visible").length
      if (length == 0) {
        hideAllFilterDiv()
      }
    }
  }

  function hideAllFilterDiv() {
    $(".filterSelf").removeClass("activeFilter");
    document.getElementById("filtersList").innerHTML = "";
    document.getElementsByClassName('selectedFilter')[0].style.display = 'none';
  }

  const handleAddFilter = (e) => {
    e.target.closest('.filterSelf').classList.add('activeFilter')
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    var ul = document.getElementById("filtersList")
    var li = document.createElement("li");
    ul.appendChild(li);
    var span = document.createElement("span");
    span.setAttribute("class", "tagText");
    span.appendChild(document.createTextNode(e.currentTarget.text));
    var span1 = document.createElement("span");
    span1.setAttribute("class", "clearTag");
    li.appendChild(span);
    li.appendChild(span1);
    span1.addEventListener('click',handleClearSingleFilter)
    appliedFiltersList.push(removeCount(e.currentTarget.text))
    console.log("Applied Filters", appliedFiltersList)
  }

  const handleAddChildrenFilter = (e) => {
    $(".custom").removeClass("activeFilter");
    let filter = e.target.closest('span').id
    let partenID;
    console.log("filters", filters)
    const index = filters.findIndex(
      // x => x.ProductCode === data.ProductCode
      (x) => {
        console.log(x);
        x.sub_filters.findIndex(
          (y) => {
            if(y.id == parseInt(filter)) {
              // debugger
              partenID = x.id;
            }
          }
        )
      }
    );
    const parentIndex = filters.findIndex(x => x.id == partenID);
    const childIndex = filters[parentIndex].sub_filters.findIndex(x => x.id == filter);
    console.log(childIndex);
    setLastChildFilters(filters[parentIndex].sub_filters[childIndex].sub_filters);

    // console.log(filters.indexOf(partenID));

    setShowChilderDiv(true);
  }

  const filters = useSelector( state => state.allFilters.filters[0])
  const tracks = useSelector( state => state.allTracks.tracks)
  console.log("Filters", filters)
  console.log("Tracks", tracks)


  function removeCount(filter) {
    return filter.substring(0, filter.indexOf(' ('));
  }
  
  const filterItems = filters.map((filter, index) =>
    <Dropdown className={filter.name === "Moods" ? "d-inline mood" : "d-inline"} key={index}>
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {filter.name}
      </Dropdown.Toggle>
      {(filter.sub_filters.length > 0 ?
        (<Dropdown.Menu >
          <div className="filterWrapper">
            {filter.sub_filters.map((sub_filter, index) =>
              <>
                <div className="filterSelf">
                  <Dropdown.Item href="#" onClick={handleAddFilter}>{sub_filter.name} <span>({filter.sub_filters[index].sub_filters.length})</span></Dropdown.Item>
                  <span className="filterControl addFilter" onClick={handleAddChildrenFilter} id={sub_filter.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10" id={sub_filter.id}>
                      <g id="icon-plus" transform="translate(-1.669 -4.355)">
                        <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                        <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                      </g>
                    </svg>
                  </span>

                  <span className="filterControl discardFilter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                      <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1">
                        <circle cx="5" cy="5" r="5" stroke="none"/>
                        <circle cx="5" cy="5" r="4.5" fill="none"/>
                      </g>
                      <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1"/>
                    </svg>
                  </span>
                </div>
              </>
            )}
          </div>
          {lastChildFilters.length > 0 && showChilderDiv &&
            <>
              <div className="filterChildren filterWrapper" id={appliedFiltersList.length}>
                {lastChildFilters.map((sub_filter, index) =>
                  <>
                    <div className={appliedFiltersList.includes(sub_filter.name) ? "custom filterSelf activeFilter" : "custom filterSelf"}>
                      <Dropdown.Item href="#" onClick={handleAddFilter}>{sub_filter.name} <span>(18,041)</span></Dropdown.Item>
                      <span className="filterControl addFilter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10">
                          <g id="icon-plus" transform="translate(-1.669 -4.355)">
                            <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                            <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                          </g>
                        </svg>
                      </span>

                      <span className="filterControl discardFilter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
                          <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1">
                            <circle cx="5" cy="5" r="5" stroke="none"/>
                            <circle cx="5" cy="5" r="4.5" fill="none"/>
                          </g>
                          <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1"/>
                        </svg>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </>
          }
        </Dropdown.Menu>) 
        : ("")
      )}
    </Dropdown>
  );

  return (
    <div className={search.searchWrapper}>
      <Alert variant="success" className="brandAlert">
        <div className="fixed-container">
          <p>
            Special Offer! 20% off all spooky tracks for the month of October!
          </p>
        </div>
      </Alert>
      <div className="fixed-container">
        <h1 className={search.pageHeading}>Search Music</h1>
        <div className={search.searchUploadStuff}>
          <Form className="stickySearch largeStuff haveIcon">
            <Form.Control type="text" placeholder="Search by YouTube link, Spotify song link, or Keyword" onChange={handleSearch} />
            <Button variant="default" type="submit" className="btnMainLarge stickyBtn">Search</Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="" width="22.414" height="22.414" viewBox="0 0 22.414 22.414">
              <g id="icon-magnifying-glass" transform="translate(1 1)">
                <path id="Path_1" data-name="Path 1" d="M305.541,309.272a8.271,8.271,0,1,0-8.271,8.27A8.272,8.272,0,0,0,305.541,309.272Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinecap="round" strokeWidth="2"/>
                <line id="Line_2" data-name="Line 2" x2="5.989" y2="5.866" transform="translate(14.011 14.134)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinecap="round" strokeWidth="2"/>
              </g>
            </svg>
          </Form>
          <a href="javascript:void(0)" className="btn btnMainXlarge" onClick={() => setShowModal(true)}>
            Upload a Track
            <svg xmlns="http://www.w3.org/2000/svg" width="17.465" height="16.526" viewBox="0 0 17.465 16.526">
              <g id="icon-upload" transform="translate(16.965 0.5) rotate(90)">
                <path id="Shape_111" data-name="Shape 111" d="M8.775,3.221V.716A.7.7,0,0,0,8.1,0H.675A.7.7,0,0,0,0,.716V15.749a.7.7,0,0,0,.675.716H8.1a.7.7,0,0,0,.675-.716V13.244" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinecap="round" strokeWidth="1"/>
                <path id="Shape_112" data-name="Shape 112" d="M0,0H12.826" transform="translate(2.7 8.233)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinecap="round" strokeWidth="1"/>
                <path id="Shape_113" data-name="Shape 113" d="M3.375,0,0,3.579,3.375,7.159" transform="translate(2.7 4.653)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinecap="round" strokeWidth="1"/>
              </g>
            </svg>
          </a>
        </div>
        <div className="filterBar brandWall">
          {filterItems}
          <Dropdown className="d-inline setting">
            <Dropdown.Toggle id="dropdown-autoclose-true">
              Settings
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="settingFilterWrapper">
                <form>
                  <div className="toogleSwitch">
                    <input type="checkbox" id="excludeExplicit" />
                    <Form.Label for="excludeExplicit">&nbsp;</Form.Label>
                    <span className="switchText">Exclude Explicit</span>
                  </div>
                  <div className="toogleSwitch">
                    <input type="checkbox" id="youtubeContent" />
                    <Form.Label for="youtubeContent">&nbsp;</Form.Label>
                    <span className="switchText">YouTube ContentID Cleared</span>
                  </div>
                  <div className="toogleSwitch">
                    <input type="checkbox" id="excludeVocals" />
                    <Form.Label for="excludeVocals">&nbsp;</Form.Label>
                    <span className="switchText">Exclude Vocals</span>
                  </div>
                  <div className="toogleSwitch">
                    <input type="checkbox" id="trackWithStem" />
                    <Form.Label for="trackWithStem">&nbsp;</Form.Label>
                    <span className="switchText">Only tracks with stems</span>
                  </div>
                </form>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="selectedFilter brandWall">
          <ul id="filtersList">
          </ul>
          <OverlayTrigger overlay={<Tooltip>Clear All</Tooltip>}>
            <span className="clearAllTag" onClick={handleClearAllFilter}></span>
          </OverlayTrigger>
        </div>
        <div className={search.tracksWrapper}>
          <div className={search.tracksHeading}>
            <h2>Tracks <span className={search.tracksCount}>7</span></h2>
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
                  <a href="" className="decending"></a>
                  <a href="" className="ascending"></a>
                </span>
              </div>
              <div className="rowParticipant audioWave"></div>
              <div className="rowParticipant duration">
                Duration
                <span className="sortingMedium">
                  <a href="" className="decending"></a>
                  <a href="" className="ascending"></a>
                </span>
              </div>
              <div className="rowParticipant mood">
                Mood
                <span className="sortingMedium">
                  <a href="" className="decending"></a>
                  <a href="" className="ascending"></a>
                </span>
              </div>
              <div className="rowParticipant BPM">
                BPM
                <span className="sortingMedium">
                  <a href="" className="decending"></a>
                  <a href="" className="ascending"></a>
                </span>
              </div>
              <div className="rowParticipant controls"></div>
            </div>

            <div className="trackRow">
              <div className="rowParticipant artistName">
                <div className="playPauseBtn">
                  <span className="play"></span>
                  <span className="pause d-none"></span>
                </div>
                <div className="aboutSong">
                  <div className="songData">
                    <a href="" className="songName">saving</a>
                    <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
                      <a href="" className="info"></a>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>On Fire (Demo)</Tooltip>}>
                      <a href="" className="fire"></a>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Playlist (Demo)</Tooltip>}>
                      <a href="" className="playlistWave"></a>
                    </OverlayTrigger>
                  </div>
                  <div className="songArtist">
                    <a href="">
                      Justin G. Marcellus Abady
                    </a>
                  </div>
                </div>
              </div>
              <div className="rowParticipant audioWave">
                <CustomAudioWave/>
              </div>
              <div className="rowParticipant duration">
                01:10
                
              </div>
              <div className="rowParticipant mood">
                Ambient, Happy, Love
              </div>
              <div className="rowParticipant BPM">
                95
              </div>
              <div className="rowParticipant controls">
                <OverlayTrigger overlay={<Tooltip>Similar Search</Tooltip>}>
                  <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26.536" height="26.536" viewBox="0 0 26.536 26.536">
                      <g id="icon-like-tracks" transform="translate(0.5 0.5)">
                        <path id="Path_1" data-name="Path 1" d="M310.243,311.623a10.621,10.621,0,1,0-10.621,10.62A10.623,10.623,0,0,0,310.243,311.623Z" transform="translate(-289 -301)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <line id="Line_2" data-name="Line 2" x2="7.706" y2="6.672" transform="translate(17.624 18.659)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" stroke-width="1"/>
                        <g id="Icon_-_Mag-note" data-name="Icon - Mag-note" transform="translate(5.818 5.227)">
                          <path id="Shape_1577" data-name="Shape 1577" d="M244.306,2627.369c0,1.034-1.241,1.871-2.773,1.871s-2.773-.837-2.773-1.871,1.241-1.87,2.773-1.87S244.306,2626.334,244.306,2627.369Z" transform="translate(-238.759 -2618.826)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2622.028v-7.518a1.109,1.109,0,0,1,1.664-.963l2.219,1.27" transform="translate(-243.228 -2613.398)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                            <path id="Shape_1147" data-name="Shape 1147" d="M217.112,1936.624v-12.282a1.228,1.228,0,0,0-1.228-1.229H196.232a1.227,1.227,0,0,0-1.228,1.229v19.652a1.228,1.228,0,0,0,1.228,1.228h12.282" transform="translate(-195.004 -1923.114)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_187" data-name="Oval 187" d="M206.846,1936.8a1.842,1.842,0,1,0-1.842-1.842A1.843,1.843,0,0,0,206.846,1936.8Z" transform="translate(-192.722 -1920.831)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_188" data-name="Oval 188" d="M199.846,1937.8a1.843,1.843,0,1,0-1.842-1.842A1.843,1.843,0,0,0,199.846,1937.8Z" transform="translate(-194.319 -1920.603)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1148" data-name="Shape 1148" d="M201,1937.484v-7.057a1.229,1.229,0,0,1,.891-1.18l6.141-1.755a1.228,1.228,0,0,1,1.566,1.182v7.583" transform="translate(-193.635 -1922.126)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_189" data-name="Oval 189" d="M214.145,1948.4a6.141,6.141,0,1,0-6.141-6.141A6.142,6.142,0,0,0,214.145,1948.4Z" transform="translate(-192.037 -1920.147)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1149" data-name="Shape 1149" d="M213,1939.114v4.913" transform="translate(-190.896 -1919.462)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1150" data-name="Shape 1150" d="M211,1941.114h4.913" transform="translate(-191.352 -1919.006)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                        <path id="Shape_185" data-name="Shape 185" d="M181.253,573.9l-7.07-7.281a5.369,5.369,0,0,1-1.031-6.258h0a5.532,5.532,0,0,1,8.8-1.409l1.516,1.382,1.516-1.382a5.532,5.532,0,0,1,8.8,1.409h0a5.36,5.36,0,0,1,.182,4.452" transform="translate(-172.573 -557.365)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Oval_11" data-name="Oval 11" d="M189.254,577.1a5.683,5.683,0,1,0-5.684-5.683A5.683,5.683,0,0,0,189.254,577.1Z" transform="translate(-173.153 -557.807)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73v5.684" transform="translate(-173.469 -557.965)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Shape_187" data-name="Shape 187" d="M192.254,571.73h-5.683" transform="translate(-173.311 -558.123)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                      </g>
                    </svg>
                  </a>
                </OverlayTrigger>

                <Dropdown drop="up" alignLeft>
                  <OverlayTrigger overlay={<Tooltip>Download Track</Tooltip>}>
                    <Dropdown.Toggle variant="" id="dropdown-autoclose-true dropdown-button-drop-up">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
                        <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1189" data-name="Shape 1189" d="M256.722,1977.973v-6.1a.762.762,0,0,0-.762-.762H243.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-243.004 -1971.114)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_216" data-name="Oval 216" d="M254.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,254.147,1983.4Z" transform="translate(-245.383 -1973.493)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_217" data-name="Oval 217" d="M247.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,247.147,1984.4Z" transform="translate(-243.718 -1973.731)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1190" data-name="Shape 1190" d="M249,1981.673v-4.379a.762.762,0,0,1,.553-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-244.431 -1972.144)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Rectangle-path_81" data-name="Rectangle-path 81" d="M257,1987.876a.761.761,0,0,1,.762-.762H263.1a.762.762,0,0,1,.762.762v3.81a.762.762,0,0,1-.762.762h-5.335a.762.762,0,0,1-.762-.762Z" transform="translate(-246.335 -1974.92)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1191" data-name="Shape 1191" d="M261.266,1989.614a.762.762,0,1,0,.762.762A.761.761,0,0,0,261.266,1989.614Z" transform="translate(-247.167 -1975.515)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1192" data-name="Shape 1192" d="M259,1986.162v-1.143a1.905,1.905,0,1,1,3.81,0v1.143" transform="translate(-246.81 -1973.969)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Download to License</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.89" height="16.927" viewBox="0 0 17.89 16.927">
                        <g id="icon-download" transform="translate(0.5 16.427) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M9,3.3V.734A.715.715,0,0,0,8.31,0H.692A.715.715,0,0,0,0,.734V16.156a.715.715,0,0,0,.692.734H8.31A.715.715,0,0,0,9,16.156v-2.57" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H13.157" transform="translate(2.77 8.445)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M3.462,0,0,3.672,3.462,7.344" transform="translate(2.77 4.773)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                            <path id="Oval_12" data-name="Oval 12" d="M429,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,429,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_13" data-name="Oval 13" d="M434,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,434,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_14" data-name="Oval 14" d="M439,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,439,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_15" data-name="Oval 15" d="M433,355.5A10.5,10.5,0,1,0,422.5,345,10.5,10.5,0,0,0,433,355.5Z" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Oval_67" data-name="Oval 67" d="M255.607,1411.542a1.047,1.047,0,1,0-1.108-1.045A1.078,1.078,0,0,0,255.607,1411.542Z" transform="translate(-250.067 -1397.608)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1172" data-name="Shape 1172" d="M248.5,1392.452h2a.732.732,0,0,1,.72.537l2.822,11.306H257" transform="translate(-248.5 -1392.452)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1173" data-name="Shape 1173" d="M265.656,1401.62l.8-2.251a.663.663,0,0,0-.1-.628.753.753,0,0,0-.6-.289H253.412" transform="translate(-249.783 -1394.272)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1174" data-name="Shape 1174" d="M255.293,1406.452h3.459" transform="translate(-250.274 -1396.698)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_68" data-name="Oval 68" d="M265.2,1412.419a3.489,3.489,0,1,0-3.694-3.483A3.594,3.594,0,0,0,265.2,1412.419Z" transform="translate(-251.895 -1396.395)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1175" data-name="Shape 1175" d="M266.5,1408.452v2.787" transform="translate(-253.201 -1397.305)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1176" data-name="Shape 1176" d="M264.5,1410.452h2.955" transform="translate(-252.679 -1397.912)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                                <path id="Shape" d="M182.888,100.035v-2.03h.677a2.03,2.03,0,0,0,2.03-2.03v-2.03h1.9a.338.338,0,0,0,.32-.441c-1.269-3.927-2.186-8.143-6.375-8.909a6.759,6.759,0,0,0-8,5.856,6.583,6.583,0,0,0,2.678,5.935v3.646" transform="translate(-173.415 -84.471)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              </g>
                            </g>
                            <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73V574.8" transform="translate(-9.341 -479.918)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_187" data-name="Shape 187" d="M192.636,571.73h-6.066" transform="translate(-9.373 -479.885)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1219" data-name="Shape 1219" d="M592.722,1979.5v-7.621a.762.762,0,0,0-.762-.762H579.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-579.004 -1971.114)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_234" data-name="Oval 234" d="M590.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,590.147,1983.4Z" transform="translate(-581.383 -1973.493)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_235" data-name="Oval 235" d="M583.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,583.147,1984.4Z" transform="translate(-579.718 -1973.731)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1220" data-name="Shape 1220" d="M585,1981.673v-4.379a.762.762,0,0,1,.552-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-580.431 -1972.144)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_236" data-name="Oval 236" d="M599.528,1993.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1993.162Z" transform="translate(-583.524 -1975.634)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_237" data-name="Oval 237" d="M599.528,1987.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1987.162Z" transform="translate(-583.524 -1974.207)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_238" data-name="Oval 238" d="M593.528,1990.662a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,593.528,1990.662Z" transform="translate(-582.097 -1975.039)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1221" data-name="Shape 1221" d="M595.728,1988.257l1.943-1.133" transform="translate(-582.983 -1974.923)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1222" data-name="Shape 1222" d="M595.85,1990.384l1.759.733" transform="translate(-583.012 -1975.698)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Stems</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="trackRow">
              <div className="rowParticipant artistName">
                <div className="playPauseBtn">
                  <span className="play d-none"></span>
                  <span className="pause"></span>
                </div>
                <div className="aboutSong">
                  <div className="songData">
                    <a href="" className="songName">Made This Feeling Positive</a>
                    <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
                      <a href="" className="info"></a>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>On Fire (Demo)</Tooltip>}>
                      <a href="" className="fire"></a>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Playlist (Demo)</Tooltip>}>
                      <a href="" className="playlistWave"></a>
                    </OverlayTrigger>
                  </div>
                  <div className="songArtist">
                    <a href="">
                      Justin G. Marcellus Abady
                    </a>
                  </div>
                </div>
                
                
              </div>
              <div className="rowParticipant audioWave">
                <CustomAudioWave/>
              </div>
              <div className="rowParticipant duration">
                01:10
                
              </div>
              <div className="rowParticipant mood">
                Ambient, Happy, Love
              </div>
              <div className="rowParticipant BPM">
                95
                
              </div>
              <div className="rowParticipant controls">
                <OverlayTrigger overlay={<Tooltip>Similar Search</Tooltip>}>
                  <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26.536" height="26.536" viewBox="0 0 26.536 26.536">
                      <g id="icon-like-tracks" transform="translate(0.5 0.5)">
                        <path id="Path_1" data-name="Path 1" d="M310.243,311.623a10.621,10.621,0,1,0-10.621,10.62A10.623,10.623,0,0,0,310.243,311.623Z" transform="translate(-289 -301)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <line id="Line_2" data-name="Line 2" x2="7.706" y2="6.672" transform="translate(17.624 18.659)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" stroke-width="1"/>
                        <g id="Icon_-_Mag-note" data-name="Icon - Mag-note" transform="translate(5.818 5.227)">
                          <path id="Shape_1577" data-name="Shape 1577" d="M244.306,2627.369c0,1.034-1.241,1.871-2.773,1.871s-2.773-.837-2.773-1.871,1.241-1.87,2.773-1.87S244.306,2626.334,244.306,2627.369Z" transform="translate(-238.759 -2618.826)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2622.028v-7.518a1.109,1.109,0,0,1,1.664-.963l2.219,1.27" transform="translate(-243.228 -2613.398)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                            <path id="Shape_1147" data-name="Shape 1147" d="M217.112,1936.624v-12.282a1.228,1.228,0,0,0-1.228-1.229H196.232a1.227,1.227,0,0,0-1.228,1.229v19.652a1.228,1.228,0,0,0,1.228,1.228h12.282" transform="translate(-195.004 -1923.114)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_187" data-name="Oval 187" d="M206.846,1936.8a1.842,1.842,0,1,0-1.842-1.842A1.843,1.843,0,0,0,206.846,1936.8Z" transform="translate(-192.722 -1920.831)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_188" data-name="Oval 188" d="M199.846,1937.8a1.843,1.843,0,1,0-1.842-1.842A1.843,1.843,0,0,0,199.846,1937.8Z" transform="translate(-194.319 -1920.603)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1148" data-name="Shape 1148" d="M201,1937.484v-7.057a1.229,1.229,0,0,1,.891-1.18l6.141-1.755a1.228,1.228,0,0,1,1.566,1.182v7.583" transform="translate(-193.635 -1922.126)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_189" data-name="Oval 189" d="M214.145,1948.4a6.141,6.141,0,1,0-6.141-6.141A6.142,6.142,0,0,0,214.145,1948.4Z" transform="translate(-192.037 -1920.147)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1149" data-name="Shape 1149" d="M213,1939.114v4.913" transform="translate(-190.896 -1919.462)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1150" data-name="Shape 1150" d="M211,1941.114h4.913" transform="translate(-191.352 -1919.006)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                        <path id="Shape_185" data-name="Shape 185" d="M181.253,573.9l-7.07-7.281a5.369,5.369,0,0,1-1.031-6.258h0a5.532,5.532,0,0,1,8.8-1.409l1.516,1.382,1.516-1.382a5.532,5.532,0,0,1,8.8,1.409h0a5.36,5.36,0,0,1,.182,4.452" transform="translate(-172.573 -557.365)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Oval_11" data-name="Oval 11" d="M189.254,577.1a5.683,5.683,0,1,0-5.684-5.683A5.683,5.683,0,0,0,189.254,577.1Z" transform="translate(-173.153 -557.807)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73v5.684" transform="translate(-173.469 -557.965)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Shape_187" data-name="Shape 187" d="M192.254,571.73h-5.683" transform="translate(-173.311 -558.123)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                      </g>
                    </svg>
                  </a>
                </OverlayTrigger>
                <Dropdown drop="up" alignLeft>
                  <OverlayTrigger overlay={<Tooltip>Download Track</Tooltip>}>
                    <Dropdown.Toggle variant="" id="dropdown-autoclose-true dropdown-button-drop-up">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
                        <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1189" data-name="Shape 1189" d="M256.722,1977.973v-6.1a.762.762,0,0,0-.762-.762H243.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-243.004 -1971.114)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_216" data-name="Oval 216" d="M254.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,254.147,1983.4Z" transform="translate(-245.383 -1973.493)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_217" data-name="Oval 217" d="M247.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,247.147,1984.4Z" transform="translate(-243.718 -1973.731)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1190" data-name="Shape 1190" d="M249,1981.673v-4.379a.762.762,0,0,1,.553-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-244.431 -1972.144)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Rectangle-path_81" data-name="Rectangle-path 81" d="M257,1987.876a.761.761,0,0,1,.762-.762H263.1a.762.762,0,0,1,.762.762v3.81a.762.762,0,0,1-.762.762h-5.335a.762.762,0,0,1-.762-.762Z" transform="translate(-246.335 -1974.92)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1191" data-name="Shape 1191" d="M261.266,1989.614a.762.762,0,1,0,.762.762A.761.761,0,0,0,261.266,1989.614Z" transform="translate(-247.167 -1975.515)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1192" data-name="Shape 1192" d="M259,1986.162v-1.143a1.905,1.905,0,1,1,3.81,0v1.143" transform="translate(-246.81 -1973.969)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Download to License</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.89" height="16.927" viewBox="0 0 17.89 16.927">
                        <g id="icon-download" transform="translate(0.5 16.427) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M9,3.3V.734A.715.715,0,0,0,8.31,0H.692A.715.715,0,0,0,0,.734V16.156a.715.715,0,0,0,.692.734H8.31A.715.715,0,0,0,9,16.156v-2.57" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H13.157" transform="translate(2.77 8.445)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M3.462,0,0,3.672,3.462,7.344" transform="translate(2.77 4.773)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                            <path id="Oval_12" data-name="Oval 12" d="M429,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,429,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_13" data-name="Oval 13" d="M434,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,434,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_14" data-name="Oval 14" d="M439,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,439,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_15" data-name="Oval 15" d="M433,355.5A10.5,10.5,0,1,0,422.5,345,10.5,10.5,0,0,0,433,355.5Z" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Oval_67" data-name="Oval 67" d="M255.607,1411.542a1.047,1.047,0,1,0-1.108-1.045A1.078,1.078,0,0,0,255.607,1411.542Z" transform="translate(-250.067 -1397.608)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1172" data-name="Shape 1172" d="M248.5,1392.452h2a.732.732,0,0,1,.72.537l2.822,11.306H257" transform="translate(-248.5 -1392.452)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1173" data-name="Shape 1173" d="M265.656,1401.62l.8-2.251a.663.663,0,0,0-.1-.628.753.753,0,0,0-.6-.289H253.412" transform="translate(-249.783 -1394.272)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1174" data-name="Shape 1174" d="M255.293,1406.452h3.459" transform="translate(-250.274 -1396.698)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_68" data-name="Oval 68" d="M265.2,1412.419a3.489,3.489,0,1,0-3.694-3.483A3.594,3.594,0,0,0,265.2,1412.419Z" transform="translate(-251.895 -1396.395)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1175" data-name="Shape 1175" d="M266.5,1408.452v2.787" transform="translate(-253.201 -1397.305)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1176" data-name="Shape 1176" d="M264.5,1410.452h2.955" transform="translate(-252.679 -1397.912)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                                <path id="Shape" d="M182.888,100.035v-2.03h.677a2.03,2.03,0,0,0,2.03-2.03v-2.03h1.9a.338.338,0,0,0,.32-.441c-1.269-3.927-2.186-8.143-6.375-8.909a6.759,6.759,0,0,0-8,5.856,6.583,6.583,0,0,0,2.678,5.935v3.646" transform="translate(-173.415 -84.471)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              </g>
                            </g>
                            <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73V574.8" transform="translate(-9.341 -479.918)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_187" data-name="Shape 187" d="M192.636,571.73h-6.066" transform="translate(-9.373 -479.885)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1219" data-name="Shape 1219" d="M592.722,1979.5v-7.621a.762.762,0,0,0-.762-.762H579.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-579.004 -1971.114)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_234" data-name="Oval 234" d="M590.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,590.147,1983.4Z" transform="translate(-581.383 -1973.493)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_235" data-name="Oval 235" d="M583.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,583.147,1984.4Z" transform="translate(-579.718 -1973.731)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1220" data-name="Shape 1220" d="M585,1981.673v-4.379a.762.762,0,0,1,.552-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-580.431 -1972.144)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_236" data-name="Oval 236" d="M599.528,1993.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1993.162Z" transform="translate(-583.524 -1975.634)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_237" data-name="Oval 237" d="M599.528,1987.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1987.162Z" transform="translate(-583.524 -1974.207)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_238" data-name="Oval 238" d="M593.528,1990.662a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,593.528,1990.662Z" transform="translate(-582.097 -1975.039)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1221" data-name="Shape 1221" d="M595.728,1988.257l1.943-1.133" transform="translate(-582.983 -1974.923)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1222" data-name="Shape 1222" d="M595.85,1990.384l1.759.733" transform="translate(-583.012 -1975.698)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Stems</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="trackRow">
              <div className="rowParticipant artistName">
                <div className="playPauseBtn">
                  <span className="play d-none"></span>
                  <span className="pause"></span>
                </div>
                <div className="aboutSong">
                  <div className="songData">
                    <a href="" className="songName">Love in Fear</a>
                    <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
                      <a href="" className="info"></a>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>On Fire (Demo)</Tooltip>}>
                      <a href="" className="fire"></a>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Playlist (Demo)</Tooltip>}>
                      <a href="" className="playlistWave"></a>
                    </OverlayTrigger>
                  </div>
                  <div className="songArtist">
                    <a href="">
                      The Kelseys
                    </a>
                  </div>
                </div>
                
                
              </div>
              <div className="rowParticipant audioWave">
                <CustomAudioWave/>
              </div>
              <div className="rowParticipant duration">
                01:10
                
              </div>
              <div className="rowParticipant mood">
                Ambient, Happy, Love
              </div>
              <div className="rowParticipant BPM">
                95
                
              </div>
              <div className="rowParticipant controls">
                <OverlayTrigger overlay={<Tooltip>Similar Search</Tooltip>}>
                  <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26.536" height="26.536" viewBox="0 0 26.536 26.536">
                      <g id="icon-like-tracks" transform="translate(0.5 0.5)">
                        <path id="Path_1" data-name="Path 1" d="M310.243,311.623a10.621,10.621,0,1,0-10.621,10.62A10.623,10.623,0,0,0,310.243,311.623Z" transform="translate(-289 -301)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <line id="Line_2" data-name="Line 2" x2="7.706" y2="6.672" transform="translate(17.624 18.659)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" stroke-width="1"/>
                        <g id="Icon_-_Mag-note" data-name="Icon - Mag-note" transform="translate(5.818 5.227)">
                          <path id="Shape_1577" data-name="Shape 1577" d="M244.306,2627.369c0,1.034-1.241,1.871-2.773,1.871s-2.773-.837-2.773-1.871,1.241-1.87,2.773-1.87S244.306,2626.334,244.306,2627.369Z" transform="translate(-238.759 -2618.826)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_1578" data-name="Shape 1578" d="M248.693,2622.028v-7.518a1.109,1.109,0,0,1,1.664-.963l2.219,1.27" transform="translate(-243.228 -2613.398)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                            <path id="Shape_1147" data-name="Shape 1147" d="M217.112,1936.624v-12.282a1.228,1.228,0,0,0-1.228-1.229H196.232a1.227,1.227,0,0,0-1.228,1.229v19.652a1.228,1.228,0,0,0,1.228,1.228h12.282" transform="translate(-195.004 -1923.114)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_187" data-name="Oval 187" d="M206.846,1936.8a1.842,1.842,0,1,0-1.842-1.842A1.843,1.843,0,0,0,206.846,1936.8Z" transform="translate(-192.722 -1920.831)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_188" data-name="Oval 188" d="M199.846,1937.8a1.843,1.843,0,1,0-1.842-1.842A1.843,1.843,0,0,0,199.846,1937.8Z" transform="translate(-194.319 -1920.603)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1148" data-name="Shape 1148" d="M201,1937.484v-7.057a1.229,1.229,0,0,1,.891-1.18l6.141-1.755a1.228,1.228,0,0,1,1.566,1.182v7.583" transform="translate(-193.635 -1922.126)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_189" data-name="Oval 189" d="M214.145,1948.4a6.141,6.141,0,1,0-6.141-6.141A6.142,6.142,0,0,0,214.145,1948.4Z" transform="translate(-192.037 -1920.147)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1149" data-name="Shape 1149" d="M213,1939.114v4.913" transform="translate(-190.896 -1919.462)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_1150" data-name="Shape 1150" d="M211,1941.114h4.913" transform="translate(-191.352 -1919.006)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                        <path id="Shape_185" data-name="Shape 185" d="M181.253,573.9l-7.07-7.281a5.369,5.369,0,0,1-1.031-6.258h0a5.532,5.532,0,0,1,8.8-1.409l1.516,1.382,1.516-1.382a5.532,5.532,0,0,1,8.8,1.409h0a5.36,5.36,0,0,1,.182,4.452" transform="translate(-172.573 -557.365)" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Oval_11" data-name="Oval 11" d="M189.254,577.1a5.683,5.683,0,1,0-5.684-5.683A5.683,5.683,0,0,0,189.254,577.1Z" transform="translate(-173.153 -557.807)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73v5.684" transform="translate(-173.469 -557.965)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                        <path id="Shape_187" data-name="Shape 187" d="M192.254,571.73h-5.683" transform="translate(-173.311 -558.123)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                      </g>
                    </svg>
                  </a>
                </OverlayTrigger>
                <Dropdown drop="up" alignLeft>
                  <OverlayTrigger overlay={<Tooltip>Download Track</Tooltip>}>
                    <Dropdown.Toggle variant="" id="dropdown-autoclose-true dropdown-button-drop-up">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
                        <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1189" data-name="Shape 1189" d="M256.722,1977.973v-6.1a.762.762,0,0,0-.762-.762H243.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-243.004 -1971.114)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_216" data-name="Oval 216" d="M254.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,254.147,1983.4Z" transform="translate(-245.383 -1973.493)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_217" data-name="Oval 217" d="M247.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,247.147,1984.4Z" transform="translate(-243.718 -1973.731)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1190" data-name="Shape 1190" d="M249,1981.673v-4.379a.762.762,0,0,1,.553-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-244.431 -1972.144)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Rectangle-path_81" data-name="Rectangle-path 81" d="M257,1987.876a.761.761,0,0,1,.762-.762H263.1a.762.762,0,0,1,.762.762v3.81a.762.762,0,0,1-.762.762h-5.335a.762.762,0,0,1-.762-.762Z" transform="translate(-246.335 -1974.92)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1191" data-name="Shape 1191" d="M261.266,1989.614a.762.762,0,1,0,.762.762A.761.761,0,0,0,261.266,1989.614Z" transform="translate(-247.167 -1975.515)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1192" data-name="Shape 1192" d="M259,1986.162v-1.143a1.905,1.905,0,1,1,3.81,0v1.143" transform="translate(-246.81 -1973.969)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Download to License</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.89" height="16.927" viewBox="0 0 17.89 16.927">
                        <g id="icon-download" transform="translate(0.5 16.427) rotate(-90)">
                          <path id="Shape_111" data-name="Shape 111" d="M9,3.3V.734A.715.715,0,0,0,8.31,0H.692A.715.715,0,0,0,0,.734V16.156a.715.715,0,0,0,.692.734H8.31A.715.715,0,0,0,9,16.156v-2.57" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_112" data-name="Shape 112" d="M0,0H13.157" transform="translate(2.77 8.445)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                          <path id="Shape_113" data-name="Shape 113" d="M3.462,0,0,3.672,3.462,7.344" transform="translate(2.77 4.773)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                            <path id="Oval_12" data-name="Oval 12" d="M429,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,429,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_13" data-name="Oval 13" d="M434,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,434,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_14" data-name="Oval 14" d="M439,347.25a1.25,1.25,0,1,0-1.25-1.25A1.25,1.25,0,0,0,439,347.25Z" transform="translate(-1 -1)" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Oval_15" data-name="Oval 15" d="M433,355.5A10.5,10.5,0,1,0,422.5,345,10.5,10.5,0,0,0,433,355.5Z" fill="none" stroke="#6e7377" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Oval_67" data-name="Oval 67" d="M255.607,1411.542a1.047,1.047,0,1,0-1.108-1.045A1.078,1.078,0,0,0,255.607,1411.542Z" transform="translate(-250.067 -1397.608)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1172" data-name="Shape 1172" d="M248.5,1392.452h2a.732.732,0,0,1,.72.537l2.822,11.306H257" transform="translate(-248.5 -1392.452)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1173" data-name="Shape 1173" d="M265.656,1401.62l.8-2.251a.663.663,0,0,0-.1-.628.753.753,0,0,0-.6-.289H253.412" transform="translate(-249.783 -1394.272)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1174" data-name="Shape 1174" d="M255.293,1406.452h3.459" transform="translate(-250.274 -1396.698)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_68" data-name="Oval 68" d="M265.2,1412.419a3.489,3.489,0,1,0-3.694-3.483A3.594,3.594,0,0,0,265.2,1412.419Z" transform="translate(-251.895 -1396.395)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1175" data-name="Shape 1175" d="M266.5,1408.452v2.787" transform="translate(-253.201 -1397.305)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1176" data-name="Shape 1176" d="M264.5,1410.452h2.955" transform="translate(-252.679 -1397.912)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1972" data-name="Shape 1972" d="M528.887,3851.192v9a.693.693,0,0,1-.693.693h-9a.693.693,0,0,1-.692-.693v-9a.693.693,0,0,1,.692-.692h2.77" transform="translate(-518.5 -3844.96)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1973" data-name="Shape 1973" d="M537.5,3842.5l2.77,2.77-2.77,2.77" transform="translate(-524.343 -3842.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1974" data-name="Shape 1974" d="M536.887,3846.5h-6.578a3.808,3.808,0,0,0-3.809,3.809v1.039" transform="translate(-520.96 -3843.73)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                                <path id="Shape" d="M182.888,100.035v-2.03h.677a2.03,2.03,0,0,0,2.03-2.03v-2.03h1.9a.338.338,0,0,0,.32-.441c-1.269-3.927-2.186-8.143-6.375-8.909a6.759,6.759,0,0,0-8,5.856,6.583,6.583,0,0,0,2.678,5.935v3.646" transform="translate(-173.415 -84.471)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              </g>
                            </g>
                            <path id="Shape_186" data-name="Shape 186" d="M189.571,568.73V574.8" transform="translate(-9.341 -479.918)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            <path id="Shape_187" data-name="Shape 187" d="M192.636,571.73h-6.066" transform="translate(-9.373 -479.885)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
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
                              <path id="Shape_1219" data-name="Shape 1219" d="M592.722,1979.5v-7.621a.762.762,0,0,0-.762-.762H579.766a.761.761,0,0,0-.762.762v12.194a.762.762,0,0,0,.762.762h7.621" transform="translate(-579.004 -1971.114)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_234" data-name="Oval 234" d="M590.147,1983.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,590.147,1983.4Z" transform="translate(-581.383 -1973.493)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_235" data-name="Oval 235" d="M583.147,1984.4a1.143,1.143,0,1,0-1.143-1.143A1.144,1.144,0,0,0,583.147,1984.4Z" transform="translate(-579.718 -1973.731)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1220" data-name="Shape 1220" d="M585,1981.673v-4.379a.762.762,0,0,1,.552-.732l3.81-1.089a.762.762,0,0,1,.972.733v4.705" transform="translate(-580.431 -1972.144)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_236" data-name="Oval 236" d="M599.528,1993.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1993.162Z" transform="translate(-583.524 -1975.634)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_237" data-name="Oval 237" d="M599.528,1987.162a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,599.528,1987.162Z" transform="translate(-583.524 -1974.207)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Oval_238" data-name="Oval 238" d="M593.528,1990.662a1.524,1.524,0,1,0-1.524-1.524A1.525,1.525,0,0,0,593.528,1990.662Z" transform="translate(-582.097 -1975.039)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1221" data-name="Shape 1221" d="M595.728,1988.257l1.943-1.133" transform="translate(-582.983 -1974.923)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                              <path id="Shape_1222" data-name="Shape 1222" d="M595.85,1990.384l1.759.733" transform="translate(-583.012 -1975.698)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span>Stems</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="stickyMiniPlayer">
        <div className="fixed-container">
          <CustomAudioWave/>
        </div>
      </div>
      <DownloadTrack showModal={showModal} onCloseModal={handleClose} />
    </div>
    
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch('http://time.jsontest.com/', {
//     method: 'GET',
//   })
//   const data = await res.json()
//   return {
//     props: {
//       data,
//     },
//   }
// }
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(getFilters(req))
      await store.dispatch(getTracks(req))
    });

export default Search;
