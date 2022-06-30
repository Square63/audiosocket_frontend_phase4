import user from "../../styles/User.module.scss";
import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import anime from '../../images/animi.jpeg';
// import NewPlaylist from "../../components/modals/NewPlaylist";
import EditPlaylist from "../../components/modals/EditPlaylist";
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import mood1 from '../../images/mood1.png';
import mood2 from '../../images/mood2.png';
import mood3 from '../../images/mood3.jpg';
import mood4 from '../../images/mood4.jpg';
import Sample1 from '../../images/sample1.jpeg';
import Sample2 from '../../images/sample2.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { getCreatorKits } from "../../redux/actions/authActions";
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


function CreatorKits() {
  const cookie = useCookie()
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const creatorKits = useSelector(state => state.user.creator_kits);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [creatorKitsArray, setCreatorKitsArray] = useState([])
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
      setCreatorKitsArray(creatorKitsArray => [...creatorKitsArray, ...creatorKits])
      setInfiniteLoop(false)
    } else {
      setCreatorKitsArray(creatorKitsArray=> creatorKits)
    }

    if (creatorKits?.length < 15) {
      sethasMore(false)
    } else {
      sethasMore(true)
    }

    return () => {
      isMounted = false;
    };

  },[creatorKits])

  const fetchData = () => {
    if (creatorKits.length == 15) {
      dispatch(getCreatorKits((creatorKitsArray.length/15 + 1)))
      setInfiniteLoop(true)
    }
    else {
      // setcreatorKitsArray(creatorKitsArray=> creatorKits)
      setInfiniteLoop(false)
    }
  }

  useEffect(() => {
    dispatch(getCreatorKits(1))
  }, [showModal, showEditModal]);

  useEffect(() => {
    if (creatorKits) {
      setIsLoading(false)
    }
  }, [creatorKits]);

  const handleLoading = () => {
    setLoading(true)
  }

  const handleClose = (show) => {
    setShowModal(show)
  }

  return (
    <>
      {isLoading ? (
        <InpageLoader/>) :
        (
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
                <section className={playlist.myPlaylists}>
                  <h1>Creator Kits</h1>
                  <InfiniteScroll
                    dataLength={creatorKitsArray.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<InpageLoader />}
                    endMessage={<h4>Nothing more to show</h4>}
                  >
                  <div className="tilesWrapper">

                    {creatorKitsArray &&
                      creatorKitsArray.map((creatorKit,index)=> {
                        return(
                          <Link href={"creatorKits/" + creatorKit.id} key={index} onClick={() => {setIsLoading(true)}}>
                            <a key={index} className="tileOverlay">
                                {creatorKit.playlist_image && <Image src={creatorKit.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                                <span className="tileOverlayText">
                                  {creatorKit.name}
                                  <small className="playlistTracksCount">{creatorKit.media_count} Tracks</small>
                                </span>
                              </a>
                          </Link>
                          )
                        })}

                  </div>
                  </InfiniteScroll>
                </section>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

export default CreatorKits;
