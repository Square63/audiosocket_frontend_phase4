import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";

function SecurityModal({showModal = false, onCloseModal, modalType = "email"}) {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const securityForm = e.currentTarget;
    if (securityForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = new FormData(form.current);
      setIsLoading(false);
      e.target.reset();
      alert('updated');
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
      className="bulk-upload-modal customArtistModal">
      <Form noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update {modalType}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-container">
            {modalType === 'email'
              ? <>
                <div className="form-group">
                  <Form.Control
                    required
                    name="password"
                    type="password"
                    placeholder="Password*"
                  />
                </div>
                <div className="form-group">
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder="New Email*"
                  />
                </div>
              </>
              : <>
                <div className="form-group">
                  <Form.Control
                    required
                    name="password"
                    type="password"
                    placeholder="Current Password*"
                  />
                </div>
                <div className="form-group">
                  <Form.Control
                    required
                    name="new_password"
                    type="password"
                    placeholder="New Password*"
                  />
                </div>
                <div className="form-group">
                  <Form.Control
                    required
                    name="retype_new_password"
                    type="password"
                    placeholder="Retype New Password*"
                  />
                </div>
              </>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" className="btn primary-btn submit">{isLoading ? <>Updating...<Image loader={LoaderImage} src={Loader} alt="icon"/></> : "Update"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default SecurityModal;