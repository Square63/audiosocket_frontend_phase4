import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import { MultiSelect } from "react-multi-select-component";


function AddToPlaylist({showModal = false, onCloseModal, playlists}) {
  const [selected, setSelected] = useState([]);

  const searchInput = useRef();
  // const options = [];

  // for(var i = 0; i < playlists.length; i++) {
  //   let obj = {};

  //   obj['value'] = playlists[i].id;
  //   obj['label'] = playlists[i].name;
  //   options.push(obj);
  // }

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
  ];
  
  
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
      <div>
        <h1>Select Fruits</h1>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddToPlaylist;