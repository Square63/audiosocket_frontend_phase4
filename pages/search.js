import Alert from 'react-bootstrap/Alert';
import UploadTrack from "../components/modals/UploadTrack";
import DownloadTrack from "../components/modals/DownloadTrack";
import CustomAudioWave from "../components/CustomAudioWave";
import {useState, useEffect} from "react";
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
import Tracks from '../components/Tracks';

function Search() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showChilderDiv, setShowChilderDiv] = useState(false);
  const [lastChildFilters, setLastChildFilters] = useState([]);
  const [appliedFiltersList, setAppliedFiltersList] = useState([]);
  const [appliedFiltersListWC, setAppliedFiltersListWC] = useState([]);
  // const [queryType, setQueryType] = useState("local_search")
  const [showDownModal, setShowDownModal] = useState(false)
	const [footerPlaying, setFooterPlaying] = useState(false)
  const [track, setTrack] = useState()

  useEffect(() => {
    
 }, [appliedFiltersListWC]);
  
  const handleClose = (show) => {
    setShowModal(show)
  }

  function showDownloadModal() {
    setShowDownModal(true)
  }

  const handleDownloadClose = (show) => {
    setShowDownModal(show)
  }
  
  const handleSearch = async(e) => {
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), appliedFiltersList, "", "", 0));
  }

  const handleClearAllFilter = () => {
    hideAllFilterDiv()
  }

  function handleClearSingleFilter(e) {
    let singleFilterText
    if (e.target.getAttribute("name") != null) {
      singleFilterText = e.target.getAttribute("name")
    } else {
      singleFilterText = e.target.previousElementSibling.textContent
    }
    let singleFilterTextWithoutCount = removeCount(singleFilterText)
    let elements = $( "a:contains("+singleFilterTextWithoutCount+")" );
    appliedFiltersList.splice(appliedFiltersList.indexOf(singleFilterTextWithoutCount), 1);
    // setAppliedFiltersListWC([appliedFiltersListWC.splice(appliedFiltersListWC.indexOf(singleFilterText), 1)]);
    // console.log("Discard Filter after", appliedFiltersListWC)

    for (let i = 0; i < elements.length; i++) {
      elements[i].closest(".filterSelf").classList.remove("activeFilter")
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
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), appliedFiltersList, "", "", 0));
  }

  function hideAllFilterDiv() {
    $(".filterSelf").removeClass("activeFilter");
    document.getElementById("filtersList").innerHTML = "";
    document.getElementsByClassName('selectedFilter')[0].style.display = 'none';
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), [], "", "", 0));
  }

  const handleAddFilter = async(e) => {
    e.target.closest('.filterSelf').classList.add('activeFilter')
    document.getElementsByClassName('selectedFilter')[0].style.display = 'inline-block';
    appliedFiltersList.push(removeCount(e.currentTarget.text))
    setAppliedFiltersListWC([...appliedFiltersListWC, e.currentTarget.text]);
    let query = document.getElementById("searchField").value
    dispatch(getTracks(query, query_type(query), appliedFiltersList, "", "", 0));
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
  const tracks = useSelector( state => state.allTracks.tracks[0])
  console.log("Filters", filters)
  console.log("Tracks", tracks)


  function removeCount(filter) {
    return filter.substring(0, filter.indexOf(' ('));
  }

  function query_type(query) {
    return query.includes("https") ? "aims_search" : "local_search"
  }
  
  const filterItems = filters.map((filter, index) =>
    <Dropdown alignRight className={filter.name === "Moods" ? "d-inline mood" : "d-inline"} key={index}>
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {filter.name}
      </Dropdown.Toggle>
      {(filter.sub_filters.length > 0 ?
        (<Dropdown.Menu >
          <div className="filterWrapper">
            {filter.sub_filters.map((sub_filter, index) =>
              <>
                <div className="filterSelf">
                  <Dropdown.Item href="#" onClick={handleAddFilter}>{sub_filter.name} <span>({sub_filter.track_count})</span></Dropdown.Item>
                  <span className="filterControl addFilter" onClick={handleAddChildrenFilter} id={sub_filter.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10" id={sub_filter.id}>
                      <g id="icon-plus" transform="translate(-1.669 -4.355)">
                        <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                        <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                      </g>
                    </svg>
                  </span>

                  <span className="filterControl discardFilter" onClick={handleClearSingleFilter} name={sub_filter.name+' ('+sub_filter.track_count+')'}>
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
          {lastChildFilters.length > 0 && showChilderDiv &&
            <>
              <div className="filterChildren filterWrapper" id={appliedFiltersList.length}>
                {lastChildFilters.map((sub_filter, index) =>
                  <>
                    <div className={appliedFiltersList.includes(sub_filter.name) ? "custom filterSelf activeFilter" : "custom filterSelf"}>
                      <Dropdown.Item href="#" onClick={handleAddFilter}>{sub_filter.name} <span>({sub_filter.track_count})</span></Dropdown.Item>
                      <span className="filterControl addFilter">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.005" height="10" viewBox="0 0 10.005 10">
                          <g id="icon-plus" transform="translate(-1.669 -4.355)">
                            <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                            <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                          </g>
                        </svg>
                      </span>

                      <span className="filterControl discardFilter" onClick={handleClearSingleFilter} name={sub_filter.name+' ('+sub_filter.track_count+')'}>
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
            <Form.Control type="text" placeholder="Search by YouTube link, Spotify song link, or Keyword" onChange={handleSearch} id="searchField" />
            <Button variant="default" type="submit" className="btnMainLarge stickyBtn">Search</Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="" width="22.414" height="22.414" viewBox="0 0 22.414 22.414">
              <g id="icon-magnifying-glass" transform="translate(1 1)">
                <path id="Path_1" data-name="Path 1" d="M305.541,309.272a8.271,8.271,0,1,0-8.271,8.27A8.272,8.272,0,0,0,305.541,309.272Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" strokLinecap="round" strokeWidth="2"/>
                <line id="Line_2" data-name="Line 2" x2="5.989" y2="5.866" transform="translate(14.011 14.134)" fill="none" stroke="#c1d72e" strokLinecap="round" strokeWidth="2"/>
              </g>
            </svg>
          </Form>
          <a href="javascript:void(0)" className="btn btnMainXlarge" onClick={() => setShowModal(true)}>
            Upload a Track
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
        <Tracks appliedFiltersList={appliedFiltersList} tracks={tracks} showDownloadModal={showDownloadModal} footerPlaying={footerPlaying} setFooterPlaying={setFooterPlaying} track={track} setTrack={setTrack}/>
        
      </div>
      {/* <div className="stickyMiniPlayer">
        <div className="fixed-container">
          <CustomAudioWave track={track} footerPlaying={footerPlaying} footer={true}/>
          <SingleAudioWave track={track} footerPlaying={footerPlaying}/>
        </div>
      </div> */}
      <UploadTrack showModal={showModal} onCloseModal={handleClose} />
      <DownloadTrack showModal={showDownModal} onCloseModal={handleDownloadClose} />
      
    </div>
    
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      await store.dispatch(getFilters(req))
      await store.dispatch(getTracks("", "local_search", [], "", "", 0))
    });

export default Search;
