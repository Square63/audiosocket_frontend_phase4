import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import UploadTrack from "../components/modals/UploadTrack";
import DownloadTrack from "../components/modals/DownloadTrack";
import DownloadTrackLicense from "../components/modals/DownloadTrackLicense";
import AddToCartLicense from "../components/modals/AddToCartLicense";
import AddToPlaylist from "../components/modals/AddToPlaylist";
import {useState, useEffect, useContext} from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, Card, DropdownButton, CloseButton } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from 'react-bootstrap/Accordion';
import InpageLoader from '../components/InpageLoader';
import { useRouter } from "next/router";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import search from "../styles/Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../redux/store';
import { getFilters } from '../redux/actions/filterActions';
import { getTracks } from '../redux/actions/trackActions';
import { getMyPlaylists } from '../redux/actions/authActions';
import { getTracksFromAIMS } from '../redux/actions/trackActions';
import { getArtistTracks } from '../redux/actions/trackActions';
import { addToFavorites } from '../redux/actions/trackActions';
import { removeFromFavorites } from '../redux/actions/trackActions';
import { getSegmentTracksFromAIMS } from '../redux/actions/trackActions';
import { attachToMedia } from '../redux/actions/trackActions';
import {AuthContext} from "../store/authContext";
import Notiflix from "notiflix";


import $ from 'jquery';
import Tracks from '../components/Tracks';
import RangeSlider from '../components/RangeSlider';
import { TOAST_OPTIONS } from '../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import SearchAudioWave from '../components/SearchAudioWave';
import { Sticky, StickyScrollUp, StickyProvider } from 'react-stickup';
import dynamic from 'next/dynamic'

const CustomAudioWave = dynamic(
  () => import('../components/CustomAudioWave'),
  { ssr: false }
)

function Search(props) {
  const router = useRouter();
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
  const [updatedTracks, setUpdatedTracks] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [durationFilter, setDurationFilter] = useState({start:0, end: 0})
  const [sidebarType, setSidebarType] = useState("")
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [altVersionTrack, setAltVersionTrack] = useState(null);
  const authContext = useContext(AuthContext);
  const container = React.createRef();

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
  const cartItem = useSelector( state => state.user.cart)

  let tracks = ""
  let tracksMeta = ""
  if (allTracks && allTracks.tracks){
    tracks = allTracks.tracks[0].tracks
    tracksMeta = allTracks.tracks[0].meta
    if (tracksMeta.favorite_tracks_ids && tracksMeta.favorite_tracks_ids.length > 0 && favoriteTrackIds.length == 0)
      setFavoriteTrackIds(tracksMeta.favorite_tracks_ids)
  }
  console.log("Update Tracks", updatedTracks)

  console.log("Tracks META", tracksMeta)

  const favoritesMessage = useSelector( state => state.allTracks)

  useEffect(() => {
    if (cartItem && cartItem.id){
      toast.success("License has been added to cart successfully.")
    } else {
      toast.error(cartItem)
    }
  }, [cartItem]);

  useEffect(() => {
    if (allTracks.errorMessage && allTracks.errorMessage.includes("Validation failed")){
      toast.error(allTracks?.errorMessage, TOAST_OPTIONS);
    } else if (allTracks.responseStatus == 422) {
      window.localStorage.clear();
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    }
  }, [allTracks.error]);

  useEffect(() => {
    if(!favoritesMessage?.success) {
      toast.error(favoritesMessage.message, TOAST_OPTIONS);
    } else {
      toast.success(favoritesMessage.message, TOAST_OPTIONS);
    }
  }, [favoritesMessage])

  useEffect(() => {
    if (tracks.length > 0) {
      if (updatedTracks[0]?.id != tracks[0].id)
        setUpdatedTracks(updatedTracks => [...updatedTracks, ...tracks]);
    }

    let isMounted = true;
    setTimeout(function() {
      setLoading(false)
    }.bind(this), 1000);
    return () => {
      isMounted = false;
    };

  }, [tracks]);

  const handleLoading = () => {
    setLoading(true)
  }

  const handleClose = (show) => {
    setShowModal(show)
  }

  function showDownloadModal(index, type) {
    if (localStorage.getItem("user")) {
      if (type == "track") {
        setAltVersionTrack(null)
        setIndex(index)
      }
      else {
        setAltVersionTrack(index)
      }
      setShowDownModal(true)
    }
    else {
      Notiflix.Report.failure('Alert', 'You must be logged in to be able to add a track to cart.', 'Ok');
    }
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

  function showAddTrackToCartLicenseModal(index, type) {
    setIndex(index)
    if (localStorage.getItem("user")) {
      if (type == "track") {
        setAltVersionTrack(null)
      }
      else {
        setAltVersionTrack(index)
      }
      if (typeof(localStorage.getItem("has_subscription")) !== undefined) {
        if (JSON.parse(localStorage.getItem("has_subscription"))) {
          authContext.handleAddToCart(type == "track" ? updatedTracks[index].id : index.id, "Track", "");
        } else {
          setShowSidebar(true)
          setSidebarType("cart")
        }
      }
    }
    else {
      setShowSidebar(true)
      setSidebarType("login")
    }
  }

  function addTrackToCartLicenseModalSidebar(index) {
    setShowSidebar(false)
    setShowAddToCartLicenseModal(true)
  }

  function handleAddToCartLicenseModalClose() {
    setShowAddToCartLicenseModal(false)
  }

  function showTrackAddToPlaylistModal(index, type) {
    if (localStorage.getItem("user")) {
      if (type == "track") {
        setAltVersionTrack(null)
        setIndex(index)
      }
      else {
        setAltVersionTrack(index)
      }
      setShowAddToPlaylistModal(true)
    }
    else {
      Notiflix.Report.failure('Alert', 'You must be logged in to be able to add a track to your playlists.', 'Ok');
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

  const handleUploadSearch = (url, start, end) => {
    setLoading(true)
    dispatch(getSegmentTracksFromAIMS(url, start, end));
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
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), appliedFiltersList, "", "", 1, explicit, vocals));
  }

  function startLoaderAndHideDiv() {
    setLoading(true)
    localStorage.removeItem("genre")
    localStorage.removeItem("vocal")
    $(".filterSelf").removeClass("activeFilter");
    document.getElementById("filtersList").innerHTML = "";
    document.getElementsByClassName('selectedFilter')[0].style.display = 'none';
  }

  function hideAllFilterDiv() {
    startLoaderAndHideDiv()
    let query = document.getElementById("searchField").value
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    setAppliedFiltersList([])
    dispatch(getTracks(query, query_type(query), [], "", "", 1, explicit, vocals));
  }

  const handleSimilarSearch = (trackName, trackId) => {
    hideAllFilterDiv()
    console.log("Track NAme", trackName)
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    appliedFiltersList.push(trackName)
    setAppliedFiltersListWC([...appliedFiltersListWC, trackName]);
    dispatch(getTracksFromAIMS(trackId));
  }

  const handleTrackSearchOfArtist = (artistId, artistName) => {
    startLoaderAndHideDiv()
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    appliedFiltersList.push(artistName)
    setAppliedFiltersListWC([...appliedFiltersListWC, artistName]);
    dispatch(getArtistTracks(artistId));
  }

  const handleAddToFavorites = (e, trackId) => {
    // setLoading(true)
    if (localStorage.getItem("user")) {
      if (!favoriteTrackIds.includes(trackId)) {
        setFavoriteTrackIds([...favoriteTrackIds, trackId])
        e.target.closest("a").classList.add("controlActive")
        dispatch(addToFavorites(trackId));
      }
      else {
        favoriteTrackIds.splice(favoriteTrackIds.indexOf(trackId), 1)
        e.target.closest("a").classList.remove("controlActive")
        setFavoriteTrackIds(favoriteTrackIds)
        dispatch(removeFromFavorites(trackId));
      }
    }
    else {
      setShowSidebar(true)
      setSidebarType("login")
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

  const handleAddDurationFilter = async (start, end) => {
    setLoading(true)
    setDurationFilter({start: start, end: end})
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    setAppliedFiltersListWC([...appliedFiltersListWC, document.getElementsByClassName('durationFilter')[0].text]);
    let query = document.getElementById("searchField").value
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    dispatch(getTracks(query, query_type(query), getUniqFilters(appliedFiltersList), "", "", 1, explicit, vocals, start, end));
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
    if (filter.split('(').length - 1 == 1)
      return filter.substring(0, filter.split(' (', 1).join(' (').length);
    else
      return filter.substring(0, filter.split(' (', 2).join(' (').length);
  }

  function query_type(query) {
    if (query)
      return query.includes("https") ? "aims_search" : "local_search"
    else
      localStorage.removeItem("keyword")
  }

  const handleFooterTrack = (track) => {
    // setFooterPlaying(!footerPlaying)
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

  const handleSidebarHide = () => {
    setShowSidebar(false)
  }

  const handleLicenseClick = (e, trackId, licenseId) => {
    if (licenseId) {
      e.preventDefault()
      dispatch(attachToMedia(trackId, licenseId));
    }
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
            <RangeSlider handleAddDurationFilter={handleAddDurationFilter}/>
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
    <StickyProvider>
      <div className={search.searchWrapper+' musicSearch'}>
        {/* <Alert variant="success" className="brandAlert">
          <Form.Group type="hidden" controlId="formFile" className="uploadComponent" style={{display: 'none'}}>
            <Form.Control type="file" />
          </Form.Group>
          <div className="fixed-container">
            <p>
              Special Offer! 20% off all spooky tracks for the month of December!
            </p>
          </div>
        </Alert> */}
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
              <Form.Control type="text" placeholder="Search by YouTube link, Spotify song link, or Keyword" id="searchField" />
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
          <div ref={container}>
            <Sticky container={container} className="stickUp" defaultOffsetTop={70}>
              <div className="filterBar brandWall desktopShow">
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
            </Sticky>



          <div className="mobileShow">
            <div className="mobileFilters">
              <Button
                variant="link"
                onClick={() => setFilterOpen(!filterOpen)}
                aria-controls="example-collapse-text"
                aria-expanded={filterOpen}
                className="filterLauncher"
              >
                Filters
                <svg xmlns="http://www.w3.org/2000/svg" width="10.145" height="6.133" viewBox="0 0 10.145 6.133">
                  <g id="icon-arrow-down" transform="translate(9.084 5.072) rotate(180)">
                    <path id="Shape_1939" data-name="Shape 1939" d="M336.194,2401.259l-4.012-4.011" transform="translate(-332.182 -2397.247)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2401.259l4.012-4.011" transform="translate(-330.42 -2397.247)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  </g>
                </svg>
              </Button>
              <Collapse in={filterOpen}>
                <div id="example-collapse-text" className='collapseBody'>
                  <div className="filterShowCase">
                    <div className="frontLineFilters">
                      <ul>
                        <li><a href="javascript:void(0)">Genres</a></li>
                        <li><a href="javascript:void(0)">Moods</a></li>
                        <li><a href="javascript:void(0)">Themes</a></li>
                        <li><a href="javascript:void(0)">Vocals</a></li>
                        <li><a href="javascript:void(0)">Instruments</a></li>
                        <li><a href="javascript:void(0)">Settings</a></li>
                      </ul>
                    </div>
                    <div className="secondLineFilters">
                      {/* <Button
                        variant="link"
                        onClick={() => setFilterTypeOpen(!filterTypeOpen)}
                        aria-controls="example-collapse-text1"
                        aria-expanded={filterTypeOpen}
                      >
                        filter
                      </Button>
                      <Collapse in={filterTypeOpen}>
                        <div id="example-collapse-text1">
                          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                          terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                          labore wes anderson cred nesciunt sapiente ea proident.
                        </div>
                      </Collapse> */}

                      <Accordion>
                        <ul>
                          <li className='filterDropdown filterSelected'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                              Ambient
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="0">
                              <ul className='filterDropdownBody'>
                                <li><a href="javascript:void(0)">50’s Rock <span>(4)</span></a></li>
                                <li><a href="javascript:void(0)">60’s Rock <span>(34)</span></a></li>
                                <li><a href="javascript:void(0)">Alternative Rock <span>(78)</span></a></li>
                                <li><a href="javascript:void(0)">Cabaret <span>(2)</span></a></li>
                                <li><a href="javascript:void(0)">Death Metal <span>(19)</span></a></li>
                                <li><a href="javascript:void(0)">Emo <span>(23)</span></a></li>
                                <li><a href="javascript:void(0)">Hard Rock <span>(162)</span></a></li>
                                <li><a href="javascript:void(0)">Heavy Metal <span>(45)</span></a></li>
                                <li><a href="javascript:void(0)">Indie Rock <span>(432)</span></a></li>
                              </ul>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Avant-Garde
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="1">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown' >
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                              Bluegrass
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="3">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown' >
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                Blues
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="4">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                Cajun
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="5">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="6">
                                Cinematic
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="6">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="7">
                                Rock
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="7">
                              <ul className='filterDropdownBody'>
                                <li><a href="javascript:void(0)">50’s Rock <span>(4)</span></a></li>
                                <li><a href="javascript:void(0)">60’s Rock <span>(34)</span></a></li>
                                <li><a href="javascript:void(0)">Alternative Rock <span>(78)</span></a></li>
                                <li><a href="javascript:void(0)">Cabaret <span>(2)</span></a></li>
                                <li><a href="javascript:void(0)">Death Metal <span>(19)</span></a></li>
                                <li><a href="javascript:void(0)">Emo <span>(23)</span></a></li>
                                <li><a href="javascript:void(0)">Hard Rock <span>(162)</span></a></li>
                                <li><a href="javascript:void(0)">Heavy Metal <span>(45)</span></a></li>
                                <li><a href="javascript:void(0)">Indie Rock <span>(432)</span></a></li>
                              </ul>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="8">
                                Country
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="8">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="9">
                                Downtempo
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="9">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="10">
                                Easy Listening
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="10">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="11">
                                Electronic
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="11">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                          <li className='filterDropdown'>
                            <div className='filterDropdownlabel'>
                              <Accordion.Toggle as={Button} variant="link" eventKey="12">
                                Film & TV
                              </Accordion.Toggle>
                            </div>
                            <Accordion.Collapse eventKey="12">
                              <div className='filterDropdownBody'>Hello! I&apos;m the body</div>
                            </Accordion.Collapse>
                          </li>
                        </ul>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </Collapse>
            </div>
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
          {tracksMeta.aims_segment_search_track &&
            <div className="singleWave"><SearchAudioWave uploadedFileUrl={tracksMeta.aims_segment_search_track} handleUploadSearch={handleUploadSearch} /></div>
          }
          {loading ? (
            <InpageLoader />
          ) : (
            <Tracks appliedFiltersList={appliedFiltersList} tracks={tracks} duration={durationFilter} tracksMeta={tracksMeta} showTrackAddToPlaylistModal={showTrackAddToPlaylistModal} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} handleFooterTrack={handleFooterTrack} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites} favoriteTrackIds={favoriteTrackIds} handleTrackSearchOfArtist={handleTrackSearchOfArtist}/>
          )}
        </div>

        <div className="stickyMiniPlayer">
          <div className="fixed-container">
            <CustomAudioWave footerPlaying={footerPlaying} footer={true} handleFooterTrack={handleFooterTrack} footerTrack={updatedTracks[index]} />
          </div>
        </div>

        <UploadTrack showModal={showModal} onCloseModal={handleClose} loading={handleLoading} />
        <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]} type="track"/>
        <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
        <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]} handleLicenseClick={handleLicenseClick} />
        {localStorage.getItem("user") && <AddToPlaylist showModal={showAddToPlaylistModal} onCloseModal={handleAddToPlaylistModalClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]}/> }
        <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={altVersionTrack ? altVersionTrack : updatedTracks[index]} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar}/>

        </div>
      </div>
    </StickyProvider>

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
