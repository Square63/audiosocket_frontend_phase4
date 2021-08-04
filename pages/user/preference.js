import withPrivateRoute from "../../components/withPrivateRoute";

function Preference() {
  return (
    <h1>User Preference page</h1>
  );
}

export default withPrivateRoute(Preference);