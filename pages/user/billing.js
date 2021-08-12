import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";

function Billing() {
  return (
    <div className={'userContent '+user.userAccount}>
      <h1>Billing</h1>
      <p> You are not subscribed yet. Please, subscribe <a href="/user/subscription">here</a>.</p>
    </div>
  );
}

export default withPrivateRoute(Billing);