import * as React from 'react';
import DownloadTrack from "../components/modals/DownloadTrack";
import DownloadTrackLicense from "../components/modals/DownloadTrackLicense";
import {useState, useEffect, useContext} from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import InpageLoader from '../components/InpageLoader';
import Collapse from 'react-bootstrap/Collapse';
import Accordion from 'react-bootstrap/Accordion';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import search from "../styles/Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../redux/store';
import { getSfxFilters } from '../redux/actions/filterActions';
import { getSfxes } from '../redux/actions/trackActions';
import { getTracksFromAIMS } from '../redux/actions/trackActions';
import { addToFavorites } from '../redux/actions/trackActions';
import { removeFromFavorites } from '../redux/actions/trackActions';
import { useRouter } from "next/router";
import $ from 'jquery';
import Tracks from '../components/Tracks';
import RangeSlider from '../components/RangeSlider';
import { TOAST_OPTIONS } from '../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import Notiflix from "notiflix";
import { Sticky, StickyProvider } from 'react-stickup';
import {AuthContext} from "../store/authContext";
import AddToCartLicense from "../components/modals/AddToCartLicense";
import AddToPlaylist from "../components/modals/AddToPlaylist";

function Sfx(props) {

  const dispatch = useDispatch();
  const router = useRouter();
  // const [showModal, setShowModal] = useState(false);
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
  const [trackName, setTrackName] = useState(localStorage.getItem("track_name"))
  const [showSidebar, setShowSidebar] = useState(false)
  const [sidebarType, setSidebarType] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [parentFilter, setParentFilter] = useState("")
  const [lastSearchQuery, setLastSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false);
  const [durationFilter, setDurationFilter] = useState({ start: 0, end: 0 })
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [altVersionTrack, setAltVersionTrack] = useState(null);
  const container = React.createRef();
  const authContext = useContext(AuthContext);

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
  const cartItem = useSelector( state => state.user.cart)
  let tracks = ""
  let tracksMeta = ""
  if (allTracks && allTracks.tracks){
    tracks = allTracks.tracks[0].sfxes
    tracksMeta = allTracks.tracks[0].meta
    if (tracksMeta.favorite_sfx_ids && tracksMeta.favorite_sfx_ids.length > 0 && favoriteTrackIds.length == 0)
      setFavoriteTrackIds(tracksMeta.favorite_sfx_ids)
  }
  console.log("Update Tracks", updatedTracks)

  console.log("Tracks META", tracksMeta)
  // const playlists = useSelector( state => state.allPlaylists)
  const favoritesMessage = useSelector( state => state.allTracks)

  useEffect(() => {
    if (cartItem && cartItem.id){
      toast.success("Sfx added to the cart successfully!")
    } else {
      toast.error(cartItem)
    }
  }, [cartItem]);

  useEffect(() => {
    if (allTracks.responseStatus == 422) {
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
    window.analytics.identify("Landed on search", {

    username: "ammanda",

    email: "ammanda.asif@square63.org",

    });
    if (tracks.length > 0) {
      if (updatedTracks[0]?.id != tracks[0].id && updatedTracks[updatedTracks.length -10]?.id != tracks[0].id)
        setUpdatedTracks(updatedTracks => [...updatedTracks, ...tracks]);
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

  function showDownloadModal(index, type) {
    if (localStorage.getItem("user")) {
      if (type == "sfx") {
        setAltVersionTrack(null)
        setIndex(index)
      }
      else {
        setAltVersionTrack(index)
      }
      setShowDownModal(true)
    }
    else {
      Notiflix.Report.failure('Alert', 'You must be logged in to be able to download a track.', 'Ok');
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
      if (type == "track" || "sfx") {
        setAltVersionTrack(null)
      }
      else {
        setAltVersionTrack(index)
      }
      if (typeof(localStorage.getItem("has_subscription")) !== undefined) {
        if (JSON.parse(localStorage.getItem("has_subscription"))) {
          if (type == "footer")
            authContext.handleAddToCart(index, type, "");
          else
            authContext.handleAddToCart(updatedTracks[index].id, type.charAt(0).toUpperCase() + type.slice(1), "");
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
      if (type == "track" || type == "sfx") {
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
    setUpdatedTracks([])
    setLastSearchQuery(searchQuery)
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked

    if (searchQuery && !lastSearchQuery) {
      setAppliedFiltersListWC([...appliedFiltersListWC, searchQuery]);
      document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    } else if (searchQuery && lastSearchQuery) {
      appliedFiltersListWC.splice(appliedFiltersListWC.indexOf(lastSearchQuery), 1);
      setAppliedFiltersListWC([...appliedFiltersListWC, searchQuery]);
    }

    if (!searchQuery && lastSearchQuery) {
      appliedFiltersListWC.splice(appliedFiltersListWC.indexOf(lastSearchQuery), 1);
      $(".filterSelf").removeClass("activeFilter");
      if (appliedFiltersListWC.length == 0)
        document.getElementsByClassName('selectedFilter')[0].style.display = 'none';
      dispatch(getSfxes('', 'local_search', appliedFiltersList, "", "", 1, explicit, vocals));
    } else {
      dispatch(getSfxes(searchQuery, 'local_search', appliedFiltersList, "", "", 1, explicit, vocals));
    }
  }

  const handleClearAllFilter = () => {
    setLastSearchQuery('')
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
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked

    if (singleFilterText !== searchQuery) {
      let singleFilterTextWithoutCount = singleFilterText
      let elements = $( "a:contains("+singleFilterTextWithoutCount+")" );
      appliedFiltersList.splice(appliedFiltersList.indexOf(removeCount(singleFilterTextWithoutCount)), 1);
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].closest(".filterSelf")) {
          elements[i].closest(".filterSelf").classList.remove("activeFilter")
          elements[i].nextElementSibling?.nextElementSibling?.classList?.add("disabled")
        }
      }
    }

    if (e) {
      $("#filtersList>li").each((index, li) => {
        if (li.firstElementChild.firstElementChild.textContent == removeCount(singleFilterText)) {
          li.style.display = 'none';
          return;
        }
      });
      // e.target.parentElement.style.display = 'none';
      let length = $(".selectedFilter li:visible").length
      if (length == 0) {
        hideAllFilterDiv()
      } else if (singleFilterText === searchQuery) {
        setSearchQuery('')
        dispatch(getSfxes('', 'local_search', appliedFiltersList, "", "", 1, explicit, vocals));
      } else {
        dispatch(getSfxes(searchQuery, 'local_search', appliedFiltersList, "", "", 1, explicit, vocals));
      }
    }
    setUpdatedTracks([])
  }

  function hideAllFilterDiv() {
    setLoading(true)
    localStorage.removeItem("genre")
    localStorage.removeItem("vocal")
    $(".filterSelf").removeClass("activeFilter");
    document.getElementById("filtersList").innerHTML = "";
    document.getElementsByClassName('selectedFilter')[0].style.display = 'none';
    setSearchQuery('')
    setLastSearchQuery('')
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    setAppliedFiltersList([])
    setUpdatedTracks([])
    dispatch(getSfxes('', 'local_search', [], "", "", 1, explicit, vocals));
  }

  const handleSimilarSearch = (trackName, trackId) => {
    setLoading(true)
    hideAllFilterDiv()
    setLastSearchQuery('')
    console.log("Track NAme", trackName)
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    appliedFiltersList.push(trackId)
    setAppliedFiltersListWC([...appliedFiltersListWC, trackName]);
    setUpdatedTracks([])
    dispatch(getTracksFromAIMS(trackId));
  }

  const handleAddToFavorites = (e, trackId) => {
    if (localStorage.getItem("user")) {
      if (!favoriteTrackIds.includes(trackId) && !tracksMeta.favorite_sfx_ids.includes(trackId)) {
        setFavoriteTrackIds([...favoriteTrackIds, trackId])
        e.target.closest("a").classList.add("controlActive")
        dispatch(addToFavorites(trackId, "sfx"));
      }
      else {
        favoriteTrackIds.splice(favoriteTrackIds.indexOf(trackId), 1)
        e.target.closest("a").classList.remove("controlActive")
        setFavoriteTrackIds(favoriteTrackIds)
        dispatch(removeFromFavorites(trackId, "sfx"));
      }
    }
    else {
      setShowSidebar(true)
      setSidebarType("login")
    }
  }

  const handleAddFilter = async (e, filterId, type) => {
    setLoading(true)
    if (e.target.nextElementSibling == null) {
      e.target.parentElement.nextElementSibling?.nextElementSibling?.classList?.remove("disabled")
    } else {
      if (parentFilter == "Sound Design" || type == "childFilter")
        e.target.nextElementSibling.classList.remove("disabled")
      else
        e.target.nextElementSibling.nextElementSibling.classList.remove("disabled")
    }

    e.target.closest('.filterSelf').classList.add('activeFilter')
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    appliedFiltersList.push(filterId)
    setAppliedFiltersListWC([...appliedFiltersListWC, removeCount(e.currentTarget.text)]);
    let query = document.getElementById("searchField").value
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    setUpdatedTracks([])
    dispatch(getSfxes(query, query_type(query), getUniqFilters(appliedFiltersList), "", "", 1, explicit, vocals));
  }

  const handleAddDurationFilter = async (start, end) => {
    setLoading(true)
    setDurationFilter({ start: start, end: end })
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    setAppliedFiltersListWC([...appliedFiltersListWC, document.getElementsByClassName('durationFilter')[0].text]);
    let query = document.getElementById("searchField").value
    let explicit = !document.getElementById("excludeExplicit")?.checked
    let vocals = document.getElementById("excludeVocals")?.checked
    setUpdatedTracks([])
    dispatch(getSfxes(query, query_type(query), getUniqFilters(appliedFiltersList), "", "", 1, explicit, vocals, start, end));
  }

  const handleAddChildrenFilter = (e) => {
    $(".custom").removeClass("activeFilter");
    $(".filterSelf>span").each((index, span) => {
      span.classList.remove('disabled')
    });
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
      setAppliedFiltersListWC([filters[1].sub_filters.filter(filter => filter.id == genre)[0].name, filters[0].sub_filters.filter(filter => filter.id == vocal)[0].name])
    } else if (genre) {
      document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
      setAppliedFiltersListWC([filters[1].sub_filters.filter(filter => filter.id == genre)[0].name])
    } else if (vocal)  {
      document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
      setAppliedFiltersListWC([filters[0].sub_filters.filter(filter => filter.id == vocal)[0].name])
    }
    let query = document.getElementById("searchField").value
    dispatch(getSfxes(query, query_type(query), getUniqFilters(appliedFiltersList), "", "", 1));
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
    dispatch(getSfxes(query, query_type(query), appliedFiltersList, "", "", 1, explicit, vocals));

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

  const removeChildFilterDiv = (e) => {
    setParentFilter(e.target.textContent)
    e.target.textContent == 'Sound Design' ? setShowChilderDiv(false) : setShowChilderDiv(true)
  }

  const emptyUpdatedTracks = () => {
    setUpdatedTracks([])
  }

  const filterItems = filters.map((filter, index) =>
    !filter.name.includes('Keys') && !filter.name.includes('Instruments') &&
    <Dropdown alignRight onClick={removeChildFilterDiv} className={filter.name === "Tempos" ? "d-inline durationTempo" : "d-inline"} key={index}>
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
                    <Dropdown.Item href="#" onClick={(e) => handleAddFilter(e, sub_filter.id, "parentFilter")}>{sub_filter.name} <span>({sub_filter.media_count})</span></Dropdown.Item>
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
        (<Dropdown.Menu>
          <div className="filterWrapper">
            {filter.sub_filters.map((sub_filter, index) =>
              <>
                <div className="filterSelf">
                  <Dropdown.Item href="#" onClick={(e) => handleAddFilter(e, sub_filter.id, "parentFilter")}>{sub_filter.name} <span>({sub_filter.media_count})</span></Dropdown.Item>
                  {!(filter.name == "Sound Design") &&
                      <span className={`filterControl addFilter ${sub_filter.sub_filters.length <= 0 ? "disabled" : ""}`} onClick={handleAddChildrenFilter} id={sub_filter.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10" id={sub_filter.id}>
                          <g id="icon-plus" transform="translate(-1.669 -4.355)">
                            <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                            <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                          </g>
                        </svg>
                      </span>
                  }
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
                      <Dropdown.Item href="#" onClick={(e) => handleAddFilter(e, sub_filter.id, "childFilter")}>{sub_filter.name} <span>({sub_filter.media_count})</span></Dropdown.Item>
                      <span className="filterControl discardFilter disabled" onClick={handleClearSingleFilter} name={sub_filter.name + ' (' + sub_filter.media_count + ')'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" name={sub_filter.name + ' (' + sub_filter.media_count + ')'}>
                          <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1" name={sub_filter.name + ' (' + sub_filter.media_count + ')'}>
                            <circle cx="5" cy="5" r="5" stroke="none" name={sub_filter.name + ' (' + sub_filter.media_count + ')'} />
                            <circle cx="5" cy="5" r="4.5" fill="none" name={sub_filter.name + ' (' + sub_filter.media_count + ')'} />
                          </g>
                          <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1" name={sub_filter.name + ' (' + sub_filter.media_count + ')'} />
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
          <h1 className={search.pageHeading}>Search SFX</h1>
          <div className={search.searchUploadStuff}>
            <Form className="stickySearch largeStuff haveIcon" onSubmit={e => { e.preventDefault(); }}>
              <Form.Control type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by keyword to find animal sounds, background noises, vehicles, etc." id="searchField" />
              <Button variant="default" type="submit" className="btnMainLarge stickyBtn" onClick={handleSearch}>Search</Button>
              <svg xmlns="http://www.w3.org/2000/svg" className="" width="22.414" height="22.414" viewBox="0 0 22.414 22.414">
                <g id="icon-magnifying-glass" transform="translate(1 1)">
                  <path id="Path_1" data-name="Path 1" d="M305.541,309.272a8.271,8.271,0,1,0-8.271,8.27A8.272,8.272,0,0,0,305.541,309.272Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" strokLinecap="round" strokeWidth="2"/>
                  <line id="Line_2" data-name="Line 2" x2="5.989" y2="5.866" transform="translate(14.011 14.134)" fill="none" stroke="#c1d72e" strokLinecap="round" strokeWidth="2"/>
                </g>
              </svg>
            </Form>

          </div>
          <div ref={container}>
            <Sticky container={container} className="stickUp" defaultOffsetTop={window.innerWidth <= 767 ? 58 : 70}>
              <div className="filterBar brandWall">
                {filterItems}
              </div>
            </Sticky>

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
              <Tracks appliedFiltersList={appliedFiltersList} sfxes={true} tracks={tracks} duration={durationFilter} tracksMeta={tracksMeta} showTrackAddToPlaylistModal={showTrackAddToPlaylistModal} showDownloadModal={showDownloadModal} showDownloadLicenseModal={showDownloadLicenseModal} showAddTrackToCartLicenseModal={showAddTrackToCartLicenseModal} handleFooterTrack={handleFooterTrack} handleSimilarSearch={handleSimilarSearch} handleAddToFavorites={handleAddToFavorites} favoriteTrackIds={favoriteTrackIds} type="sfx" emptyUpdatedTracks={emptyUpdatedTracks}/>
            )}
          </div>
        </div>

        {/* <div className="stickyMiniPlayer">
          <div className="fixed-container">
            <CustomAudioWave footerPlaying={footerPlaying} footer={true} handleFooterTrack={handleFooterTrack} footerTrack={track} />
          </div>
        </div> */}
        <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]} type="sfx"/>
        <DownloadTrackLicense showModal={showLicenseModal} onCloseModal={handleLicenseModalClose} />
        <AddToCartLicense showModal={showAddToCartLicenseModal} onCloseModal={handleAddToCartLicenseModalClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]} handleLicenseClick={handleLicenseClick} type="Sfx"/>
        {localStorage.getItem("user") && <AddToPlaylist showModal={showAddToPlaylistModal} onCloseModal={handleAddToPlaylistModalClose} track={altVersionTrack ? altVersionTrack : updatedTracks[index]} type="sfxes"/> }
        <Sidebar showSidebar={showSidebar} handleSidebarHide={handleSidebarHide} sidebarType={sidebarType} track={updatedTracks[index]} addTrackToCartLicenseModalSidebar={addTrackToCartLicenseModalSidebar}/>

      </div>
    </StickyProvider>

  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(getSfxFilters(req))
      // await store.dispatch(getPlaylists(req))
      await store.dispatch(getSfxes("", "local_search", [], "", "", 1))
    });

export default Sfx;
