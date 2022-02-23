import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import playlist from "../../styles/Playlist.module.scss";
import Image from 'next/image';
import anime from '../../images/animi.jpeg';
import cinemetic from '../../images/cinimetic.jpeg';
import hiphop from '../../images/hiphop.jpeg';
import mood1 from '../../images/mood1.png';
import mood2 from '../../images/mood2.png';
import mood3 from '../../images/mood3.jpg';
import mood4 from '../../images/mood4.jpg';
import Sample1 from '../../images/sample1.jpeg';
import Sample2 from '../../images/sample2.jpeg';
import Sample3 from '../../images/sample3.jpeg';
import { useDispatch, useSelector } from "react-redux";
import { getFollowedPlaylists } from "../../redux/actions/authActions";
import { getFollowedArtists } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import Link from "next/link";

function Following() {
  const dispatch = useDispatch();
  const followedPlaylists = useSelector(state => state.user.followedPlaylists);
  const followedArtists = useSelector(state => state.user.followedArtists);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getFollowedPlaylists())
    dispatch(getFollowedArtists())
  }, []);

  useEffect(() => {
    if (followedPlaylists || followedArtists) {
      setIsLoading(false)
    }
  }, [followedPlaylists, followedArtists])
  
  return (
    <>
      {isLoading ? (
        <InpageLoader />
      ) : (
        <div className={user.followingPlaylist}>
          <div className={user.listingWrapper}>
            <div className={user.listingHeading}>
              <h2>Followed Playlists</h2>
            </div>
            <div className="tilesWrapper">
              {followedPlaylists && followedPlaylists.map((followedPlaylist, index) =>
                <Link href={"/playlist/" + followedPlaylist.id} key={index}>
                  <a key={index} className="tileOverlay">
                    {followedPlaylist.playlist_image ? <Image src={followedPlaylist.playlist_image} alt="Mood" className="tilesImg"></Image> : ""}
                    <span className="tileOverlayText">{followedPlaylist.name}</span>
                  </a>
                </Link>
                
              )}
            </div>
            <div className={user.listingHeading+' mt-5'}>
              <h2>Followed Artists</h2>
            </div>
            <div className="tilesWrapper">
              {followedArtists && followedArtists.map((followedArtist, index) =>
                <a key={index} href="javascript:void(0)" className="tileOverlay">
                  {followedArtist.image ? <Image src={followedArtist.image} alt="Mood" className="tilesImg"></Image> : ""}
                  <span className="tileOverlayText">{followedArtist.first_name + ' ' + followedArtist.last_name}</span>
                </a>
                
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withPrivateRoute(Following);