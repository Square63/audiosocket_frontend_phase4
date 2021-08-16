import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";

function Licenses() {
  return (
    <div className={'userContent '+user.userAccount}>
      <h1>Recent Purchases</h1>
      <p> There may be a slight delay with our payment provider notifying us of your purchase.</p>
      <p>If you just completed a purchase, and don&apos;t see it available above, please wait a few minutes for our payment provider to notify us of your purchase, and <a href="/user/downloads">click here to reload this page</a>.</p>
      <p>We are working to eliminate this delay, and thank you for your patience.</p>
    </div>
  );
}

export default withPrivateRoute(Licenses);