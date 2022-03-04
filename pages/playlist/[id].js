import { useRouter } from "next/router";
import { getPlaylistDetail } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tracks from "../../components/Tracks";
import InpageLoader from '../../components/InpageLoader';
import Image from 'next/image';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import playlist from "../../styles/Playlist.module.scss";
import cinemetic from '../../images/cinimetic.jpeg';
import mood1 from '../../images/mood1.png';

const Details = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const playlistDetails = useSelector(state => state.user.playlist_details);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      dispatch(getPlaylistDetail(query.id))
    }
  }, []);

  useEffect(() => {
    if (playlistDetails) {
      setIsLoading(false)
    }
  }, [playlistDetails])

  return (
    <div className={playlist.playlistShow}>
      <div className={playlist.playlistBanner}>
        <div className="themeBreadcrumb">
          <div className="fixed-container">
            <Breadcrumb>
              <Breadcrumb.Item href="#">Playlists</Breadcrumb.Item>
              <Breadcrumb.Item href="#">
               Moods
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Aim to Inspire</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className={playlist.playlistInfo}>
          <div className={playlist.playlistCard}>
            <div className={playlist.imgSec}>
              <Image src={mood1} alt="Mood" className="tilesImg"></Image>
            </div>
            <div className={playlist.contentSec}>
              <div className={playlist.aboutPlaylist}>

              </div>
              <div className={playlist.cardBtn}>
                
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="fixed-container">
        {isLoading ? (
          <InpageLoader />
        ) : (
          playlistDetails && <Tracks tracks={playlistDetails.tracks}/>)}
      </div>
    </div>
  );
}

export default Details;