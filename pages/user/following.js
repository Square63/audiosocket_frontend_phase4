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
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import Link from "next/link";

function Following() {
  const dispatch = useDispatch();
  const followedPlaylists = useSelector(state => state.user.followedPlaylists);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getFollowedPlaylists())
  }, []);

  useEffect(() => {
    if (followedPlaylists) {
      setIsLoading(false)
    }
  }, [followedPlaylists])
  
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
              {followedPlaylists && followedPlaylists.consumer_playlists.map((followedPlaylist, index) =>
                <Link href={"/user/following/" + followedPlaylist.id} key={index}>
                  <a key={index} className="tileOverlay">
                    <Image src={followedPlaylist.banner_image ? followedPlaylist.banner_image : mood1} alt="Mood" className="tilesImg"></Image>
                    <span className="tileOverlayText">{followedPlaylist.name}</span>
                  </a>
                </Link>
                
              )}
            </div>

            <div className={user.listingHeading+' mt-5'}>
              <h2>Followed Artists</h2>
            </div>
            <div className="tilesWrapper">
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={mood1} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Aspire</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={mood2} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Aspire</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={mood3} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Aspire</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={mood4} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Aspire</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={Sample1} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Aspire</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={Sample2} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Aspire</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={Sample3} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Aspire</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={anime} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Anime</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={cinemetic} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Cinematic</span>
              </a>
              <a href="javascript:void(0)" className="tileOverlay">
                <Image src={hiphop} alt="Mood" className="tilesImg"></Image>
                <span className="tileOverlayText">Hip Hop Pop</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withPrivateRoute(Following);