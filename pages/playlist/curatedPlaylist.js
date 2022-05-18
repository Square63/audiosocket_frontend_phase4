import CarouselMood from 'react-elastic-carousel';
import playlist from "../../styles/Playlist.module.scss";
import {useContext, useEffect, useState, useRef} from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
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
import { getCuratedPlaylists, getCuratedPlaylistFilters } from '../../redux/actions/authActions';
import InpageLoader from '../../components/InpageLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";

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
  { width: 1, itemsToShow: 2, pagination: true },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 750, itemsToShow: 3, itemsToScroll: 2, pagination: false },
  { width: 1100, itemsToShow: 4, itemsToScroll: 2, pagination: false },

];

function CuratedPlaylist() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [paginatedPlaylists, setPaginatedPlaylists] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const playlists = useSelector( state => state.user.curated_playlists)
  const filters = useSelector( state => state.user.curated_filters)
  const responseStatus = useSelector(state => state.user.responseStatus);

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
    dispatch(getCuratedPlaylists(searchValue, pageNum))
  }, [pageNum]);

  useEffect(() => {
    if (!filters) {
      dispatch(getCuratedPlaylistFilters())
    }
  }, [filters]);

  useEffect(() => {
    if (playlists) {
      setIsLoading(false)
    }

    if (playlists && playlists.length > 0) {
      setPaginatedPlaylists(paginatedPlaylists=> [...paginatedPlaylists, ...playlists])
      console.log("PAGINATED PLAYLISTS", paginatedPlaylists)
    }

  }, [playlists]);

  console.log("Curated Playlists", playlists)

  const handleSearch = (e) => {
    setPaginatedPlaylists([])
    setPageNum(1)
    dispatch(getCuratedPlaylists(searchValue, pageNum))
  }

  const handlePageNum = (e) => {
    setPageNum(pageNum + 1)
  }

  const filterItems = filters && filters.length > 0 && filters.map((filter, index) =>
    <Dropdown className="d-inline" key={index}>
      <Dropdown.Toggle id="dropdown-autoclose-true">
        {filter.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="filterWrapper">
        {filter.sub_filters.length > 0 && filter.sub_filters.map((sub_filter, index) =>


          <div className="filterSelf" key={index}>
            <Dropdown.Item href="#">{sub_filter.name} <span>({sub_filter.media_count})</span></Dropdown.Item>
            <span className="filterControl addFilter">
              <svg width="10.005" height="10" viewBox="0 0 10.005 10">
                <g id="icon-plus" transform="translate(-1.669 -4.355)">
                  <path id="Shape_1939" data-name="Shape 1939" d="M4.928,4.928,0,0" transform="translate(3.169 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  <path id="Shape_1940" data-name="Shape 1940" d="M.354,5.3,5.3.354" transform="translate(2.674 9.355) rotate(-45)" fill="none" stroke="#C1D72E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                </g>
              </svg>
            </span>

            <span className="filterControl discardFilter">
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
        <div className={playlist.playlistWrapper}>
          <h1>Curated playlists</h1>
          <div className={playlist.filterSearch}>
            <div className="filterBar">
                <a href="javascript:void(0)" className={playlist.linkFilter}>All playlists</a>
                {filterItems}
            </div>
            <Form className="stickySearch">
              <Form.Control type="text" placeholder="Search playlists by title or keyword…" onChange={(e)=> setSearchValue(e.target.value)} />
              <Button variant="default" className="btnMainLarge stickyBtn" onClick={handleSearch}>Search</Button>
            </Form>
          </div>

          <section className="moodSlider">
            <div className="testimonialContainer">
              <h2 className={playlist.sectionHeading}>
                Featured playlists
              </h2>
              <CarouselMood breakPoints={breakPoints}>
                {images.map((item) => (
                  <div key={item} className="moodSlide">
                    <Image src={item.src} alt="Mood" className="moodImage"></Image>
                    <span className="moodOverlayText">{item.text}</span>
                  </div>
                ))}
              </CarouselMood>
            </div>
          </section>
          <section className={playlist.playlistTiles}>
            <h2 className={playlist.sectionHeading}>
              All playlists
            </h2>
            <div className="tilesWrapper">
              {paginatedPlaylists &&
                paginatedPlaylists.map((playlist,index)=> {
                  return(
                    <a key={index} href="javascript:void(0)" className="tileOverlay">
                      {playlist.playlist_image && <Image src={playlist.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                      <span className="tileOverlayText">{playlist.name}</span>
                    </a>
                    )
                  })}
            </div>
            <div className={playlist.btnWrapper}>
              <button className="btn btnMainLarge disable" onClick={handlePageNum}>Load More</button>
            </div>
          </section>
        </div>
      )
    }
    </>
  );
}

export default CuratedPlaylist;
