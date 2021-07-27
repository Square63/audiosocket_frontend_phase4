import Link from "next/link";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from "react-bootstrap/Button";
import Image from 'next/image'
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="fixed-top">
      <div className="custom-container">
        <Navbar collapseOnSelect expand="lg" variant="dark" className="custom-nav">
          <Navbar.Brand href="#home">
            <Image src={logo} alt="LOGO" className="logo-icon"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/playlist">Playlists</Nav.Link>
              <Nav.Link href="/music">Browse Music</Nav.Link>
              <Nav.Link href="/pricing">Pricing</Nav.Link>
              <Nav.Link href="/pricing">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
 }

 export default Header;