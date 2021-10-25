import Link from "next/link";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'next/image';
import logo from '../images/logoAudiosocket.svg';
import searchIcon from '../images/searchIcon.svg';
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
              <div className={router.pathname.toLowerCase() === "/browse-music" ? "nav-link active" : "nav-link"}>
                <Nav.Item>
                  <Nav.Link eventKey="1" href="/browse-music">
                    Music
                  </Nav.Link>
                </Nav.Item>
              </div>
              <div className={router.pathname.toLowerCase() === "/sfx" ? "nav-link active" : "nav-link"}>
                <Nav.Item>
                  <Nav.Link eventKey="2" href="/sfx">
                    SF
                  </Nav.Link>
                </Nav.Item>
              </div>
              <div className={router.pathname.toLowerCase() === "/playlist" ? "nav-link active" : "nav-link"}>
                <Nav.Item>
                  <Nav.Link eventKey="3" href="/playlist">
                    Playlists
                  </Nav.Link>
                </Nav.Item>
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
              <div className={router.pathname.toLowerCase() === "/search" ? "nav-link active" : "nav-link"}>
                <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="22.414" height="22.414" viewBox="0 0 22.414 22.414">
                  <g id="icon-magnifying-glass" transform="translate(1 1)">
                    <path id="Path_1" data-name="Path 1" d="M305.541,309.272a8.271,8.271,0,1,0-8.271,8.27A8.272,8.272,0,0,0,305.541,309.272Z" transform="translate(-289 -301)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <line id="Line_2" data-name="Line 2" x2="5.989" y2="5.866" transform="translate(14.011 14.134)" fill="none" stroke="#c1d72e" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
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