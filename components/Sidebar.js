import withPrivateRoute from "./withPrivateRoute";
import Link from "next/link";
import {useRouter} from "next/router";

function Sidebar() {
  const router = useRouter();

  return (
    <div className="userSidebar">
      <ul className="userListing">
        <li className={router.pathname.toLowerCase() === "/user/edit" ? "profile selected" : "profile"}>
          <Link href="/user/edit">Profile</Link>
          <ul className="subMenu">
            <li className={router.pathname.toLowerCase() === "/user/billing" ? "selected" : ""}>
              <Link href="/user/billing">billing</Link>
            </li>
            <li className={router.pathname.toLowerCase() === "/user/subscription" ? "selected" : ""}>
              <Link href="/user/subscription">Subscription</Link>
            </li>
            <li className={router.pathname.toLowerCase() === "/user/security" ? "selected" : ""}>
              <Link href="/user/security">security</Link>
            </li>
            <li className={router.pathname.toLowerCase() === "/user/preference" ? "selected" : ""}>
              <Link href="/user/preference">preference</Link>
            </li>
          </ul>
        </li>
        <li className={router.pathname.toLowerCase() === "/user/licenses" ? "licences selected" : "licences"}>
          <Link href="/user/licenses">licenses</Link>
        </li>
        <li className={router.pathname.toLowerCase() === "/user/favorites" ? "favorite selected" : "favorite"}>
          <Link href="/user/favorites">favorites</Link>
        </li>
        <li className={router.pathname.toLowerCase() === "/user/following" ? "following selected" : "following"}>
          <Link href="/user/following">following</Link>
        </li>
      </ul>
    </div>
  );
}

export default withPrivateRoute(Sidebar);