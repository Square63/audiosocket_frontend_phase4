import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import License from "../../components/modals/License";
import {useState} from "react";

function Licenses() {
  const [showModal, setShowModal] = useState(false);

  const handleClose = (show) => {
    setShowModal(show)
  }

  return (
    <div className={'userContent '+user.userAccount}>
      <a href="javascript:void(0)" className="btn btnMainXlarge" onClick={() => setShowModal(true)}>Open License Modal</a>
      <h1>Recent Purchases</h1>
      <p> There may be a slight delay with our payment provider notifying us of your purchase.</p>
      <p>If you just completed a purchase, and don&apos;t see it available above, please wait a few minutes for our payment provider to notify us of your purchase, and <a href="/user/downloads">click here to reload this page</a>.</p>
      <p>We are working to eliminate this delay, and thank you for your patience.</p>
      <License showModal={showModal} onCloseModal={handleClose} />
    </div>
  );
}

export default withPrivateRoute(Licenses);