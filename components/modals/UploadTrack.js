import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import { useDispatch, useSelector } from "react-redux";
import { getTracksFromAIMS } from '../../redux/actions/trackActions';
import * as Constants from '../../common/constants'

function PreferenceModal({ showModal = false, onCloseModal, loading, handleSegmentFileUploaded}) {
  const dispatch = useDispatch();
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const fileTypes = ".mp3, .wav, .aiff";

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
    const file_types = Constants.FILE_TYPES
    const files = e.target.files
    setSelectedFile(files[0])
    const type = files[0].type
    if (file_types.includes(type))
    {
      document.getElementById("uploadBtn").classList.remove("disabled");
    } else {
      document.getElementById("uploadBtn").classList.add("disabled")
    }
  }

  const handleUploadSearch = () => {
    onCloseModal(false);
    loading();
    handleSegmentFileUploaded()
    dispatch(getTracksFromAIMS('', selectedFile));
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      className="themeModal downloadTrack">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">Upload Track</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <h4 className="modalBodyHeading">Load A Track To Find Similar Songs</h4>
          <p className="modalBodytext">Upload MP3 or WAV</p>
          <Form.Group controlId="formFile" className="uploadComponent">
            <Form.Control type="file" onChange={(e) => handleFileSelect(e)} id="uploadedFile" accept={fileTypes} />
          </Form.Group>
          <div className="modalBtnWrapper">
            <a href="javascript:void(0)" className="btn btnMainLarge disabled" id="uploadBtn" onClick={handleUploadSearch}>Upload and Search</a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PreferenceModal;
