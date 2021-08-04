import withPrivateRoute from "../../components/withPrivateRoute";

function Favorites() {
  return (
    <h1>User Favorites page</h1>
  );
}

export default withPrivateRoute(Favorites);