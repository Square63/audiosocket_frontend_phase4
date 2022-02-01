import React, {useRef, useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../../redux/actions/playlistActions";
import { TOAST_OPTIONS } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddToPlaylist({showModal = false, onCloseModal, playlists, track}) {
  const dispatch = useDispatch();
  const message = useSelector(state => state.allPlaylists);
  // const [removedPlaylistId, setRemovedPlaylistId] = useState()
  // const [consumerPlaylistId, setConsumerPlaylistId] = useState()
  const [newPlaylist, setNewPlaylist] = useState("")

  useEffect(() => {
    if(!message?.success) {
      toast.error(message.message, TOAST_OPTIONS);
    } else {
      toast.success(message.message, TOAST_OPTIONS);
    }
  }, [playlists])

  useEffect(() => {
    
  }, [track])

  const [selectedOption, setSelect] = useState(null);

  const handleChange = (selectedOption) => {
    setSelect(selectedOption);
    let playlistId = selectedOption.length > 0 ? selectedOption[selectedOption.length -1 ].value : ""
    setNewPlaylist(selectedOption[0].label)
    dispatch(addTrackToPlaylist(playlistId, track.id));
  };

  const handleRemoveTrack = (e, playlistName) => {
    let consumerPlaylistId = 0;
    let removedPlaylistId = 0;
    e.preventDefault();
    e.target.closest("li").remove()
    for(var i = 0; i < playlists.playlists[0].consumer_playlists.length; i++) {
    
      for(var j = 0; j < playlists.playlists[0].consumer_playlists[i].playlist_tracks.length; j++) {
        if ((playlists.playlists[0].consumer_playlists[i].name == playlistName)  && (playlists.playlists[0].consumer_playlists[i].playlist_tracks[j].track.id == track.id)) {
          consumerPlaylistId = playlists.playlists[0].consumer_playlists[i].id
          removedPlaylistId = playlists.playlists[0].consumer_playlists[i].playlist_tracks[j].id
        }
      }
    }
    dispatch(removeTrackFromPlaylist(consumerPlaylistId, removedPlaylistId, track.id));
  }

  const removeOption = e => {
    const newSelect = selectedOption.filter(
      item => item.value !== e.target.name
    );
    setSelect(newSelect);
  };
  const options = [];

  for(var i = 0; i < playlists.playlists[0].consumer_playlists.length; i++) {
    let obj = {};

    obj['value'] = playlists.playlists[0].consumer_playlists[i].id;
    obj['label'] = playlists.playlists[0].consumer_playlists[i].name;
    options.push(obj);
  }  
  
  const handleClose = () => {
    onCloseModal(false);
  }

  const trackPlaylists = [];

  for(var i = 0; i < playlists.playlists[0].consumer_playlists.length; i++) {
    for(var j = 0; j < playlists.playlists[0].consumer_playlists[i].playlist_tracks.length; j++) {
      if (playlists.playlists[0].consumer_playlists[i].playlist_tracks[j].track.title == track.title) {
        trackPlaylists.push(playlists.playlists[0].consumer_playlists[i].name);
      }
    }
  }
  // setNewPlaylist([trackPlaylists])
  if (newPlaylist.length) {
    debugger
    trackPlaylists.push(newPlaylist)
    console.log("TRACK PLAYLISTS", trackPlaylists)
  }
    

  const items = trackPlaylists.map((trackPlaylist, index) =>
    <li key={index}>
      <a href="javascript:void(0)">{trackPlaylist}</a>
      <svg xmlns="http://www.w3.org/2000/svg" width="14.744" height="14.744" viewBox="0 0 14.744 14.744" onClick={(e) => handleRemoveTrack(e, trackPlaylist)}>
        <g id="icon-trash" transform="translate(0.5 0.5)">
          <path id="Shape_1765" data-name="Shape 1765" d="M291.756,3298.5l-1.083,10.284a1.2,1.2,0,0,1-1.188,1.07h-6.215a1.2,1.2,0,0,1-1.189-1.07L281,3298.5" transform="translate(-279.506 -3296.11)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1766" data-name="Shape 1766" d="M278.5,3298.5h13.744" transform="translate(-278.5 -3296.11)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1767" data-name="Shape 1767" d="M285.5,3296.89V3295.1a.6.6,0,0,1,.6-.6h4.183a.6.6,0,0,1,.6.6v1.792" transform="translate(-281.317 -3294.5)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1768" data-name="Shape 1768" d="M290,3303v6.274" transform="translate(-283.128 -3297.921)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1769" data-name="Shape 1769" d="M294.3,3303l-.3,6.274" transform="translate(-284.738 -3297.921)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
          <path id="Shape_1770" data-name="Shape 1770" d="M285.5,3303l.3,6.274" transform="translate(-281.317 -3297.921)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
        </g>
      </svg>
    </li>
  )

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal addToFavorite">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">Add song to playlist</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height: '500px'}}>
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
      <div className="favoriteInnerContent">
        <Select
          className='react-select-container'
          classNamePrefix="react-select"
          placeholder="Find an existing Playlist"
          isMulti
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
        <div className="playlistNames">
          <h4>Track appears on these playlists</h4>
          <ul className="scrollingList">
            {items}
          </ul>
          <button className="btn btnMainLarge btn-block">
            Add to Current Playlist</button>
        </div>
      </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddToPlaylist;