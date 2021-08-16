import {useReducer, useState} from "react";
import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import PreferenceModal from "../../components/modals/PreferenceModal";

function Preference() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  }

  const handleClose = (show) => {
    setShowModal(show)
  }

  return (
    <div className={'userContent '+user.preferences}>
      <div className={user.preferenceInner}>
        <p>Receive marketing emails from Audiosocket?</p>
        <a onClick={handleShowModal} className="btn primary-btn">Subscribe</a>
      </div>
      <PreferenceModal showModal={showModal} onCloseModal={handleClose} />
    </div>
  );
}

export default withPrivateRoute(Preference);