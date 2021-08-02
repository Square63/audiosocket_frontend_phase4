import withPrivateRoute from "./withPrivateRoute";

function Sidebar() {
  return (
    <h1>User Sidebar</h1>
  );
}

export default withPrivateRoute(Sidebar);