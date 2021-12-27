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
          <div className="modalPlansInfo">
          <div className="licensePriceOption"></div>
            <div className="discountOffer">
              <h4>Save money with unlimited music licenses</h4>
              <div className=""></div>
            </div>
          </div>
          <div className="modalLicenseInfo">
            <h3>License Info</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Please add your Video or Work Title to your License</Form.Label>
                <Form.Control type="text" placeholder="Enter work title…" />
              </Form.Group>
              <Button variant="link" className="btn btnMainLarge btn-block" type="submit">
                Checkout and License Track - <span className="modalPriceBtn">$129</span>
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DownloadTrackLicense;