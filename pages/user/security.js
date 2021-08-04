import withPrivateRoute from "../../components/withPrivateRoute";

function Security() {
  return (
    <h1>User Security page</h1>
  );
}

export default withPrivateRoute(Security);