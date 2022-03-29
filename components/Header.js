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
  const { authState, authActions, handleAddToCart, cartCount } = useContext(AuthContext);
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

  const playlistRoutes = ["/curatedplaylist", "/myplaylists"];


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
              <div className={playlistRoutes.includes(router.pathname.toLocaleLowerCase()) ? "nav-link active" : "nav-link"}>
                <NavDropdown title="Playlists" className="menuDrop" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/playlist/curatedPlaylist">
                    <span>Curated Playlists</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/playlist/creatorKits">
                    <span>Creator Kits</span>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/playlist/myPlaylists">
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
                    <NavDropdown.Item href="/playlist/myPlaylists">
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

              {isLoggedIn && 
                <div className={router.pathname.toLowerCase() === "/cart" ? "nav-link active" : "nav-link"}>
                  <Link href="/checkout">
                    <a className="cartItem">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22.994" height="23.024" viewBox="0 0 17.994 17.024">
                        <g id="icon-cart" transform="translate(0.5 0.5)">
                          <g id="Group_155" data-name="Group 155" transform="translate(0)">
                            <g id="shopping-cart-add">
                              <path id="Oval_67" data-name="Oval 67" d="M255.607,1411.542a1.047,1.047,0,1,0-1.108-1.045A1.078,1.078,0,0,0,255.607,1411.542Z" transform="translate(-250.067 -1397.608)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1172" data-name="Shape 1172" d="M248.5,1392.452h2a.732.732,0,0,1,.72.537l2.822,11.306H257" transform="translate(-248.5 -1392.452)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1173" data-name="Shape 1173" d="M265.656,1401.62l.8-2.251a.663.663,0,0,0-.1-.628.753.753,0,0,0-.6-.289H253.412" transform="translate(-249.783 -1394.272)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1174" data-name="Shape 1174" d="M255.293,1406.452h3.459" transform="translate(-250.274 -1396.698)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Oval_68" data-name="Oval 68" d="M265.2,1412.419a3.489,3.489,0,1,0-3.694-3.483A3.594,3.594,0,0,0,265.2,1412.419Z" transform="translate(-251.895 -1396.395)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1175" data-name="Shape 1175" d="M266.5,1408.452v2.787" transform="translate(-253.201 -1397.305)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                              <path id="Shape_1176" data-name="Shape 1176" d="M264.5,1410.452h2.955" transform="translate(-252.679 -1397.912)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"/>
                            </g>
                          </g>
                        </g>
                      </svg>
                      <span className="cartBadge">{cartCount}</span>
                    </a>
                  </Link>
                </div>
              }
              <div className={router.pathname.toLowerCase() === "/search" ? "nav-link active" : "nav-link"}>
                <Link href="/checkout">
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