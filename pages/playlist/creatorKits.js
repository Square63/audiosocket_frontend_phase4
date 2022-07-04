import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { getCreatorKits } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import Link from "next/link";
import { ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";
import { useCookie } from 'next-cookie'
import { Form, Button } from "react-bootstrap";


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

  return (
    <>
      <div className={playlist.myPlaylistWrapper+' '+playlist.creatorKitsListing}>
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
          <section className={playlist.myPlaylists}>
            <div className="parallelHead">
              <h1>Creator Kits</h1>
              <Form className="stickySearch">
                <Form.Control type="text" placeholder="Search playlists by title or keyword…" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <Button variant="default" className="btnMainLarge stickyBtn" onClick={handleSearch}>Search</Button>
              </Form>
            </div>
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
    </>
  )
}

export default CreatorKits;
