import Link from "next/link";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'next/image'
import logo from '../images/logo.svg';
import { useRouter } from "next/router";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../store/authContext";
import {LoaderImage} from "./LoaderImage";

function Header() {
  const { authState, authActions } = useContext(AuthContext);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, [authState.user])

  const toggleDropdown = (e, path) => {
    e.preventDefault();
    router.push(path);
  }

  return (
    <header className="fixed-top">
      <div className="custom-container">
        <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-nav">
          <Navbar.Brand href="/">
            <Image loader={LoaderImage} src={logo} alt="LOGO" className="logo-icon"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <div className={router.pathname.toLowerCase() === "/browse-music" ? "nav-link active" : "nav-link"}>
                <Link href="/search">Browse Music</Link>
              </div>
              <div className={router.pathname.toLowerCase() === "/sfx" ? "nav-link active" : "nav-link"}>
                <Link href="/sfx">SFX</Link>
              </div>
              <div className={router.pathname.toLowerCase() === "/playlist" ? "nav-link active" : "nav-link"}>
                <Link href="/playlist">Playlists</Link>
              </div>

              <div className={router.pathname.toLowerCase() === "/pricing" ? "nav-link active" : "nav-link"}>
                <Link href="/pricing">Pricing</Link>
              </div>
              {!isLoggedIn
                ?
                  <>
                    <div className={router.pathname.toLowerCase() === "/login" ? "nav-link active" : "nav-link"}>
                      <Link href="/login">Sign In</Link>
                    </div>
                    <div className={router.pathname.toLowerCase() === "/signup" ? "btn nav-link active" : "btn nav-link"}>
                      <Link href="/signup">Sign Up</Link>
                    </div>
                  </>
                :
                  <NavDropdown title="HJ" id="collasible-nav-dropdown" className={"btn btn-account nav-link"}>
                    <div className="info">
                      <div className="name-circle"><span>HJ</span></div>
                      <div className="name"><span>Hamza Jabbar</span></div>
                      <div className="email">hamza.jabbar@square63.com</div>
                    </div>
                    <NavDropdown.Item className={router.pathname.toLowerCase() === "/user/edit" ? "profile active" : "profile"} onClick={(e) => toggleDropdown(e, "/user/edit")}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item className={router.pathname.toLowerCase() === "/user/licenses" ? "licences active" : "licences"} onClick={(e) => toggleDropdown(e, "/user/licenses")}>
                      Licenses
                    </NavDropdown.Item>
                    <NavDropdown.Item className={router.pathname.toLowerCase() === "/user/favorites" ? "favorites active" : "favorites"} onClick={(e) => toggleDropdown(e, "/user/favorites")}>
                      Favorites
                    </NavDropdown.Item>
                    <NavDropdown.Item className={router.pathname.toLowerCase() === "/user/following" ? "following active" : "following"}  onClick={(e) => toggleDropdown(e, "/user/following")}>
                      Following
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <a className="logout" onClick={() => {authActions.userDataStateChanged(null); setIsLoggedIn(false); router.push('/login')}}>
                      logout
                    </a>
                  </NavDropdown>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
 }

 export default Header;