import CarouselMood from 'react-elastic-carousel';
import playlist from "../../styles/Playlist.module.scss";
import {useContext, useEffect, useState, useRef} from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, Card, DropdownButton, CloseButton } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import Tooltip from 'react-bootstrap/Tooltip';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'next/image';
import mood1 from '../../images/mood1.png';
import mood2 from '../../images/mood2.png';
import mood3 from '../../images/mood3.jpg';
import mood4 from '../../images/mood4.jpg';
import Sample1 from '../../images/sample1.jpeg';
import Sample2 from '../../images/sample2.jpeg';
import Sample3 from '../../images/sample3.jpeg';
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCuratedPlaylists, getCuratedPlaylistFilters, getFeaturedPlaylists } from '../../redux/actions/authActions';
import InpageLoader from '../../components/InpageLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";
import Link from "next/link";


const NextArrow = ({ onClick }) => {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};



const images = [
  { text: "Aim to inspire", src: mood1 },
  { text: "Ambient.", src: mood2 },
  { text: "Angry", src: mood3 },
  { text: "Dreamy", src: mood4 },
  { text: "Love", src: Sample1 },
  { text: "Life", src: Sample2 },
  { text: "Nature", src: Sample3 },
];

const breakPoints = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 768, itemsToShow: 3, itemsToScroll: 2, pagination: false },
  { width: 1100, itemsToShow: 4, itemsToScroll: 2, pagination: false }

];

function CuratedPlaylist() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [paginatedPlaylists, setPaginatedPlaylists] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [paginatedPlaylistsCount, setPaginatedPlaylistsCount] = useState(0);
  const [showFeatured, setShowFeatured] = useState(true);


  const dispatch = useDispatch();
  const router = useRouter();
  const playlists = useSelector( state => state.user.curated_playlists)
  const featuredPlaylists = useSelector( state => state.user.featured_playlists)
  const totalPlaylists = useSelector( state => state.user.meta)
  const curatedPlaylists = useSelector( state => state.user.curated_filters)
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [hasMore, sethasMore] = useState(true)

  useEffect(() => {
    if (responseStatus == 422) {
      window.localStorage.clear();
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    }
  }, [responseStatus]);

  useEffect(() => {
    dispatch(getCuratedPlaylists(searchValue, [], pageNum))
  }, [pageNum]);

  useEffect(() => {
    if (!curatedPlaylists) {
      dispatch(getCuratedPlaylistFilters())
    }
  }, [curatedPlaylists]);

  useEffect(() => {
    if (!featuredPlaylists) {
      dispatch(getFeaturedPlaylists())
    }
  }, [featuredPlaylists]);

  useEffect(() => {
    if (playlists) {
      setIsLoading(false)
      setPaginatedPlaylists(paginatedPlaylists => [...paginatedPlaylists, ...playlists])
      setPaginatedPlaylistsCount(paginatedPlaylistsCount + playlists.length)
    }
  }, [playlists]);

  useEffect(() => {
    if (totalPlaylists && (paginatedPlaylistsCount >= totalPlaylists.count))
      sethasMore(false)
  }, [paginatedPlaylistsCount]);

  console.log("Curated Playlists", playlists)

  const handleSearch = (e) => {
    if (searchValue !== ""){
      setPaginatedPlaylistsCount(0)
      setShowFeatured(false)
    }
    else
      setShowFeatured(true)
    setIsLoading(true)
    let filterArray = []
    filterArray.push(selectedFilter)
    setPaginatedPlaylists([])
    setPageNum(1)
    dispatch(getCuratedPlaylists(searchValue, filterArray, pageNum))
  }

  const handlePageNum = (e) => {
    setPageNum(pageNum + 1)
  }

  const handleAddFilter = (filterName) => {
    setIsLoading(true)
    let filterArray = []
    setSelectedFilter(filterName)
    filterArray.push(filterName)
    dispatch(getCuratedPlaylists(searchValue, filterArray, filterArray.length > 0 ? 1 : pageNum))
  }

  const handleClearSingleFilter = async() => {
    setIsLoading(true)
    setSelectedFilter("")
    dispatch(getCuratedPlaylists(searchValue, [], 1))
  }

  const filterItems = curatedPlaylists && curatedPlaylists.filters.length > 0 && curatedPlaylists.filters.map((filter, index) =>
    <Dropdown className="d-inline" key={index}>
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {filter.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="filterWrapper">
        {filter.sub_filters && filter.sub_filters.length > 0 && filter.sub_filters.map((sub_filter, index) =>
          <div className={selectedFilter == sub_filter.name ? "filterSelf activeFilter" : "filterSelf"} key={index}>
            <Dropdown.Item href="#" onClick={()=> handleAddFilter(sub_filter.name)}>{sub_filter.name}</Dropdown.Item>
            <span className={selectedFilter == sub_filter.name ? "filterControl discardFilter" : "filterControl discardFilter disabled" } onClick={handleClearSingleFilter}>
              <svg width="10" height="10" viewBox="0 0 10 10">
                <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1">
                  <circle cx="5" cy="5" r="5" stroke="none"/>
                  <circle cx="5" cy="5" r="4.5" fill="none"/>
                </g>
                <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1"/>
              </svg>
            </span>
          </div>
        )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )

  return (
    <>
    {
      isLoading ? (
        <InpageLoader />
      ) : (
        <div className={playlist.playlistWrapper+' '+playlist.curatedPlaylist+' curatedPlaylistGlobal'}>
          <h1>Curated playlists</h1>
          <div className={playlist.filterSearch}>
            <div className="filterBar desktopShowFlex">
              <a href="javascript:void(0)" className={playlist.linkFilter}>All playlists</a>
              {filterItems}
              <Dropdown className="d-inline">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                  Creator Kits
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="filterWrapper">
                    {curatedPlaylists && curatedPlaylists.creator_kits && curatedPlaylists.creator_kits.length > 0 && curatedPlaylists.creator_kits.map((sub_filter, index) =>
                      <Link key={index} href={"creatorKits/" + sub_filter.id}>
                        <div className={selectedFilter == sub_filter.name ? "filterSelf activeFilter" : "filterSelf"} key={index}>
                          <Dropdown.Item href="javascript:void(0)">{sub_filter.name}</Dropdown.Item>
                          <span className={selectedFilter == sub_filter.name ? "filterControl discardFilter" : "filterControl discardFilter disabled" } onClick={handleClearSingleFilter}>
                            <svg width="10" height="10" viewBox="0 0 10 10">
                              <g id="Ellipse_21" data-name="Ellipse 21" fill="none" stroke="#c1d72e" strokeLinejoin="round" strokeWidth="1">
                                <circle cx="5" cy="5" r="5" stroke="none"/>
                                <circle cx="5" cy="5" r="4.5" fill="none"/>
                              </g>
                              <line id="Line_42" data-name="Line 42" y1="5" x2="5" transform="translate(2.5 2.5)" fill="none" stroke="#c1d72e" strokeWidth="1"/>
                            </svg>
                          </span>
                        </div>
                      </Link>
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>

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

            <Form className="stickySearch">
              <Form.Control type="text" placeholder="Search playlists by title or keyword…" onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} />
              <Button variant="default" type="submit" className="btnMainLarge stickyBtn" onClick={handleSearch}>Search</Button>
            </Form>
          </div>

          {showFeatured &&
            <section className="moodSlider">
              <div className="testimonialContainer">
                <h2 className={playlist.sectionHeading}>
                  Featured playlists
                </h2>
                {featuredPlaylists && featuredPlaylists.length > 0 ? <CarouselMood breakPoints={breakPoints}>
                  {featuredPlaylists.map((playlist, index) => (
                    <Link href={"curatedPlaylist/" + playlist.id} key={index} onClick={() => {setIsLoading(true)}}>
                      <a key={index} className="tileOverlay">
                        <div key={playlist} className="moodSlide">
                          {playlist.playlist_image && <Image src={playlist.playlist_image} alt="Mood" className="moodImage" layout="fill"></Image>}
                          <span className="moodOverlayText">{playlist.name}</span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </CarouselMood> : "No featured playlist"}
              </div>
            </section>
          }
          <section className={playlist.playlistTiles}>
            <h2 className={playlist.sectionHeading}>
              {paginatedPlaylists.length > 0 ? 'All playlists' :  'No playlist found'}
            </h2>
            <InfiniteScroll
              dataLength={paginatedPlaylists?.length}
              next={handlePageNum}
              hasMore={hasMore}
              endMessage={<h4>Nothing more to show</h4>}
            >
              <div className="tilesWrapper">
                {paginatedPlaylists &&
                  paginatedPlaylists.map((playlist,index)=> {
                    return(
                      <Link href={"curatedPlaylist/" + playlist.id} key={index} onClick={() => {setIsLoading(true)}}>
                        <a key={index} className="tileOverlay">
                          {playlist.playlist_image && <Image src={playlist.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                          <span className="tileOverlayText">{playlist.name}</span>
                        </a>
                      </Link>
                    )
                  })
                }
              </div>
            </InfiniteScroll>
            <div className={playlist.btnWrapper}>
              {paginatedPlaylists.length > 0 && hasMore ? <button className="btn btnMainLarge disable" onClick={handlePageNum}>Load More</button> : ""}
            </div>
          </section>
        </div>
      )
    }
    </>
  );
}

export default CuratedPlaylist;
