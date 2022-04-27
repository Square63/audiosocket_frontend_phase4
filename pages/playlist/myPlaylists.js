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


function MyPlaylists() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();
  const myPlaylists = useSelector(state => state.user.my_playlists);
  const [isLoading, setIsLoading] = useState(true);
  const [playlists, setPlaylists] = useState([])
  const [infifniteLoop, setInfiniteLoop] = useState(false)
  const [hasMore, sethasMore] = useState(true)
  const [myPlaylistDetail, setMyPlaylistDetail] = useState()

  useEffect(() => {
    let isMounted = true;
    if (infifniteLoop) {
      setPlaylists(playlists => [...playlists, ...myPlaylists])
      setInfiniteLoop(false)
    } else {
      setPlaylists(playlists=> myPlaylists)
    }
    
    if (myPlaylists?.length < 15) {  
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
  }, [showModal]);

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

  const handleEditClose = (show) => {
    setShowEditModal(show)
  }

  const handleEditMyPlaylist = async (e, id) => {
    e.preventDefault();
    
    
    let url = `${BASE_URL}/api/v1/consumer/consumers_playlists/${id}`;
    const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    const URL = url;
    await axios.request({
      headers: {
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        "auth-token": userAuthToken
      },
      method: "GET",
      url: URL,
      
    }).then (response => {
      if (!response.status === 200) {
      } else {
        setMyPlaylistDetail(response.data.consumer_playlist)
        setShowEditModal(true)
      }
    })
    
  }
  return (
    <>
      {isLoading ? (
        <InpageLoader/>
      ) : (
      <>
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
        <div className={playlist.myPlaylistWrapper}>
        
        <div className="fixed-container">
          
          <div className="parallelHead">
            <h1>My playlists</h1>
            <button className="btn btnMainLarge" onClick={() => setShowModal(true)}>New Playlist</button>
          </div>
          <section className={playlist.myPlaylists}>
          <InfiniteScroll
              dataLength={playlists.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<InpageLoader />}
              endMessage={<h4>Nothing more to show</h4>}
            >
            <div className="tilesWrapper">
            
              {playlists &&
                playlists.map((playlist,index)=> {
                  return(
                    <a key={index} href="javascript:void(0)" className="tileOverlay" onClick={(e) => handleEditMyPlaylist(e, playlist.id)}>
                      {playlist.playlist_image && <Image src={playlist.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                      <span className="tileOverlayText">
                        {playlist.name}
                        <small className="playlistTracksCount">{playlist.tracks.count}</small>
                      </span>
                    </a>
                    )
                  })}
            
            </div>
            </InfiniteScroll>
            
          </section>
        </div>
        <NewPlaylist showModal={showModal} onCloseModal={handleClose} loading={handleLoading} />
        {(showEditModal && myPlaylistDetail) && <EditPlaylist showModal={showEditModal} onCloseModal={handleEditClose} loading={handleLoading} myPlaylistDetail={myPlaylistDetail} />}
      </div>
      </>

      )}
    </>
    
  );
}
  
export default withPrivateRoute(MyPlaylists);
