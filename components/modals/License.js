import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import user from "../../styles/User.module.scss";

function License({showModal = false, onCloseModal, license}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onCloseModal(false);
    setIsLoading(false);
  }

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      className="themeModal">
      <Form className="forgot-password-form" noValidate >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="modalName">License Complete</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={user.licenseCheckout}>
          <div className="modal-container">
            <p><strong>Thank you, <span className="text-capitalize">{JSON.parse(localStorage.getItem("first_name")) + ' ' + JSON.parse(localStorage.getItem("last_name"))}</span>!</strong></p>

            <p>Your music has been successfully licensed and cleared.</p>

            <p>You may now download and use {license && license.mediable.title} according to our license agreement(s).</p>

            <p>We will also send you a confirmation email to {JSON.parse(localStorage.getItem("email"))} with the download link and .pdf of the license attached, Or you can easily download your items below.</p>

            <a href={license?.license_pdf} className={user.viewLicense} target="_blank" rel="noreferrer">View License</a>
          </div>
          <div className="modalBtnWrapper">
            <Button type="submit" variant="link" className="btn btnMainXlarge">
              <span>Download Track</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="17.465" height="16.526" viewBox="0 0 17.465 16.526">
                <g id="icon-upload" transform="translate(0.5 16.026) rotate(-90)">
                  <path id="Shape_111" data-name="Shape 111" d="M8.775,3.221V.716A.7.7,0,0,0,8.1,0H.675A.7.7,0,0,0,0,.716V15.749a.7.7,0,0,0,.675.716H8.1a.7.7,0,0,0,.675-.716V13.244" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                  <path id="Shape_112" data-name="Shape 112" d="M0,0H12.826" transform="translate(2.7 8.233)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                  <path id="Shape_113" data-name="Shape 113" d="M3.375,0,0,3.579,3.375,7.159" transform="translate(2.7 4.653)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                </g>
              </svg>

            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default License;