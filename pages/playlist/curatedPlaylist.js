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
  const [filterType, setFilterType] = useState(localStorage.getItem("curatedPlaylistFilterType") ? localStorage.getItem("curatedPlaylistFilterType") : '');
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
      localStorage.removeItem("curatedPlaylistFilterType")
      setIsLoading(false)
      setPaginatedPlaylists(paginatedPlaylists => [...paginatedPlaylists, ...playlists])
      setPaginatedPlaylistsCount(paginatedPlaylistsCount + playlists.length)
    }
  }, [playlists]);

  useEffect(() => {
    if (totalPlaylists && (paginatedPlaylistsCount >= totalPlaylists.total_curated_playlist_count))
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

  return (
    <>
    {
      isLoading ? (
        <InpageLoader />
      ) : (
        <div className={playlist.playlistWrapper+' '+playlist.curatedPlaylist+' curatedPlaylistGlobal'}>
          <h1>Curated playlists</h1>
          <div className={playlist.filterSearch}>
            <div className="filterBar">
              <a href="javascript:void(0)" className={!filterType ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={() => { setFilterType() }}>All playlists</a>
              <a href="javascript:void(0)" className={filterType == 'moods' ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={() => { setFilterType('moods') }}>Mood</a>
              <a href="javascript:void(0)" className={filterType == 'genres' ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={() => { setFilterType('genres') }}>Genres</a>
              <a href="javascript:void(0)" className={filterType == 'themes' ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={() => { setFilterType('themes') }}>Themes</a>
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
                        </div>
                      </Link>
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Form className="stickySearch">
              <Form.Control type="text" placeholder="Search playlists by title or keyword…" onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} />
              <Button variant="default" type="submit" className="btnMainLarge stickyBtn" onClick={handleSearch}>Search</Button>
            </Form>
          </div>

          {!filterType && showFeatured &&
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
                          {playlist.compressed_playlist_image && <Image src={playlist.compressed_playlist_image} alt="Mood" className="moodImage" layout="fill"></Image>}
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
            {!filterType &&
              <h2 className={playlist.sectionHeading}>
                {paginatedPlaylists.length > 0 ? 'All playlists' :  'No playlist found'}
              </h2>
            }
            <InfiniteScroll
              dataLength={paginatedPlaylists?.length}
              next={handlePageNum}
              hasMore={hasMore}
              endMessage={<h4>Nothing more to show</h4>}
            >
              <div className="tilesWrapper">
                {filterType ?
                  <>
                    {curatedPlaylists && curatedPlaylists[filterType].length > 0 &&
                      curatedPlaylists[filterType].map((playlist, index) => {
                        return (
                          <Link href={"curatedPlaylist/" + playlist.id} key={index} onClick={() => { setIsLoading(true) }}>
                            <a key={index} className="tileOverlay">
                              {playlist.compressed_playlist_image && <Image src={playlist.compressed_playlist_image} alt={filterType} className="tilesImg" layout="fill"></Image>}
                              <span className="tileOverlayText">{playlist.name}</span>
                            </a>
                          </Link>
                        )
                      })
                    }
                  </> :
                  <>
                    {paginatedPlaylists &&
                      paginatedPlaylists.map((playlist, index)=> {
                        return(
                          <Link href={"curatedPlaylist/" + playlist.id} key={index} onClick={() => {setIsLoading(true)}}>
                            <a key={index} className="tileOverlay">
                              {playlist.compressed_playlist_image && <Image src={playlist.compressed_playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                              <span className="tileOverlayText">{playlist.name}</span>
                            </a>
                          </Link>
                        )
                      })
                    }
                  </>
                }
              </div>
            </InfiniteScroll>
          </section>
        </div>
      )
    }
    </>
  );
}

export default CuratedPlaylist;
