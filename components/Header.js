import Link from "next/link";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button, Dropdown, DropdownButton} from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import logo from '../images/logoAudiosocket.svg';
import searchIcon from '../images/searchIcon.svg';
import { useRouter } from "next/router";
import {useContext, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {AuthContext} from "../store/authContext";
import {LoaderImage} from "./LoaderImage";
import { useCookie } from 'next-cookie'

function Header() {
  const cookie = useCookie()
  const { authState, authActions } = useContext(AuthContext);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const userToken = useSelector( state => state.user)
  const userDetails = useSelector( state => state.user.userDetails)

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
    setFullName(JSON.parse(localStorage.getItem('first_name')) + ' ' + JSON.parse(localStorage.getItem('last_name')));
  }, [userToken])

  const toggleDropdown = (e, path) => {
    e.preventDefault();
    router.push(path);
  }

  const removeClass = (e) => {
    e.target.parentElement.parentElement.parentElement.parentElement.childNodes[1].classList.add('collapsed')
    e.target.parentElement.parentElement.firstElementChild.classList.add('collapsed')
    e.target.closest('div#responsive-navbar-nav').classList.remove('show')
  }


  return (
    <header className="fixed-top">
      <div className="fixed-container">
        <Navbar collapseOnSelect expand="md" variant="dark" className="custom-nav">
          <Navbar.Brand href="/">
            <Image loader={LoaderImage} src={logo} alt="LOGO" className="logo-icon"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav >
              <Navbar.Toggle aria-controls="responsive-navbar-nav" className="closeConditional" />
              <div className={router.pathname.toLowerCase() === "/search" ? "nav-link active" : "nav-link"}>
                <Nav.Item>
                  <Nav.Link eventKey="1" href="/search">
                    Music
                  </Nav.Link>
                </Nav.Item>
              </div>
              <div className={router.pathname.toLowerCase() === "/sfx" ? "nav-link active" : "nav-link"}>
                <Nav.Item>
                  <Nav.Link eventKey="2" href="/sfx">
                    SFX
                  </Nav.Link>
                </Nav.Item>
              </div>
              <div className={router.pathname.toLowerCase() === "/CuratedPlaylist" ? "nav-link active" : "nav-link"}>
                <NavDropdown title="Playlists" className="menuDrop" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/curatedPlaylist">
                    <span>Curated Playlists</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    <span>Curated Kits</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    <span>My Playlists</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              <div className={router.pathname.toLowerCase() === "/pricing" ? "nav-link active" : "nav-link"}>
                <Nav.Item>
                  <Nav.Link eventKey="4" href="/pricing">
                    Pricing
                  </Nav.Link>
                </Nav.Item>
              </div>
              {!isLoggedIn
                ?
                  <>
                    <div className={router.pathname.toLowerCase() === "/login" ? "nav-link active" : "nav-link"}>
                      <Nav.Link href="/login">Sign in</Nav.Link>
                    </div>
                    <div className={router.pathname.toLowerCase() === "/signup" ? "btn nav-link active" : "btn nav-link"}>
                      <Nav.Link href="/signup">Sign up</Nav.Link>
                    </div>
                  </>
                :
                  <NavDropdown title="Account" className="headerAccount btn btnMainSmall" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/curatedPlaylist">
                      <span>My Playlists</span>
                    </NavDropdown.Item>
                    <NavDropdown.Item className={router.pathname.toLowerCase() === "/user/following" ? "following active" : "following"}  onClick={(e) => toggleDropdown(e, "/user/following")}>
                      <span>Followed Playlists</span>
                    </NavDropdown.Item>
                    <NavDropdown.Item className={router.pathname.toLowerCase() === "/user/edit" ? "profile active" : "profile"} onClick={(e) => toggleDropdown(e, "/user/edit")}>
                      <span>My Profile</span>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => {authActions.userDataStateChanged(null); cookie.set('user', ""); setIsLoggedIn(false); router.push('/login')}}>
                      <span>Sign Out</span>
                    </NavDropdown.Item>
                  </NavDropdown>
              }
              <div className={router.pathname.toLowerCase() === "/search" ? "nav-link active" : "nav-link"}>
                <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="22.414" height="22.414" viewBox="0 0 22.414 22.414">
                  <g id="icon-magnifying-glass" transform="translate(1 1)">
                    <path id="Path_1" data-name="Path 1" d="M305.541,309.272a8.271,8.271,0,1,0-8.271,8.27A8.272,8.272,0,0,0,305.541,309.272Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <line id="Line_2" data-name="Line 2" x2="5.989" y2="5.866" transform="translate(14.011 14.134)" fill="none" stroke="#c1d72e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </g>
                </svg>
                </Link>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
 }

 export default Header;