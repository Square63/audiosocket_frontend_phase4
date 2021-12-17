import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";

function ForgotPasswordModal({showModal = false, onCloseModal}) {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const forgotPasswordForm = e.currentTarget;
    if (forgotPasswordForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = new FormData(form.current);
      setIsLoading(false);
      e.target.reset();
      handleClose();
      alert('email sent');
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
      aria-labelledby="contained-modal-title-vcenter"
      className="themeModal">
      <Form className="forgot-password-form" noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2 className="modalName">Forgot Password</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            <div className="form-group">
              <Form.Label className="required">Get a link to reset your password on your email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                A valid email address is required!
              </Form.Control.Feedback>
            </div>
          </div>
          <div class="modalBtnWrapper">
            <Button type="submit" variant="link" className="btn btnMainLarge">{isLoading ? <>Submitting...<Image loader={LoaderImage} src={Loader} alt="icon"/></> : "Submit"}</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default ForgotPasswordModal;