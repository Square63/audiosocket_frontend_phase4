import styles from "../styles/Home.module.scss";
import Image from "next/image";
import logo from '../images/logo.svg';
import {LoaderImage} from "./LoaderImage";

function Footer() {
  return (
    <footer>
      <div className="custom-container">
        <div className="row">
          <div className="footer-logo col-md-4">
            <Image loader={LoaderImage} src={logo} alt="LOGO" className="logo-icon"/>
          </div>
          <div className="footer-nav col-xs-12 col-lg-8">
            <div className="row">
              <div className="col-xs-12 col-md-4 footer-links">
                <span className="footer-heading">music</span>
                <div className="footer-list">
                  <ul>
                    <li><a href="">all songs</a></li>
                    
                    <li><a href="">Curated Playlists</a></li>
                    
                    <li><a href="">Submit Music</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 footer-links">
                <span className="footer-heading">company</span>
                <div className="footer-list">
                  <ul>
                    <li><a href="">blog</a></li>
                    
                    <li><a href="">about us</a></li>
                    
                    <li><a href="">our work</a></li>
                    
                    <li><a href="">pricing</a></li>
                    
                    <li><a href="">privacy policy</a></li>
                    
                    <li><a href="">terms and conditions</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xs-12 col-md-4 footer-links">
                <span className="footer-heading">support</span>
                <div className="footer-list">
                  <ul>
                    <li><a href="">contact us</a></li>
                    
                    <li><a href="">Influencer Application</a></li>
                    
                    <li><a href="">FAQ</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
 }

 export default Footer;