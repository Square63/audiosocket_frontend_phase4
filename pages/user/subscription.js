import withPrivateRoute from "../../components/withPrivateRoute";

function Subscription() {
  return (
    <h1>User Subscription page</h1>
  );
}

export default withPrivateRoute(Subscription);