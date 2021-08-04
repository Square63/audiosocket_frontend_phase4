import withPrivateRoute from "../../components/withPrivateRoute";

function Following() {
  return (
    <h1>User Following page</h1>
  );
}

export default withPrivateRoute(Following);