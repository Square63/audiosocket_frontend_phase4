import React, {useRef, useState, useEffect} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addTrackToPlaylist } from "../../redux/actions/playlistActions";
import { TOAST_OPTIONS } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddToPlaylist({showModal = false, onCloseModal, playlists, track}) {
  const dispatch = useDispatch();
  const message = useSelector(state => state.allPlaylists);

  useEffect(() => {
    if(!message?.success) {
      toast.error(message.message, TOAST_OPTIONS);
    } else {
      toast.success(message.message, TOAST_OPTIONS);
    }
  }, [playlists])

  useEffect(() => {
    // alreadyAddedPlaylist = []
    // for (var i = 0; i < playlists.playlists[0].consumer_playlists.length; i++) {

    // }
  }, [track])


  const [selectedOption, setSelect] = useState(null);

  const handleChange = (selectedOption) => {
    setSelect(selectedOption);
    let playlistId = selectedOption.length > 0 ? selectedOption[selectedOption.length -1 ].value : ""
    dispatch(addTrackToPlaylist(playlistId, track.id));
  };

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

  // const options = [
  //   { label: "Grapes 🍇", value: "grapes" },
  //   { label: "Mango 🥭", value: "mango" },
  //   { label: "Strawberry 🍓", value: "strawberry" },
  // ];
  
  
  const handleClose = () => {
    onCloseModal(false);
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal downloadTrack">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">Add To Playlist</h2>
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
      <div>
        <h1>Select Fruits</h1>
        <Select
          isMulti
          value={selectedOption}
          onChange={handleChange}
          options={options}
        />
      </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddToPlaylist;