import withPrivateRoute from "../components/withPrivateRoute"

function Dashboard() {
  return (
    <h1>Dashboard page</h1>
  );
}

export default withPrivateRoute(Dashboard);