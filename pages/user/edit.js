import withPrivateRoute from "../../components/withPrivateRoute";
import ProfileForm from "../../components/profile/ProfileForm";

function Edit() {
  return (
    <div className="row">
      <div className="col-lg-6">
        <fieldset>
          <legend>Profile</legend>
          <ProfileForm />
        </fieldset>
      </div>
      <div className="col-lg-6"></div>
    </div>
  );
}

export default withPrivateRoute(Edit);
