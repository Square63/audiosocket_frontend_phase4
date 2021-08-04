import withPrivateRoute from "../../components/withPrivateRoute";

function Billing() {
  return (
    <h1>User Billing page</h1>
  );
}

export default withPrivateRoute(Billing);