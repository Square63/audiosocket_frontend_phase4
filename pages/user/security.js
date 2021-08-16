import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import {useRef, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Loader from "../../images/loader.svg"
import Image from 'next/image'
import SecurityModal from "../../components/modals/SecurityModal";

function Security() {
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (e, type) => {
    e.preventDefault();
    setModalType(type);
    setShowModal(true);
  }

  const handleClose = (show) => {
    setShowModal(show)
  }
  return (
    <div className={'userContent '+user.security}>
      <div className={user.securityRow}>
        <label>Email</label>
        <p className={user.middleContent}>kevin.sajjad@square63.org</p>
        <a href="" className="btn primary-btn" onClick={(e) => handleShowModal(e, 'email')}>edit</a>
      </div>
      <div className={user.securityRow}>
        <label>password</label>
        <p className={user.middleContent}>***********</p>
        <a href="" className="btn primary-btn" onClick={(e) => handleShowModal(e, 'password')}>edit</a>
      </div>
      <SecurityModal showModal={showModal} modalType={modalType} onCloseModal={handleClose} />
    </div>
  );
}

export default withPrivateRoute(Security);