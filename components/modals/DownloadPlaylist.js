import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ToastContainer, toast } from 'react-toastify';

function DownloadPlaylist({showModal = false, onCloseModal}) {

  const handleClose = () => {
    onCloseModal(false);
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="themeModal downloadPlaylistModal">
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="modalName">Download Playlist</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            <div className="py-3">
              <div className="siteLoader">
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
              </div>
              <h5 className="textCenter">Please wait while your download is in progress...</h5>
            </div>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default DownloadPlaylist;