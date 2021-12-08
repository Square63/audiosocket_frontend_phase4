import withPrivateRoute from "./withPrivateRoute";
import Link from "next/link";
import {useRouter} from "next/router";
import user from "../styles/User.module.scss";

function ProfileMenu() {
  const router = useRouter();

  return (
    <ul className={user.userNav}>
      <li className={router.pathname.toLowerCase() === "/user/edit" ? "profile selected" : "profile"}>
        <Link href="/user/edit">Profile</Link>
      </li>
      <li className={router.pathname.toLowerCase() === "/user/licenses" ? "licences selected" : "licences"}>
        <Link href="/user/licenses">Licenses</Link>
      </li>
      <li className={router.pathname.toLowerCase() === "/user/favorites" ? "favorite selected" : "favorite"}>
        <Link href="/user/favorites">Favorites</Link>
      </li>
      <li className={router.pathname.toLowerCase() === "/user/following" ? "following selected" : "following"}>
        <Link href="/user/following">Following</Link>
      </li>
    </ul>
  );
}

export default withPrivateRoute(ProfileMenu);
