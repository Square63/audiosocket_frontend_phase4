import { useRouter } from "next/router";
import { getPlaylistDetail } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tracks from "../../components/Tracks";
import InpageLoader from '../../components/InpageLoader';

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

    <div className="fixed-container">
      {isLoading ? (
        <InpageLoader />
      ) : (
        playlistDetails && <Tracks tracks={playlistDetails.tracks}/>)}
    </div>
  );
}

export default Details;