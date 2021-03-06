import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import NewPlaylist from "../../components/modals/NewPlaylist";
import EditPlaylist from "../../components/modals/EditPlaylist";
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import mood1 from '../../images/mood1.png';
import mood2 from '../../images/mood2.png';
import mood3 from '../../images/mood3.jpg';
import mood4 from '../../images/mood4.jpg';
import Sample1 from '../../images/sample1.jpeg';
import Sample2 from '../../images/sample2.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { getMyPlaylists } from "../../redux/actions/authActions";
import { getFollowedArtists } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BASE_URL } from "../../common/api";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookie } from 'next-cookie'


function MyPlaylists() {
  const cookie = useCookie()
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const myPlaylists = useSelector(state => state.user.my_playlists);
  const myPlaylistsMeta = useSelector(state => state.user.myPlaylistsMeta);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([])
  const [infifniteLoop, setInfiniteLoop] = useState(false)
  const [hasMore, sethasMore] = useState(true)
  const [myPlaylistDetail, setMyPlaylistDetail] = useState()

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
    let isMounted = true;
    if (infifniteLoop) {
      setPlaylists(playlists => [...playlists, ...myPlaylists])
      setInfiniteLoop(false)
    } else {
      setPlaylists(playlists=> myPlaylists)
    }

    if (playlists ? myPlaylists?.length + playlists?.length >= myPlaylistsMeta?.count : myPlaylists?.length >= myPlaylistsMeta?.count) {
      sethasMore(false)
    } else {
      sethasMore(true)
    }

    return () => {
      isMounted = false;
    };

  },[myPlaylists])

  const fetchData = () => {
    if (myPlaylists.length == 15) {
      dispatch(getMyPlaylists((playlists.length/15 + 1)))
      setInfiniteLoop(true)
    }
    else {
      // setPlaylists(playlists=> myPlaylists)
      setInfiniteLoop(false)
    }
  }

  useEffect(() => {
    dispatch(getMyPlaylists(1))
  }, [showModal, showEditModal]);

  useEffect(() => {
    if (myPlaylists) {
      setIsLoading(false)
    }
  }, [myPlaylists]);

  const handleLoading = () => {
    setLoading(true)
  }

  const handleClose = (show) => {
    setShowModal(show)
  }

  return (
    <>
      <div className={playlist.myPlaylistWrapper}>
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

          <div className="parallelHead">
            <h1>My playlists</h1>
            <button className="btn btnMainLarge" onClick={() => setShowModal(true)}>New Playlist</button>
          </div>
          <section className={playlist.myPlaylists}>
            {isLoading ? (
              <InpageLoader />
              ) :
              <InfiniteScroll
                dataLength={playlists.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<InpageLoader />}
              >
                {playlists && playlists.length > 0 ?
                  <div className="tilesWrapper">
                    {playlists.map((playlist,index)=> {
                      return(
                        <Link href={"myPlaylists/" + playlist.id} key={index} onClick={() => {setIsLoading(true)}}>
                          <a key={index} className="tileOverlay">
                            {playlist.playlist_image && <Image src={playlist.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                            <span className="tileOverlayText">
                              {playlist.name}
                              <small className="playlistTracksCount">{playlist.media_count ? playlist.media_count : 0} Tracks</small>
                            </span>
                          </a>
                        </Link>
                      )
                    })}
                  </div> :
                  <div className="noContent">No Playlist Found</div>
                }
              </InfiniteScroll>
            }
          </section>
        </div>
        <NewPlaylist showModal={showModal} onCloseModal={handleClose} loading={handleLoading} />
      </div>
    </>
  );
}

export default withPrivateRoute(MyPlaylists);
