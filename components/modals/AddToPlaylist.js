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
import { BASE_URL } from '../../common/api'
import axios from "axios";
import InpageLoader from "../InpageLoader";


function AddToPlaylist({showModal = false, onCloseModal, playlists, track}) {
  const dispatch = useDispatch();
  let message = useSelector(state => state.allPlaylists);
  // const [removedPlaylistId, setRemovedPlaylistId] = useState()
  // const [consumerPlaylistId, setConsumerPlaylistId] = useState()
  const [newPlaylist, setNewPlaylist] = useState("")
  const [addedTracks, setAddedTracks] = useState([])
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const userAuthToken = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "";

  useEffect(() => {
    if(!message?.success) {
      toast.error(message.message, TOAST_OPTIONS);
    } else {

      toast.success(message.message, TOAST_OPTIONS);
    }
  }, [message])

  useEffect(() => {
    setAddedTracks([])
    // setSelectedOption(null);
    setIsLoading(true);
    if (track) {
      // track included playlists
      axios.request({
        headers: {
          "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
          "auth-token": userAuthToken
        },
        method: "get",
        url: (`${BASE_URL}/api/v1/consumer/tracks/${track.id}/consumers_playlists?filter_type=include`)

      }).then(response => {
        if (!response.status === 200) {
          onCloseModal(false);
          toast.error("Error while fetching playlists.");
        } else {
          if (response.data.length > 0) {
            setAddedTracks([])
            setIsLoading(false);
            response.data.map((playlist, index) =>
              {
                setAddedTracks(addedTracks=>[...addedTracks, playlist])
              }
            )
          }
        }
      }).catch(error => {
        onCloseModal(true);
        toast.error(error.response.data.message);
      });
      // track exluded playlists
      axios.request({
        headers: {
          "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
          "auth-token": userAuthToken
        },
        method: "get",
        url: (`${BASE_URL}/api/v1/consumer/tracks/${track.id}/consumers_playlists?filter_type=exclude`)

      }).then(response => {
        if (!response.status === 200) {
          toast.error("Error while fetching playlists.");
        } else {
          if (response.data) {
            setOptions([])
            setIsLoading(false);
            response.data.map((playlist, index) =>
              {
                let obj = {};
                obj['value'] = playlist.id;
                obj['label'] = playlist.name;
                setOptions(options=> [...options, obj])
                // options.push(obj);
                // setAddedTracks(addedTracks=>[...addedTracks, playlist.name])
              }
            )
            setIsLoading(false);
          }
        }
      }).catch(error => {
        onCloseModal(true);
        toast.error(error.response.data.message);
      });
    }

  }, [track, newPlaylist])

  // const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setIsLoading(true)
    axios.request({
      headers: {
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        "auth-token": userAuthToken
      },
      method: "POST",
      url: (`${BASE_URL}/api/v1/consumer/tracks/${track.id}/consumers_playlists/?id=${selectedOption[selectedOption.length - 1].value}`)

    }).then(response => {
      if (!response.status === 200) {
        toast.error("Error while adding track to playlist.");
      } else {
        setNewPlaylist(response.data.status)
        toast.success(response.data.status);
      }
    }).catch(error => {
      onCloseModal(true);
      toast.error(error.response.data.message);
    });
  };

  const handleRemoveTrack = (e, playlist) => {
    setIsLoading(true)
    axios.request({
      headers: {
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        "auth-token": userAuthToken
      },
      method: "DELETE",
      url: (`${BASE_URL}/api/v1/consumer/tracks/${track.id}/consumers_playlists/${playlist.id}`)

    }).then(response => {
      if (!response.status === 200) {
        toast.error("Error while deleting track to playlist.");
      } else {
        setNewPlaylist(response.data.status)
        toast.success(response.data.status);
      }
    }).catch(error => {
      onCloseModal(true);
      toast.error(error.response.data.message);
    });
  }

  const handleClose = () => {
    onCloseModal(false);
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal addToFavorite">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">Add song to playlist</h2>
          <h2 className="modalName">{track? track.title : ""}</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height: '500px'}}>
      {!isLoading ? (
        <div className="favoriteInnerContent">
          <Select
            className='react-select-container'
            classNamePrefix="react-select"
            placeholder="Find an existing Playlist"
            isMulti
            onChange={handleChange}
            options={options}
          />
          <div className="playlistNames">
            <h4>Track appears on these playlists</h4>
            <ul className="scrollingList">
              {addedTracks.map((trackPlaylist, index) =>
                <li key={index}>
                  <a href="javascript:void(0)">{trackPlaylist.name}</a>
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
              )}
            </ul>
            <button className="btn btnMainLarge btn-block">
              Add to Current Playlist</button>
          </div>
        </div>
        ) : (
          <div>
            <InpageLoader />
          </div>
        )}
        
      </Modal.Body>
    </Modal>
  );
}

export default AddToPlaylist;