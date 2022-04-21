import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import NewPlaylist from "../../components/modals/NewPlaylist";
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


function MyPlaylists() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const myPlaylists = useSelector(state => state.user.my_playlists);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getMyPlaylists())
    
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
          <h1>My playlists</h1>
          <section className={playlist.myPlaylists}>
            <div className="tilesWrapper">
            {myPlaylists &&
              myPlaylists.map((playlist,index)=> {
                return(
                  <a key={index} href="javascript:void(0)" className="tileOverlay">
                    {playlist.playlist_image && <Image src={playlist.playlist_image} alt="Mood" className="tilesImg" layout="fill"></Image>}
                    <span className="tileOverlayText">
                      {playlist.name}
                      <small className="playlistTracksCount">{playlist.tracks.count}</small>
                    </span>
                  </a>
                  )
                })}
            </div>
            <div className={playlist.btnWrapper}>
              <button className="btn btnMainLarge" onClick={() => setShowModal(true)}>New Playlist</button>
            </div>
          </section>
        </div>
        <NewPlaylist showModal={showModal} onCloseModal={handleClose} loading={handleLoading} />
      </div>
      </>

      )}
    </>
    
  );
}
  
export default withPrivateRoute(MyPlaylists);
