import { useReducer } from "react";
import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";

function Preference() {
  return (
    <div className={'userContent '+user.preferences}>
      <div className={user.preferenceInner}>
        <p>Receive marketing emails from Audiosocket?</p>
        <a href="" className="btn primary-btn">Subscribe</a>
      </div>
    </div>
  );
}

export default withPrivateRoute(Preference);