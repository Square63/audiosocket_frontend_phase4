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
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="preference-modal customArtistModal">
      <Form className="preference-form" noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Subscribe To Our Email List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            <div className="form-group">
              <Form.Control
                required
                name="email"
                type="email"
                placeholder="Email*"
              />
              <Form.Control.Feedback type="invalid">
                A valid email address is required!
              </Form.Control.Feedback>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="btn primary-btn submit">{isLoading ? <>Subscribing...<Image loader={LoaderImage} src={Loader} alt="icon"/></> : "Subscribe"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default PreferenceModal;