import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { getCreatorKits } from "../../redux/actions/authActions";
import { useState, useEffect, useRef } from "react";
import InpageLoader from '../../components/InpageLoader';
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";
import { useCookie } from 'next-cookie'
import { Form, Button, Dropdown, Collapse, Accordion } from "react-bootstrap";
import {getCuratedPlaylistFilters } from '../../redux/actions/authActions';




function CreatorKits() {
  const cookie = useCookie()
  const [searchValue, setSearchValue] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const creatorKits = useSelector(state => state.user.creator_kits);
  const creatorKitsMeta = useSelector(state => state.user.creatorKitsMeta);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [creatorKitsList, setCreatorKitsList] = useState([])
  const [infifniteLoop, setInfiniteLoop] = useState(false)
  const [search, setSearch] = useState(true)
  const [hasMore, sethasMore] = useState(true)
  const curatedPlaylistsFilters = useSelector( state => state.user.curated_filters)
  const [filterType, setFilterType] = useState( localStorage.getItem("curatedPlaylistFilterType") ? localStorage.getItem("curatedPlaylistFilterType") : '');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [toggleShow, setToggleShow] = useState(true);

  useEffect(() => {
    if (responseStatus == 422) {
      cookie.set('user', '')
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
    if(search){
      let page;
      pageNum == 0 ? page = 1 : page = pageNum
      dispatch(getCreatorKits(searchValue, page))
    }
  }, [pageNum]);

  useEffect(() => {
    let isMounted = true;
    if (creatorKits){
      if (infifniteLoop)
        setInfiniteLoop(false)
      setCreatorKitsList(creatorKitsList => [...creatorKitsList, ...creatorKits])
      creatorKitsMeta.total_creator_kits_count == (creatorKitsList.length + creatorKits.length) ? sethasMore(false) : sethasMore(true)
      setIsLoading(false)
      if (pageNum == 0){
        setPageNum(1)
        setSearch(false)
      }
    }

    return () => {
      isMounted = false;
    };
  }, [creatorKits])

  useEffect(() => {
    if (!curatedPlaylistsFilters) {
      dispatch(getCuratedPlaylistFilters())
    }
  }, [curatedPlaylistsFilters]);

  const fetchData = () => {
    setPageNum(creatorKitsList.length / 15 + 1)
    setSearch(true)
    creatorKitsMeta.total_creator_kits_count == creatorKitsList.length ? setInfiniteLoop(false) : setInfiniteLoop(true)
  }

  const handleSearch = (e) => {
    setIsLoading(true)
    setCreatorKitsList([])
    setPageNum(0)
    setSearch(true)
  }

  const handleFilters = (e, value) => {
    if (value) {
      setFilterType(value)
      localStorage.setItem('curatedPlaylistFilterType', value)
      router.push('/playlist/curatedPlaylist')
    }
      
    if (e.target.closest('.d-inline'))
      setToggleShow(!toggleShow)
    else 
      setToggleShow(false)
  }

  return (
    <>
      <div className={playlist.creatorKitsListing} onClick={(e)=> handleFilters(e)}>
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
        <div className={playlist.playlistWrapper+' '+playlist.curatedPlaylist+' curatedPlaylistGlobal'}>
          <div className="fixed-container">
            <h1 className={playlist.creatorFilterSesrch}>Creator Kits</h1>
          
            <div className={playlist.filterSearch + ' ' + playlist.creatorFilterSesrch}>
              <div className="filterBar">
                <a href="javascript:void(0)" className={filterType == 'all' ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={(e) => { handleFilters(e, 'all') }}>All playlists</a>
                <a href="javascript:void(0)" className={filterType == 'moods' ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={(e) => { handleFilters(e, 'moods') }}>Mood</a>
                <a href="javascript:void(0)" className={filterType == 'genres' ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={(e) => { handleFilters(e, 'genres') }}>Genres</a>
                <a href="javascript:void(0)" className={filterType == 'themes' ? `active ${playlist.linkFilter}` : `${playlist.linkFilter}`} onClick={(e) => { handleFilters(e, 'themes') }}>Themes</a>
                <Dropdown className="d-inline" show={toggleShow} onSelect={()=> setToggleShow(!toggleShow)} >
                  <Dropdown.Toggle id="dropdown-autoclose-true">
                    Creator Kits
                  </Dropdown.Toggle>
                  <Dropdown.Menu show={toggleShow} onClick={(e)=> handleFilters(e)}>
                    <div className="filterWrapper">
                      {curatedPlaylistsFilters && curatedPlaylistsFilters.creator_kits && curatedPlaylistsFilters.creator_kits.length > 0 && curatedPlaylistsFilters.creator_kits.map((sub_filter, index) =>
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

              <Form className="stickySearch" onSubmit={e => { e.preventDefault(); }}>
                <Form.Control type="text" placeholder="Search playlists by title or keyword…" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <Button variant="default" type="submit" className="btnMainLarge stickyBtn" onClick={handleSearch}>Search</Button>
              </Form>
            </div>      
        
            <section className={playlist.myPlaylists+' mt-5'}>
              {isLoading ? (
                <InpageLoader />) :
                <InfiniteScroll
                  dataLength={creatorKitsList.length}
                  next={fetchData}
                  hasMore={hasMore}
                  loader={<InpageLoader />}
                  endMessage={<h4>Nothing more to show</h4>}
                >
                  {creatorKitsList && creatorKitsList.length > 0 ?
                    <div className="tilesWrapper">
                      {creatorKitsList.map((creatorKit,index)=> {
                        return(
                          <div key={index} className={playlist.creatorKitsItem}>
                            <Link href={"creatorKits/" + creatorKit.id} key={index} onClick={() => {setIsLoading(true)}}>
                              <a className="tileOverlay">
                                {creatorKit.compressed_playlist_image && <Image src={creatorKit.compressed_playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                              </a>
                            </Link>
                            <span className="tileOverlayText">
                              {creatorKit.name}
                            </span>
                          </div>
                        )
                      })}
                    </div> :
                    <div className="noContent">No Creator Kit Found</div>
                  }
                </InfiniteScroll>
              }
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatorKits;
