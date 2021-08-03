import withPrivateRoute from "./withPrivateRoute";

function Sidebar() {
  return (
    <div className="userSidebar">
      <ul className="userListing">
        <li className="cms">
          <a href="">cms/admin</a>
        </li>
        <li className="profile selected">
          <a href="">profile</a>
          <ul className="subMenu">
            <li>
              <a href="">billing</a>
            </li>
            <li>
              <a href="">subsscription</a>
            </li>
            <li>
              <a href="">security</a>
            </li>
            <li>
              <a href="">prefrences</a>
            </li>
          </ul>
        </li>
        <li className="licences">
          <a href="">licences</a>
        </li>
        <li className="favorite">
          <a href="">favorite</a>
        </li>
        <li className="following">
          <a href="">following</a>
        </li>
      </ul>
    </div>
  );
}

export default withPrivateRoute(Sidebar);