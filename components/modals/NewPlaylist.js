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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TOAST_OPTIONS } from '../../common/api';

function PreferenceModal({showModal = false, onCloseModal, loading}) {
  const dispatch = useDispatch();
  const formNewPlaylist = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const fileTypes = ["JPG", "PNG", "GIF", "SVG", "JPEG"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlaylistForm = e.currentTarget;
    const data = new FormData(formNewPlaylist.current);
    setIsLoading(true);
    let url = `${BASE_URL}/api/v1/consumer/consumers_playlists`;
    const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    const URL = url;
    if (newPlaylistForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
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
          toast.error("Error while creating playlist.");
        } else {
          onCloseModal(false);
          setValidated(false);
          setIsLoading(false);
          setFile(null);
          toast.success('Playlist created successfully.');
        }
      }).catch(error => {
        onCloseModal(false);
        setValidated(false);
        setIsLoading(false);
        setFile(null);
        toast.error('Error creating Playlist: Playlist image ' + error.response.data.errors.playlist_image);
      });
    }
  }

  const handleClose = () => {
    onCloseModal(false);
    setValidated(false);
    setIsLoading(false);
  }

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
          <Form className="modalForm PlaylistForm" validated={validated} noValidate ref={formNewPlaylist} onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Playlist Name <span className="labelAsterik">*</span></Form.Label>
              <Form.Control required type="text" placeholder="Enter name" name="name" />
              <Form.Control.Feedback type="invalid">
                Name is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="dragDropContainer">
                {file ? <p className="dragDropContent">File Uploaded…</p> : <p className="dragDropContent">Drag &amp; Drop <br /> Project Image <br />Or <br />Choose File…</p>}
                <FileUploader
                  handleChange={handleChange}
                  types={fileTypes}
                  name="playlist_image"
                />
              </div>
              <p>{file ? `File name: ${file.name}` : "No files uploaded yet"}</p>
            </Form.Group>
            <Button variant="link" className={isLoading ? "btn btnMainLarge btn-block disabled" : "btn btnMainLarge btn-block"} type="submit">
              Add Playlist
            </Button>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PreferenceModal;
