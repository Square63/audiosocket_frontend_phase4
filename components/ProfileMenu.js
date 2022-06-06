import withPrivateRoute from "./withPrivateRoute";
import Link from "next/link";
import {useRouter} from "next/router";
import user from "../styles/User.module.scss";

function ProfileMenu() {
  const router = useRouter();

  return (
    <ul className={user.userNav}>
      <li className={router.pathname.toLowerCase() === "/user/edit" ? "profile selected" : "profile"}>
        <Link href="/user/edit">
          <a>
            <span className="desktopShow">Profile</span>
            <svg className="mobileShow" xmlns="http://www.w3.org/2000/svg" width="22.651" height="22.654" viewBox="0 0 22.651 22.654"><g id="Group_2" data-name="Group 2" transform="translate(1 1)"><path id="Path_4" data-name="Path 4" d="M726.184,386.175l-7.511,4.51v1.377a.691.691,0,0,0,.689.689h19.274a.691.691,0,0,0,.689-.689v-1.377h0l-7.511-4.506" transform="translate(-718.673 -372.097)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path id="Path_5" data-name="Path 5" d="M736.215,372.989a8.3,8.3,0,0,0,2.818-6.04v-4.018c-.406-2.282-3.16-4.02-5.63-4.02h0c-2.471,0-5.224,1.738-5.629,4.02v4.018a8.289,8.289,0,0,0,2.818,6.038" transform="translate(-723.075 -358.911)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></g></svg>
          </a>
        </Link>
      </li>
      <li className={router.pathname.toLowerCase() === "/user/licenses" ? "licences selected" : "licences"}>
        <Link href="/user/licenses">
          <a>
            <span className="desktopShow">Licenses</span>
            <svg className="mobileShow" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><circle cx="128" cy="136" r="32" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle><path d="M80,192a60,60,0,0,1,96,0" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><rect className={user.rectLicense} x="32" y="48" width="192" height="160" rx="8" transform="translate(256) rotate(90)" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></rect><line x1="96" y1="64" x2="160" y2="64" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line></svg>
          </a>
        </Link>
      </li>
      <li className={router.pathname.toLowerCase() === "/user/downloads" ? "downloads selected" : "downloads"}>
        <Link href="/user/downloads">
          <a>
            <span className="desktopShow">Downloads</span>
            <svg className="mobileShow" xmlns="http://www.w3.org/2000/svg" width="22.743" height="21.503" viewBox="0 0 22.743 21.503">
              <g id="icon-download" transform="translate(0.5 21.003) rotate(-90)">
                <path id="Shape_111" data-name="Shape 111" d="M11.589,4.254V.945A.92.92,0,0,0,10.7,0H.891A.92.92,0,0,0,0,.945V20.8a.92.92,0,0,0,.891.945H10.7a.92.92,0,0,0,.891-.945V17.489" fill="#fff" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                <path id="Shape_112" data-name="Shape 112" d="M0,0H16.937" transform="translate(3.566 10.872)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                <path id="Shape_113" data-name="Shape 113" d="M4.457,0,0,4.727,4.457,9.454" transform="translate(3.566 6.145)" fill="none" stroke="#6e7377" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
              </g>
            </svg>
          </a>
        </Link>
      </li>
      <li className={router.pathname.toLowerCase() === "/user/favorites" ? "favorites selected" : "favorites"}>
        <Link href="/user/favorites">
          <a>
            <span className="desktopShow">Favorites</span>
            <svg className="mobileShow" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
          </a>
        </Link>
      </li>
      <li className={router.pathname.toLowerCase() === "/user/following" ? "following selected" : "following"}>
        <Link href="/user/following">
          <a>
            <span className="desktopShow">Following</span>
            <svg className="mobileShow" xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="136" x2="248" y2="136" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="224" y1="112" x2="224" y2="160" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><circle cx="108" cy="100" r="60" fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="16"></circle><path d="M22.2,200a112,112,0,0,1,171.6,0" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path></svg>
          </a>
        </Link>
      </li>
    </ul>
  );
}

export default withPrivateRoute(ProfileMenu);
