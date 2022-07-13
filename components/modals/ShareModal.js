import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function ShareModal({showModal = false, onCloseModal}) {

  const handleClose = () => {
    onCloseModal(false);
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="themeModal shareModal">
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="modalName">Share Playlist Link</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            <div className="form-group">
              <Form.Label className="required">Copy a link to share playlist.</Form.Label>
              <div className="linkContainer">
                <div className="shareLink">https://prod.audiosocket.com/playlist/curatedPlaylist/1</div>
                <OverlayTrigger overlay={<Tooltip>Copy Link</Tooltip>}>
                  <div className="copyLink">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="80" y1="128" x2="176" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M104,176H64a48,48,0,0,1,0-96h40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M152,176h40a48,48,0,0,0,0-96H152" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
                  </div>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default ShareModal;