import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";

function DownloadTrackLicense({showModal = false, onCloseModal}) {
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

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal downloadTrackLicense">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">License Track</h2>
          <p className="modalTrackName">
            Saving
          </p>
          <p className="modalTrackArtist">
            Justin G. Marcellus
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          
          <h4 className="modalBodyHeading">Load A Track To Find Similar Songs</h4>
          <p className="modalBodytext">Upload MP3 or WAV</p>
          <Form.Group controlId="formFile" className="uploadComponent">
            <Form.Control type="file" />
          </Form.Group>
          <div className="modalBtnWrapper">
            <a href="javascript:void(0)" className="btn btnMainLarge">Upload and Search</a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DownloadTrackLicense;