import Link from "next/link";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
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
              {!isLoggedIn &&
                <>
                  <div className={router.pathname.toLowerCase() === "/login" ? "nav-link active" : "nav-link"}>
                    <Link href="/login">Sign In</Link>
                  </div>
                  <div className={router.pathname.toLowerCase() === "/signup" ? "btn nav-link active" : "btn nav-link"}>
                    <Link href="/signup">Sign Up</Link>
                  </div>
                </>
              }
              {isLoggedIn &&
                <>
                  <div className={"nav-link"}>
                    <a onClick={() => {authActions.userDataStateChanged(null); setIsLoggedIn(false); router.push('/login')}}>logout</a>
                  </div>
                  <div className={"btn nav-link"}>
                    <Link href="/user/edit">Account</Link>
                  </div>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
 }

 export default Header;