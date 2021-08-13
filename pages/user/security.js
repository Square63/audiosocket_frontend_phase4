import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";

function Security() {
  return (
    <div className={'userContent '+user.security}>
     <div>Email</div>
     <div>Password</div>
    </div>
  );
}

export default withPrivateRoute(Security);