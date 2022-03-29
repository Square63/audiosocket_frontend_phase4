import React, {useRef, useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTracksFromAIMS } from '../../redux/actions/trackActions';

function PreferenceModal({showModal = false, onCloseModal, loading}) {
  const dispatch = useDispatch();
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const preferenceForm = e.currentTarget;
    if (preferenceForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = new FormData(form.current);
      setIsLoading(false);
      e.target.reset();
      handleClose();
      alert('Subscribed');
    }
  }

  const handleClose = () => {
    onCloseModal(false);
    setValidated(false);
    setIsLoading(false);
  }

  const handleFileSelect = (e) => {
    if (e.target.value == '')
      document.getElementById("uploadBtn").classList.add("disabled")
    else {
      document.getElementById("uploadBtn").classList.remove("disabled")
    }
  }

  const handleUploadSearch = () => {
    onCloseModal(false);
    loading();
    dispatch(getTracksFromAIMS());
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
          <Form className="modalForm PlaylistForm">
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Playlist Name <span className="labelAsterik">*</span></Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" placeholder="Enter notes about this playlist" rows={2} />
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="dragDropContainer">
                <p className="dragDropContent">Drag &amp; Drop <br /> Project Image <br />Or <br />Choose File…</p>
                <FileUploader
                  multiple={true}
                  handleChange={handleChange}
                  name="file"
                  types={fileTypes}
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
