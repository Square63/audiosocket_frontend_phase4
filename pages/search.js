import Alert from 'react-bootstrap/Alert';
import UploadTrack from "../components/modals/UploadTrack";
import DownloadTrack from "../components/modals/DownloadTrack";
import DownloadTrackLicense from "../components/modals/DownloadTrackLicense";
// import AddToCartLicense from "../components/modals/AddToCartLicense";
import AddToPlaylist from "../components/modals/AddToPlaylist";
import CustomAudioWave from "../components/CustomAudioWave";
import {useState, useEffect} from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import InpageLoader from '../components/InpageLoader';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import search from "../styles/Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../redux/store';
import { getFilters } from '../redux/actions/filterActions';
import { getTracks } from '../redux/actions/trackActions';
import { getPlaylists } from '../redux/actions/playlistActions';
import { getTracksFromAIMS } from '../redux/actions/trackActions';
import { addToFavorites } from '../redux/actions/trackActions';
import { removeFromFavorites } from '../redux/actions/trackActions';

import $ from 'jquery';
import Tracks from '../components/Tracks';
import RangeSlider from '../components/RangeSlider';
import { TOAST_OPTIONS } from '../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Search(props) {

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showChilderDiv, setShowChilderDiv] = useState(false);
  const [lastChildFilters, setLastChildFilters] = useState([]);
  const [appliedFiltersList, setAppliedFiltersList] = useState([]);
  const [appliedFiltersListWC, setAppliedFiltersListWC] = useState([]);
  // const [queryType, setQueryType] = useState("local_search")
  const [showDownModal, setShowDownModal] = useState(false)
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const [showAddToCartLicenseModal, setShowAddToCartLicenseModal] = useState(false)
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false)
	const [footerPlaying, setFooterPlaying] = useState(false)
  const [track, setTrack] = useState()
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [homeFilters, setHomeFilters] = useState([])
  const [favoriteTrackIds, setFavoriteTrackIds] = useState([])
  const [updatedTracks, setUpdateTracks] = useState([])
  const [trackName, setTrackName] = useState(localStorage.getItem("track_name"))

  // const message = useSelector(state => state.allPlaylists);

  useEffect(() => {
    
  }, [appliedFiltersListWC]);
  

  useEffect(() => {
    // handleAimsSearch()
    let trackName = localStorage.getItem("track_name")
    let trackId = localStorage.getItem("track_id")
    handleAddHomeFilter()
    if (trackName && trackId) {
      handleSimilarSearch(trackName, trackId)
      localStorage.removeItem("track_name")
      localStorage.removeItem("track_id")
    }
  }, []);



  const filters = useSelector( state => state.allFilters.filters[0])
  const allTracks = useSelector( state => state.allTracks)
  let tracks = ""
  let tracksMeta = ""
  if (allTracks && allTracks.tracks){
    tracks = allTracks.tracks[0].tracks
    tracksMeta = allTracks.tracks[0].meta
  }  
  console.log("Update Tracks", updatedTracks)
  
  console.log("Tracks META", tracksMeta)
  // const playlists = useSelector( state => state.allPlaylists)
  const favoritesMessage = useSelector( state => state.allTracks)

  // useEffect(() => {
  //   if (message.message) {
  //     if(!message?.success) {
  //       toast.error(message.message, TOAST_OPTIONS);
  //     } else {
  //       toast.success(message.message, TOAST_OPTIONS);
  //     }
  //   }
  // }, [playlists])

  useEffect(() => {
    if(!favoritesMessage?.success) {
      toast.error(favoritesMessage.message, TOAST_OPTIONS);
    } else {
      toast.success(favoritesMessage.message, TOAST_OPTIONS);
    }
  }, [favoritesMessage])

  useEffect(() => {
    if (tracks.length > 0) {
      setUpdateTracks(tracks)
    }

    let isMounted = true;
    setTimeout(function() {
      setLoading(false)
    }.bind(this), 1000);
    return () => {
      isMounted = false;
    };

    
  },[tracks, favoritesMessage]);

  const handleLoading = () => {
    setLoading(true)
  }
  
  const handleClose = (show) => {
    setShowModal(show)
  }

  function showDownloadModal(index) {
    setIndex(index)
    setShowDownModal(true)
  }

  const handleDownloadClose = (show) => {
    setShowDownModal(show)
  }

  function showDownloadLicenseModal() {
    setShowLicenseModal(true)
  }

  function handleLicenseModalClose() {
    setShowLicenseModal(false)
  }

  function showAddTrackToCartLicenseModal(index) {
    if (localStorage.getItem("user")) {
      if (index > 9) {
        setIndex(index%10)
      }
      else {
        setIndex(index)
      }
      setShowAddToCartLicenseModal(true)
    }
    else {
      alert("You must be logged in to be able to add a track to cart.")
    }
  }

  function handleAddToCartLicenseModalClose() {
    setShowAddToCartLicenseModal(false)
  }

  function showTrackAddToPlaylistModal(index) {
    if (localStorage.getItem("user")) {
      if (index > 9) {
        setIndex(index%10)
      }
      else {
        setIndex(index)
      }
      setShowAddToPlaylistModal(true)
    }
    else {
      alert("You must be logged in to be able to add a track to your playlists.")
    }
  }

  function handleAddToPlaylistModalClose() {
    setShowAddToPlaylistModal(false)
  }
  
  const handleSearch = async(e) => {
    setLoading(true)
    let query = document.getElementById("searchField").value
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    dispatch(getTracks(query, query_type(query), appliedFiltersList, "", "", 1, explicit, vocals));
  }

  const handleClearAllFilter = () => {
    hideAllFilterDiv()
  }

  function handleClearSingleFilter(e) {
    setLoading(true)
    let singleFilterText
    if (e.target.getAttribute("name") != null) {
      singleFilterText = e.target.getAttribute("name")
      e.target.closest("span").classList.add("disabled")
    } else {
      singleFilterText = e.target.previousElementSibling.textContent
    }
    let singleFilterTextWithoutCount = singleFilterText
    let elements = $( "a:contains("+singleFilterTextWithoutCount+")" );
    appliedFiltersList.splice(appliedFiltersList.indexOf(singleFilterTextWithoutCount), 1);

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].closest(".filterSelf")) {
        elements[i].closest(".filterSelf").classList.remove("activeFilter")
        elements[i].nextElementSibling.nextElementSibling.classList.add("disabled")
      }
    }

    if (e) {
      $("#filtersList>li").each((index, li) => {
        if (li.firstElementChild.firstElementChild.textContent == singleFilterText) {
          li.style.display = 'none';
          return;
        }
      });
      // e.target.parentElement.style.display = 'none';
      let length = $(".selectedFilter li:visible").length
      if (length == 0) {
        hideAllFilterDiv()
      }
    }
    let explicit = !document.getElementById("excludeExplicit").checked
    let vocals = document.getElementById("excludeVocals").checked
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), appliedFiltersList, "", "", 1, explicit, vocals));
  }

  function hideAllFilterDiv() {
    setLoading(true)
    localStorage.removeItem("genre")
    localStorage.removeItem("vocal")
    $(".filterSelf").removeClass("activeFilter");
    document.getElementById("filtersList").innerHTML = "";
    document.getElementsByClassName('selectedFilter')[0].style.display = 'none';
    let query = document.getElementById("searchField").value
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    dispatch(getTracks(query, query_type(query), [], "", "", 1, explicit, vocals));
  }

  const handleSimilarSearch = (trackName, trackId) => {
    setLoading(true)
    console.log("Track NAme", trackName)
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    appliedFiltersList.push(trackName)
    setAppliedFiltersListWC([...appliedFiltersListWC, trackName]);
    dispatch(getTracksFromAIMS(trackId));
  }

  const handleAddToFavorites = (e, trackId) => {
    if (localStorage.getItem("user")) {
      if (!favoriteTrackIds.includes(trackId) && !tracksMeta.favorite_tracks_ids.includes(trackId)) {
        setFavoriteTrackIds([...favoriteTrackIds, trackId])
        e.target.closest("a").classList.add("controlActive")
        dispatch(addToFavorites(trackId));
      }
      else {
        let newFavoriteIds = favoriteTrackIds.splice(favoriteTrackIds.indexOf(trackId), 1)
        e.target.closest("a").classList.remove("controlActive")
        setFavoriteTrackIds(newFavoriteIds)
        dispatch(removeFromFavorites(trackId));
      }
    }
    else {
      alert("You must be logged in to be able to add a track to your favorites.")
    }  
  }

  const handleAddFilter = async(e) => {
    setLoading(true)
    if (e.target.nextElementSibling == null) {
      e.target.parentElement.nextElementSibling.nextElementSibling
    } else {
      e.target.nextElementSibling.nextElementSibling.classList.remove("disabled")
    }

    e.target.closest('.filterSelf').classList.add('activeFilter')
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    appliedFiltersList.push(removeCount(e.currentTarget.text))
    setAppliedFiltersListWC([...appliedFiltersListWC, removeCount(e.currentTarget.text)]);
    let query = document.getElementById("searchField").value
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    dispatch(getTracks(query, query_type(query), getUniqFilters(appliedFiltersList), "", "", 1, explicit, vocals));
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
              partenID = x.id;
            }
          }
        )
      }
    );
    const parentIndex = filters.findIndex(x => x.id == partenID);
    const childIndex = filters[parentIndex].sub_filters.findIndex(x => x.id == filter);
    setLastChildFilters(filters[parentIndex].sub_filters[childIndex].sub_filters);

    setShowChilderDiv(true);
  }

  const handleAddHomeFilter = async(e) => {
    setLoading(true)
    let genre = localStorage.getItem('genre')
    let vocal = localStorage.getItem('vocal')
    let keyword = localStorage.getItem('keyword')
    document.getElementById("searchField").value = keyword
        
    genre ? appliedFiltersList.push(genre) : null
    vocal ? appliedFiltersList.push(vocal) : null
    if (genre && vocal) {
      document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
      setAppliedFiltersListWC([genre, vocal])
    } else if (genre) {
      document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
      setAppliedFiltersListWC([genre])
    } else if (vocal)  {
      document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
      setAppliedFiltersListWC([vocal])
    }
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), getUniqFilters(appliedFiltersList), "", "", 1));
  }

  const handleAimsSearch = () => {
    setLoading(true)
    document.getElementById("formFile").files[0] = localStorage.getItem("file")

    dispatch(getTracksFromAIMS());
  }

  console.log("Filters", filters)
  console.log("Tracks", tracks)
  // console.log("Playlists", playlists)

  function removeCount(filter) {
    return filter.substring(0, filter.indexOf(' ('));
  }

  function query_type(query) {
    if (query)
      return query.includes("https") ? "aims_search" : "local_search"
    else
      localStorage.removeItem("keyword")
  }

  const handleFooterTrack = (track) => {
    setFooterPlaying(!footerPlaying)
		setTrack(track)
    if (track) {
      console.log("track url", track.file)
    } 
  }

  
  function getUniqFilters(appliedFilters) {
    return appliedFilters.filter((v, i, a) => a.indexOf(v) === i);
  }

  const handleExcludeFilters = (e) => {
    setLoading(true)
    let explicit = !document.getElementById("excludeExplicit").checked
    let vocals = document.getElementById("excludeVocals").checked
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), appliedFiltersList, "", "", 1, explicit, vocals));
    
  }
  
  const filterItems = filters.map((filter, index) =>
    <Dropdown alignRight className={filter.name === "Moods" ? "d-inline mood" : filter.name === "Tempos" ? "d-inline durationTempo" : "d-inline"} key={index}>
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {filter.name == "Tempos" ? "Duration / Tempo" : filter.name}
      </Dropdown.Toggle>
        {( filter.name == "Tempos" ?
          (<Dropdown.Menu>
            <div className="filterWrapper durationBlock">
              <h3>Duration</h3>
             <RangeSlider/>
              <div className="filterSelf">
                <Dropdown.Item href="#" className="durationFilter">00:00 - 00:00</Dropdown.Item>
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

            </div>
            <div className="filterSibling filterWrapper">
              <h3>Tempo</h3>
              {filter.sub_filters.map((sub_filter, index) =>
                <>
                  <div className="filterSelf">
                    <Dropdown.Item href="#" onClick={handleAddFilter}>{sub_filter.name} <span>({sub_filter.track_count})</span></Dropdown.Item>
                    <span className={`filterControl addFilter ${sub_filter.sub_filters.length <= 0 ? "disabled" : ""}`} onClick={handleAddChildrenFilter} id={sub_filter.id}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10" id={sub_filter.id}>
                        <g id="icon-plus" transform="translate(-1.669 -4.355)">
                          <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                          <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                        </g>
                      </svg>
                    </span>

                    <span className="filterControl discardFilter disabled" onClick={handleClearSingleFilter} name={sub_filter.name+' ('+sub_filter.track_count+')'}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" name={sub_filter.name+' ('+sub_filter.track_count+')'}>
                        <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1" name={sub_filter.name+' ('+sub_filter.track_count+')'}>
                          <circle cx="5" cy="5" r="5" stroke="none" name={sub_filter.name+' ('+sub_filter.track_count+')'}/>
                          <circle cx="5" cy="5" r="4.5" fill="none" name={sub_filter.name+' ('+sub_filter.track_count+')'}/>
                        </g>
                        <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1" name={sub_filter.name+' ('+sub_filter.track_count+')'}/>
                      </svg>
                    </span>
                  </div>
                </>
              )}
            </div>
          </Dropdown.Menu>)
        :
        (<Dropdown.Menu >
          <div className="filterWrapper">
            {filter.sub_filters.map((sub_filter, index) =>
              <>
                <div className="filterSelf">
                  <Dropdown.Item href="#" onClick={handleAddFilter}>{sub_filter.name} <span>({sub_filter.media_count})</span></Dropdown.Item>
                  <span className={`filterControl addFilter ${sub_filter.sub_filters.length <= 0 ? "disabled" : ""}`} onClick={handleAddChildrenFilter} id={sub_filter.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10" id={sub_filter.id}>
                      <g id="icon-plus" transform="translate(-1.669 -4.355)">
                        <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                        <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                      </g>
                    </svg>
                  </span>

                  <span className="filterControl discardFilter disabled" onClick={handleClearSingleFilter} name={sub_filter.name+' ('+sub_filter.media_count+')'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" name={sub_filter.name+' ('+sub_filter.media_count+')'}>
                      <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1" name={sub_filter.name+' ('+sub_filter.media_count+')'}>
                        <circle cx="5" cy="5" r="5" stroke="none" name={sub_filter.name+' ('+sub_filter.media_count+')'}/>
                        <circle cx="5" cy="5" r="4.5" fill="none" name={sub_filter.name+' ('+sub_filter.media_count+')'}/>
                      </g>
                      <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1" name={sub_filter.name+' ('+sub_filter.media_count+')'}/>
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
                      <Dropdown.Item href="#" onClick={handleAddFilter}>{sub_filter.name} <span>({sub_filter.media_count})</span></Dropdown.Item>
                      <span className="filterControl addFilter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10">
                          <g id="icon-plus" transform="translate(-1.669 -4.355)">
                            <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                            <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                          </g>
                        </svg>
                      </span>

                      <span className="filterControl discardFilter" onClick={handleClearSingleFilter} name={sub_filter.name+' ('+sub_filter.media_count+')'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" name={sub_filter.name+' ('+sub_filter.media_count+')'}>
                          <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1" name={sub_filter.name+' ('+sub_filter.media_count+')'}>
                            <circle cx="5" cy="5" r="5" stroke="none" name={sub_filter.name+' ('+sub_filter.media_count+')'}/>
                            <circle cx="5" cy="5" r="4.5" fill="none" name={sub_filter.name+' ('+sub_filter.media_count+')'}/>
                          </g>
                          <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1" name={sub_filter.name+' ('+sub_filter.track_count+')'}/>
                        </svg>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </>
          }
        </Dropdown.Menu>)

        )}
           
      
        
        
    </Dropdown>
  );
  
  return (
    <div className={search.searchWrapper}>
      <Alert variant="success" className="brandAlert">
        <Form.Group type="hidden" controlId="formFile" className="uploadComponent" style={{display: 'none'}}>
          <Form.Control type="file" />
        </Form.Group>
        <div className="fixed-container">
          <p>
            Special Offer! 20% off all spooky tracks for the month of December!
          </p>
        </div>
      </Alert>
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
      <div className="fixed-container">
        <h1 className={search.pageHeading}>Search Music</h1>
        <div className={search.searchUploadStuff}>
          <Form className="stickySearch largeStuff haveIcon" onSubmit={e => { e.preventDefault(); }}>
            <Form.Control type="text" placeholder="Search by YouTube link, Spotify song link, or Keyword" onChange={handleSearch} id="searchField" />
            <Button variant="default" type="submit" className="btnMainLarge stickyBtn" onClick={handleSearch}>Search</Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="" width="22.414" height="22.414" viewBox="0 0 22.414 22.414">
              <g id="icon-magnifying-glass" transform="translate(1 1)">
                <path id="Path_1" data-name="Path 1" d="M305.541,309.272a8.271,8.271,0,1,0-8.271,8.27A8.272,8.272,0,0,0,305.541,309.272Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" strokLinecap="round" strokeWidth="2"/>
                <line id="Line_2" data-name="Line 2" x2="5.989" y2="5.866" transform="translate(14.011 14.134)" fill="none" stroke="#c1d72e" strokLinecap="round" strokeWidth="2"/>
              </g>
            </svg>
          </Form>
          <a href="javascript:void(0)" className="btn btnMainXlarge" onClick={() => setShowModal(true)}>
            <span>Upload a Track</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17.465" height="16.526" viewBox="0 0 17.465 16.526">
              <g id="icon-upload" transform="translate(16.965 0.5) rotate(90)">
                <path id="Shape_111" data-name="Shape 111" d="M8.775,3.221V.716A.7.7,0,0,0,8.1,0H.675A.7.7,0,0,0,0,.716V15.749a.7.7,0,0,0,.675.716H8.1a.7.7,0,0,0,.675-.716V13.244" fill="none" stroke="#1a1c1d" strokLinecap="round" strokeWidth="1"/>
                <path id="Shape_112" data-name="Shape 112" d="M0,0H12.826" transform="translate(2.7 8.233)" fill="none" stroke="#1a1c1d" strokLinecap="round" strokeWidth="1"/>
                <path id="Shape_113" data-name="Shape 113" d="M3.375,0,0,3.579,3.375,7.159" transform="translate(2.7 4.653)" fill="none" stroke="#1a1c1d" strokLinecap="round" strokeWidth="1"/>
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
                    <input type="checkbox" id="excludeExplicit" onChange={(e) => handleExcludeFilters(e)}/>
                    <Form.Label htmlFor="excludeExplicit">&nbsp;</Form.Label>
                    <span className="switchText">Exclude Explicit</span>
                  </div>
                  <div className="toogleSwitch">
                    <input type="checkbox" id="youtubeContent" />
                    <Form.Label htmlFor="youtubeContent">&nbsp;</Form.Label>
                    <span className="switchText">YouTube ContentID Cleared</span>
                  </div>
                  <div className="toogleSwitch">
                    <input type="checkbox" id="excludeVocals" onChange={(e) => handleExcludeFilters(e)}/>
                    <Form.Label htmlFor="excludeVocals">&nbsp;</Form.Label>
                    <span className="switchText">Exclude Vocals</span>
                  </div>
                </form>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="selectedFilter brandWall">
          <ul id="filtersList">
            {appliedFiltersListWC.map((item,index)=> {
              return (<li key={index}>
                <span className="tagText"><div>{item}</div></span>
                <span className="clearTag" onClick={handleClearSingleFilter}></span>
              </li>)
            })}
          </ul>
          <OverlayTrigger overlay={<Tooltip>Clear All</Tooltip>}>
            <span className="clearAllTag" onClick={handleClearAllFilter}></span>
          </OverlayTrigger>
        </div>

        {loading ? (
          <InpageLoader />
        ) : (
          <Tracks appliedFiltersList={appliedFiltersList} tracks={tracks} tracksMeta={tracksMeta} showTrackAddToPlaylistModal={showTrackAddToPlaylistModal} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} handleFooterTrack={handleFooterTrack} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites}/>
        )}
      </div>

      {/* <div className="stickyMiniPlayer">
        <div className="fixed-container">
          <CustomAudioWave footerPlaying={footerPlaying} footer={true} handleFooterTrack={handleFooterTrack} footerTrack={track} />
        </div>
      </div> */}
      <UploadTrack showModal={showModal} onCloseModal={handleClose} loading={handleLoading} />
      <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={tracks[index]} />
      <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
      {/* <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={tracks[index]} /> */}
      {/* <AddToPlaylist showModal={showAddToPlaylistModal} onCloseModal={handleAddToPlaylistModalClose} playlists={playlists} track={updatedTracks[index]}/> */}
      
    </div>
    
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(getFilters(req))
      // await store.dispatch(getPlaylists(req))
      await store.dispatch(getTracks("", "local_search", [], "", "", 1))
    });

export default Search;
