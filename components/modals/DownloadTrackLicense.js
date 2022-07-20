import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import router from "next/router";

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
          <div className="modalPlansInfo">
          <div className="licensePriceOption">
            <Form className="newThemeRadio roundShape">
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="form-group">
                  <Form.Check
                    label="Indie Film - $129"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    label="Individual - $10"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                  />
                  <Form.Check
                    label="Small Business - $99"
                    name="group1"
                    type={type}
                    id={`inline-${type}-3`}
                  />
                  <Form.Label className="labelBetweenForm">Not finding the license you need?</Form.Label>
                  <Form.Check
                    label="Custom License"
                    name="group1"
                    type={type}
                    id={`inline-${type}-4`}
                  />
                </div>
              ))}
            </Form>
            <p className="quriesAddress">Have a question? Email us at info@audiosocket.com to get personal assistance.</p>
          </div>
            <div className="discountOffer">
              <h4>Save money with unlimited music licenses</h4>
              <hr/>
              <div className="discountContent">
                <p>
                  For the same price as a single track license, get an unlimited subscription.
                </p>
                <a className="btn btnMainSmall" onClick={()=> {router.push('/pricing')}}>View Plans &amp; Pricing</a>
              </div>
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
                Checkout and License Track
              </Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DownloadTrackLicense;