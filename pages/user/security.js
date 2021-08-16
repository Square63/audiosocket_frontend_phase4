import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import {useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Loader from "../../images/loader.svg"
import Image from 'next/image'

function Security() {
  const refForm = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleSubmit = () => {

  }

  const handleShowModal = (e, type) => {
    e.preventDefault();
    setModalType(type);
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    setModalType('');
  }

  return (
    <div className={'userContent '+user.security}>
      <div onClick={(e) => handleShowModal(e, 'email')}>Email</div>
      <div onClick={(e) => handleShowModal(e, 'password')}>Password</div>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="bulk-upload-modal customArtistModal"
      >
        <Form noValidate ref={refForm} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update {modalType}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-container">

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="btn primary-btn submit">{isLoading ? <>Updating...<Image loader={LoaderImage} src={Loader} alt="icon"/></> : "Update"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default withPrivateRoute(Security);