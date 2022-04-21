import React, {useRef, useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTracksFromAIMS } from '../../redux/actions/trackActions';
import axios from "axios";
import { BASE_URL } from "../../common/api";

function PreferenceModal({showModal = false, onCloseModal, loading}) {
  const dispatch = useDispatch();
  const formNewPlaylist = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlaylistForm = e.currentTarget;
    const data = new FormData(newPlaylistForm.current);
    debugger
    let playlistFiles = document.getElementsByName("file")[0].files
    for(let i = 0; i < playlistFiles.length; i++)
        data.append('files[]', playlistFiles[i]);
    setIsLoading(true);
    let url = `${BASE_URL}/api/v1/consumer/consumers_playlists`;
    
    const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    const URL = url;
    await axios.request({
      headers: {
        "Authorization": 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        "auth-token": userAuthToken
      },
      method: "post",
      url: URL,
      data: data,
      
    }).then (response => {
      if (!response.status === 200) {
        // Notiflix.Notify.failure('Something went wrong, try later!', {
        //   timeout: 6000000,
        //   clickToClose: true,
        // });
      } else {
      }
    })
  }

  const handleClose = () => {
    onCloseModal(false);
    setValidated(false);
    setIsLoading(false);
  }

  const fileTypes = ["JPG", "PNG", "GIF", "SVG", "JPEG"];
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };


  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal downloadTrack">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">New Playlist</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <Form className="modalForm PlaylistForm" noValidate ref={formNewPlaylist} onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Playlist Name <span className="labelAsterik">*</span></Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" placeholder="Enter notes about this playlist" rows={2} />
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="dragDropContainer">
                <p className="dragDropContent">Drag &amp; Drop <br /> Project Image <br />Or <br />Choose File…</p>
                <FileUploader
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
                  id="playlistFiles"
                />
              </div>
              <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
            </Form.Group>
            <Button variant="link" className="btn btnMainLarge btn-block" type="submit">
              Add Project
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PreferenceModal;
