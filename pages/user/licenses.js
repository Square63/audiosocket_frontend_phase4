import withPrivateRoute from "../../components/withPrivateRoute";

function Licenses() {
  return (
    <h1>User Licenses page</h1>
  );
}

export default withPrivateRoute(Licenses);