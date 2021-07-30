import withPrivateRoute from "../../components/withPrivateRoute"

function Edit() {
  return (
    <h1>User Edit</h1>
  );
}

export default withPrivateRoute(Edit);