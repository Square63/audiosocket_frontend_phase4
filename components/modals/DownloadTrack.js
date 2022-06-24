import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import { BASE_URL } from "../../common/api";
import InpageLoader from "../InpageLoader";

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

  const handleDownload = async (track, type, fileType) => {
    setIsLoading(true)
    let url = type == "track" ? `${BASE_URL}/api/v1/consumer/tracks/${track.mediable ? track.mediable.id : track.id}/add_download_track` : `${BASE_URL}/api/v1/consumer/sfxes/${track.mediable ? track.mediable.id : track.id}/add_download_sfx`
    const userAuthToken = JSON.parse(localStorage.getItem("user") ?? "");
    const response = await fetch(url,
      {
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.9kL4HmyjCYJgdpBHX1g3JHAp235eKlLAO_vcPb4bYGk",
          "auth-token": userAuthToken
        },
        method: "POST"
      });
    if(response.ok) {
      const link = document.createElement("a");
      if (fileType == "mp3")
        link.href = track.mediable ? track.mediable.mp3_file : track.mp3_file;
      else
        link.href = track.mediable ? track.mediable.wav_file : track.wav_file;
      link.download = track.mediable ? track.mediable.title : track.title;
      link.click();
      setIsLoading(false)
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
            {track ? track.mediable ? track.mediable.title : track.title : ""}
          </p>
          <p className="modalTrackArtist">
            {track ? track.mediable ? track.mediable.artist_name : track.artist_name : ""}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading ? (

          <div className="modal-container">
            <h4 className="modalBodyHeading">Versions</h4>
            <ul className="modalTrackRow">
              <li>
                <span className="versionType">Full Track</span>
                <span className="versionDuration">{track ? track.mediable ? convertSecToMin(track.mediable.duration) : convertSecToMin(track.duration) : "0:0"}</span>
                <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(track, type, "mp3")}>
                  <strong>MP3</strong>
                  <span className="versionDuration">({track ? track.mediable ? (track.mediable.file_size/(1024*1024)).toFixed(2) : (track.file_size/(1024*1024)).toFixed(2) : "0.0"} MB)</span>
                </a>
              </li>
              {track && track.wav_file &&
                <li>
                  <span className="versionType">Full Track</span>
                  <span className="versionDuration">{track ? track.mediable ? convertSecToMin(track.mediable.duration) : convertSecToMin(track.duration) : "0:0"}</span>
                  <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(track, type, "wav")}>
                    <strong>WAV</strong>
                    <span className="versionDuration">({track ? track.mediable ? (track.mediable.wav_file_size/(1024*1024)).toFixed(2) : (track.wav_file_size/(1024*1024)).toFixed(2) : "0.0"} MB)</span>
                  </a>
                </li>
              }
              {track && track.mediable && track.mediable.wav_file &&
                <li>
                  <span className="versionType">Full Track</span>
                  <span className="versionDuration">{track ? track.mediable ? convertSecToMin(track.mediable.duration) : convertSecToMin(track.duration) : "0:0"}</span>
                  <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(track, type, "wav")}>
                    <strong>WAV</strong>
                    <span className="versionDuration">({track ? track.mediable ? (track.mediable.wav_file_size/(1024*1024)).toFixed(2) : (track.wav_file_size/(1024*1024)).toFixed(2) : "0.0"} MB)</span>
                  </a>
                </li>
              }
              { track ? track?.alternate_versions?.map(function(item, i)
                {
                  return(
                    <>
                      <li key={i}>
                        <span className="versionType">{item.title}</span>
                        <span className="versionDuration">{item ? convertSecToMin(item.duration) : "0:0"}</span>
                        <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(item, type, "mp3")}>
                          <strong>MP3</strong>
                          <span className="versionDuration">({item ? (item.file_size/(1024*1024)).toFixed(2) : "0.0"} MB)</span>
                        </a>
                      </li>
                      {item && item.wav_file &&
                        <li key={i}>
                          <span className="versionType">{item.title}</span>
                          <span className="versionDuration">{item ? convertSecToMin(item.duration) : "0:0"}</span>
                          <a variant="link" className="btn btnMainLarge versionSize" onClick={() => handleDownload(item, type, "wav")}>
                            <strong>WAV</strong>
                            <span className="versionDuration">({item ? (item.wav_file_size/(1024*1024)).toFixed(2) : "0.0"} MB)</span>
                          </a>
                        </li>
                      }
                    </>
                  )
                })
              : ""}
            </ul>
          </div>
        )
      : (<InpageLoader/>)}
      </Modal.Body>
    </Modal>
  );
}

export default PreferenceModal;
