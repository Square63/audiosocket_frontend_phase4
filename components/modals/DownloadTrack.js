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
      link.href = track.mp3_file;
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
            {track ? track.composer : ""}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <h4 className="modalBodyHeading">Track</h4>
          <ul className="modalTrackRow">
            <li>
              <span className="versionType">{track ? track.title : "-"}</span>
              <span className="versionDuration">{track ? convertSecToMin(track.duration) : "0:0"}</span>
              <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(track, type)}>
                <strong>MP3</strong>
                <span className="versionDuration">({track ? (track.file_size/(1024*1024)).toFixed(2) : "0.0"} MB)</span>
              </a>
            </li>
            { track?.alternate_versions ? <h4 className="modalBodyHeading">Versions</h4> : ""}
            { track?.alternate_versions?.length ? (
                track.alternate_versions.map(function(item, i){
                  return(
                  <li key={i}>
                    <span className="versionType">{item.title}</span>
                    <span className="versionDuration">{item ? convertSecToMin(item.duration) : "0:0"}</span>
                    <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(item, type)}>
                      <strong>MP3</strong>
                      <span className="versionDuration">({item ? (item.file_size/(1024*1024)).toFixed(2) : "0.0"} MB)</span>
                    </a>
                  </li>)
                })
              ) : ""}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PreferenceModal;