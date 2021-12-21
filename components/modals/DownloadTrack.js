import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";

function PreferenceModal({showModal = false, onCloseModal}) {
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
      className="themeModal downloadTrack">
      <Modal.Header closeButton>
        <Modal.Title >
          <h2 className="modalName">Download Track</h2>
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
          <h4 className="modalBodyHeading">Versions</h4>
          <ul className="modalTrackRow">
            <li>
              <span className="versionType">Full Track</span>
              <span className="versionDuration">3:46</span>
              <button variant="link" className="btn btnMainLarge versionSize">
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </button>
            </li>
            <li>
              <span className="versionType">Instrumental</span>
              <span className="versionDuration">0:16</span>
              <button variant="link" className="btn btnMainLarge versionSize">
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </button>
            </li>
            <li>
              <span className="versionType">Instrumental</span>
              <span className="versionDuration">0:29</span>
              <button variant="link" className="btn btnMainLarge  versionSize">
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </button>
            </li>
            <li>
              <span className="versionType">Instrumental</span>
              <span className="versionDuration">1:16</span>
              <button variant="link" className="btn btnMainLarge versionSize">
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </button>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PreferenceModal;