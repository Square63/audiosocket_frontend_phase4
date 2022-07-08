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
import { useRouter } from "next/router";
import InpageLoader from '../../components/InpageLoader';
import Link from "next/link";

function Following() {
  const dispatch = useDispatch();
  const router = useRouter();
  const followedPlaylists = useSelector(state => state.user.followedPlaylists);
  const followedArtists = useSelector(state => state.user.followedArtists);
  const responseStatus = useSelector(state => state.user.responseStatus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getFollowedPlaylists())
    dispatch(getFollowedArtists())
  }, []);

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
    if (followedPlaylists || followedArtists) {
      setIsLoading(false)
    }
  }, [followedPlaylists, followedArtists])

  return (
    <>
      {isLoading ? (
        <InpageLoader />
      ) : (
        <div className={playlist.followingPlaylist}>
          <div className={user.listingWrapper}>
            <div className={user.listingHeading}>
              <h2>Followed Playlists</h2>
            </div>
            <div className="tilesWrapper">
              {(followedPlaylists && followedPlaylists.curated_playlists?.length > 0) ?
                followedPlaylists.curated_playlists.map((followedPlaylist, index) =>
                  <Link href={"/playlist/curatedPlaylist/" + followedPlaylist.id} key={index}>
                    <a key={index} className="tileOverlay">
                      {followedPlaylist.compressed_playlist_image && <Image src={followedPlaylist.compressed_playlist_image} alt="Mood" className="moodImage" layout="fill"></Image>}
                      <span className="tileOverlayText">{followedPlaylist.name}</span>
                    </a>
                  </Link>
                ) :
                <div>
                  <p>No following playlists</p>
                </div>
              }
            </div>
            <div className={user.listingHeading+' mt-5'}>
              <h2>Followed Artists</h2>
            </div>
            <div className="tilesWrapper">
              { (followedArtists?.users?.length > 0) ?
                followedArtists.users.map((followedArtist, index) =>
                  <a key={index} className="tileOverlay">
                    {followedArtist.image ? <Image src={followedArtist.image} alt="Mood" className="tilesImg"></Image> : ""}
                    <span className="tileOverlayText">{followedArtist.first_name + ' ' + followedArtist.last_name}</span>
                  </a>
                ) :
                <div>
                  <p>No following artists</p>
                </div>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withPrivateRoute(Following);
