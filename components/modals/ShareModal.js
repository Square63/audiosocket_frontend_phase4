import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ToastContainer, toast } from 'react-toastify';

function ShareModal({showModal = false, onCloseModal, shareId}) {
  const id = shareId;
  const shareLink = id ? `${window.location.origin}/search/${id}` : window.location.href;

  const handleSharePlaylist = () => {
    {navigator.clipboard.writeText(shareLink)};
    toast.success("Link copied to clipboard");
  }

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
            <h2 className="modalName">Share Link</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            <div className="form-group">
              <Form.Label className="required">Copy the link to share.</Form.Label>
              <div className="linkContainer">
                <div className="shareLink">{shareLink}</div>
                <OverlayTrigger overlay={<Tooltip>Copy Link</Tooltip>}>
                  <div onClick={() => {handleSharePlaylist()}} className="copyLink">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="80" y1="128" x2="176" y2="128" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M104,176H64a48,48,0,0,1,0-96h40" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><path d="M152,176h40a48,48,0,0,0,0-96H152" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
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