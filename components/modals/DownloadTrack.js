import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import { BASE_URL } from "../../common/api";

function PreferenceModal({showModal = false, onCloseModal, track, type}) {
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

  function convertSecToMin(duration) {
    if (duration != null) {
      let minutes = Math.floor(duration / 60);
      let seconds = duration - minutes * 60;
      return minutes+':'+parseInt(seconds)
    }

  }

  const handleDownload = async (track, type) => {
    let url = type == "track" ? `${BASE_URL}/api/v1/consumer/tracks/${track.id}/add_download_track` : `${BASE_URL}/api/v1/consumer/sfxes/4/add_download_sfx`
    const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    const response = await fetch(url,
      {
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8",
          "auth-token": userAuthToken
        },
        method: "POST"
      });
    if(response.ok) {
      debugger
      const link = document.createElement("a");
      link.href = track.file;
      link.download = track.title;
      link.click();
    } else {
      
    }
    
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
            {track ? track.title : ""}
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
              <span className="versionDuration">{track ? convertSecToMin(track.duration) : "0:0"}</span>
              <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(track, type)}>
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </a>
            </li>
            <li>
              <span className="versionType">Instrumental</span>
              <span className="versionDuration">0:16</span>
              <a variant="link" href={track ? track.file : ""} download className="btn btnMainLarge versionSize">
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </a>
            </li>
            <li>
              <span className="versionType">Instrumental</span>
              <span className="versionDuration">0:29</span>
              <a variant="link" className="btn btnMainLarge  versionSize">
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </a>
            </li>
            <li>
              <span className="versionType">Instrumental</span>
              <span className="versionDuration">1:16</span>
              <a variant="link" className="btn btnMainLarge versionSize">
                <strong>MP3</strong>
                <span>(2.52 MB)</span>
              </a>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PreferenceModal;