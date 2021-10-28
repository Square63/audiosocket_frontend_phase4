import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import logo from '../images/logoAudiosocket.svg'
import {LoaderImage} from "./LoaderImage";
import MusicPlayer from "./MusicPlayer";
import React from "react";

function Footer() {
  return (
    <>
      <footer>
        <div className="fixed-container">
          <div className="row">
            <div className="footer-logo col-md-12 col-lg-3">
              <Image loader={LoaderImage} src={logo} alt="LOGO" className="logo-icon"/>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 footer-links">
              <div className="footerListPack">
                <span className="footer-heading">Music</span>
                <div className="footer-list">
                  <ul>
                    <li><a href="">All Songs</a></li>
                    <li><a href="">Curated Playlists</a></li>
                  </ul>
                </div>
              </div>
              <div className="footerListPack">
                <span className="footer-heading">Support</span>
                <div className="footer-list">
                  <ul>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="">FAQs</a></li>
                  </ul>
                </div>
              </div>
              <div className="footerListPack">
                <span className="footer-heading">Contribute</span>
                <div className="footer-list">
                  <ul>
                    <li><a href="">Curated Playlists</a></li>
                    <li><a href="">Influencer Application</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 footer-links">
              <div className="footerListPack">
                <span className="footer-heading">Company</span>
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
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 footer-links socialSection">
              <div className="footerListPack">
                <span className="footer-heading">Connect with us.</span>
                <div className="footer-list">
                  <ul className="socialList">
                    <li>
                      <a href="" className="socialLinks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6.865" height="12.359" viewBox="0 0 6.865 12.359">
                          <path id="icon-facebook" d="M38.993,6253.653H37.032c-.232,0-.491.305-.491.713v1.417h2.452v2.017H36.541v6.063H34.227V6257.8h-2.1v-2.017h2.1v-1.189a2.912,2.912,0,0,1,2.805-3.089h1.961Z" transform="translate(-32.128 -6251.504)" fill="#979da2"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="" className="socialLinks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12.632" height="10.266" viewBox="0 0 12.632 10.266">
                          <path id="icon-twitter" d="M109.794,6254.9a5.183,5.183,0,0,1-1.489.408,2.6,2.6,0,0,0,1.14-1.433,5.185,5.185,0,0,1-1.646.628,2.594,2.594,0,0,0-4.416,2.364,7.357,7.357,0,0,1-5.342-2.708,2.6,2.6,0,0,0,.8,3.46,2.579,2.579,0,0,1-1.174-.324v.033a2.592,2.592,0,0,0,2.079,2.541,2.58,2.58,0,0,1-.683.092,2.626,2.626,0,0,1-.487-.047,2.6,2.6,0,0,0,2.421,1.8,5.2,5.2,0,0,1-3.219,1.109,5.374,5.374,0,0,1-.618-.036,7.37,7.37,0,0,0,11.346-6.21c0-.112,0-.224-.007-.335A5.273,5.273,0,0,0,109.794,6254.9Z" transform="translate(-97.162 -6253.683)" fill="#979da2"/>
                        </svg>
                      </a>
                    </li>
                    
                    <li>
                      <a href="" className="socialLinks">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11.809" height="11.809" viewBox="0 0 11.809 11.809">
                        <g id="icon-instagram" transform="translate(0)">
                          <path id="Path_22" data-name="Path 22" d="M174.958,6253.141c1.576,0,1.763.005,2.385.034a3.277,3.277,0,0,1,1.1.2,1.952,1.952,0,0,1,1.121,1.121,3.263,3.263,0,0,1,.2,1.1c.028.623.034.81.034,2.385s-.006,1.764-.034,2.387a3.279,3.279,0,0,1-.2,1.1,1.824,1.824,0,0,1-.442.678,1.843,1.843,0,0,1-.679.442,3.268,3.268,0,0,1-1.1.2c-.622.029-.809.035-2.385.035s-1.764-.006-2.386-.035a3.261,3.261,0,0,1-1.1-.2,1.958,1.958,0,0,1-1.121-1.12,3.255,3.255,0,0,1-.2-1.1c-.028-.623-.035-.809-.035-2.387s.006-1.763.035-2.384a3.241,3.241,0,0,1,.2-1.1,1.952,1.952,0,0,1,1.121-1.121,3.271,3.271,0,0,1,1.1-.2c.623-.028.809-.034,2.386-.034m0-1.064c-1.6,0-1.8.007-2.434.036a4.308,4.308,0,0,0-1.433.274,3.016,3.016,0,0,0-1.727,1.727,4.334,4.334,0,0,0-.274,1.434c-.029.629-.036.831-.036,2.433s.007,1.806.036,2.435a4.325,4.325,0,0,0,.274,1.433,3.021,3.021,0,0,0,1.727,1.728,4.344,4.344,0,0,0,1.433.275c.63.028.831.035,2.434.035s1.8-.007,2.434-.035a4.35,4.35,0,0,0,1.434-.275,3.022,3.022,0,0,0,1.727-1.728,4.314,4.314,0,0,0,.274-1.433c.029-.629.036-.83.036-2.435s-.007-1.8-.036-2.433a4.322,4.322,0,0,0-.274-1.434,3.017,3.017,0,0,0-1.727-1.727,4.314,4.314,0,0,0-1.434-.274c-.63-.028-.83-.036-2.434-.036Z" transform="translate(-169.053 -6252.077)" fill="#979da2"/>
                          <path id="Path_23" data-name="Path 23" d="M178.062,6258.055a3.032,3.032,0,1,0,3.032,3.031A3.032,3.032,0,0,0,178.062,6258.055Zm0,5a1.968,1.968,0,1,1,1.968-1.969A1.969,1.969,0,0,1,178.062,6263.055Z" transform="translate(-172.158 -6255.183)" fill="#979da2"/>
                          <path id="Path_24" data-name="Path 24" d="M187.841,6257.039a.709.709,0,1,1-.709-.709A.709.709,0,0,1,187.841,6257.039Z" transform="translate(-178.076 -6254.287)" fill="#979da2"/>
                        </g>
                      </svg>

                      </a>
                    </li>
                    <li>
                      <a href="" className="socialLinks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12.883" height="12.6" viewBox="0 0 12.883 12.6">
                          <g id="icon-youtube" transform="translate(0)">
                            <path id="Path_16" data-name="Path 16" d="M249.5,6263.742h-8.175a2.354,2.354,0,0,0-2.354,2.354v1.891a2.354,2.354,0,0,0,2.354,2.354H249.5a2.354,2.354,0,0,0,2.354-2.354V6266.1A2.355,2.355,0,0,0,249.5,6263.742Zm-6.458,1.473h-.76v3.776h-.734v-3.776h-.76v-.643h2.254Zm2.147,3.776h-.652v-.357a1.358,1.358,0,0,1-.376.3.784.784,0,0,1-.379.1.406.406,0,0,1-.341-.146.7.7,0,0,1-.114-.437v-2.726h.651v2.5a.276.276,0,0,0,.041.167.161.161,0,0,0,.134.052.369.369,0,0,0,.182-.069.861.861,0,0,0,.2-.175v-2.477h.652Zm2.364-.672a.817.817,0,0,1-.153.531.54.54,0,0,1-.443.184.781.781,0,0,1-.341-.071.841.841,0,0,1-.279-.221v.249h-.659v-4.419h.659V6266a1,1,0,0,1,.279-.227.646.646,0,0,1,.3-.078.563.563,0,0,1,.472.208.974.974,0,0,1,.163.61Zm2.26-.879h-1.247v.614a.713.713,0,0,0,.064.358.242.242,0,0,0,.221.1.271.271,0,0,0,.227-.085.707.707,0,0,0,.064-.372v-.148h.67v.167a1.046,1.046,0,0,1-.246.756.976.976,0,0,1-.731.252.9.9,0,0,1-.69-.269,1.037,1.037,0,0,1-.252-.739v-1.464a.92.92,0,0,1,.277-.691.98.98,0,0,1,.713-.267.918.918,0,0,1,.688.247.981.981,0,0,1,.24.711Z" transform="translate(-238.97 -6257.741)" fill="#979da2"/>
                            <path id="Path_17" data-name="Path 17" d="M259.23,6268.9a.258.258,0,0,0-.223.091.473.473,0,0,0-.068.292v.33h.576v-.33a.476.476,0,0,0-.069-.292A.251.251,0,0,0,259.23,6268.9Z" transform="translate(-249.343 -6260.419)" fill="#979da2"/>
                            <path id="Path_18" data-name="Path 18" d="M254.574,6268.876a.322.322,0,0,0-.139.031.464.464,0,0,0-.134.1v2.032a.565.565,0,0,0,.155.115.38.38,0,0,0,.157.036.212.212,0,0,0,.176-.071.357.357,0,0,0,.056-.224v-1.684a.392.392,0,0,0-.068-.251A.252.252,0,0,0,254.574,6268.876Z" transform="translate(-246.934 -6260.408)" fill="#979da2"/>
                            <path id="Path_19" data-name="Path 19" d="M245.031,6256.122h.826v-2.02l.961-2.849h-.84l-.511,1.945h-.052l-.537-1.945h-.832l.984,2.94Z" transform="translate(-241.608 -6251.254)" fill="#979da2"/>
                            <path id="Path_20" data-name="Path 20" d="M251,6257.5a1.12,1.12,0,0,0,.786-.263.937.937,0,0,0,.284-.723v-1.855a.866.866,0,0,0-.29-.672,1.08,1.08,0,0,0-.747-.26,1.2,1.2,0,0,0-.8.247.82.82,0,0,0-.3.665v1.862a.951.951,0,0,0,.288.728A1.083,1.083,0,0,0,251,6257.5Zm-.3-2.889a.244.244,0,0,1,.084-.19.323.323,0,0,1,.219-.071.362.362,0,0,1,.235.071.236.236,0,0,1,.089.19v1.957a.3.3,0,0,1-.088.228.332.332,0,0,1-.236.083.291.291,0,0,1-.224-.082.315.315,0,0,1-.078-.228Z" transform="translate(-244.668 -6252.537)" fill="#979da2"/>
                            <path id="Path_21" data-name="Path 21" d="M256.121,6257.555a.926.926,0,0,0,.426-.115,1.555,1.555,0,0,0,.422-.334v.4h.734v-3.591h-.734v2.727a1,1,0,0,1-.225.193.431.431,0,0,1-.205.075.176.176,0,0,1-.149-.058.288.288,0,0,1-.048-.183v-2.754h-.732v3a.754.754,0,0,0,.128.48A.461.461,0,0,0,256.121,6257.555Z" transform="translate(-247.613 -6252.634)" fill="#979da2"/>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="" className="socialLinks" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12.357" height="10.984" viewBox="0 0 12.357 10.984">
                          <path id="icon-vimeo" d="M322.847,6255.57c-.691,3.964-4.548,7.319-5.709,8.085s-2.219-.306-2.6-1.118c-.44-.925-1.757-5.943-2.1-6.359s-1.38.416-1.38.416l-.5-.671s2.1-2.557,3.7-2.877c1.7-.338,1.693,2.653,2.1,4.314.395,1.606.66,2.525,1,2.525s1-.9,1.725-2.27-.031-2.589-1.443-1.725C318.2,6252.439,323.537,6251.609,322.847,6255.57Z" transform="translate(-310.551 -6252.935)" fill="#979da2"/>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="" className="socialLinks">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.455" height="11.955" viewBox="0 0 10.455 11.955">
                          <path id="icon-tik-tok" d="M10.1,2.626A2.278,2.278,0,0,1,7.829.35.35.35,0,0,0,7.478,0H5.6a.35.35,0,0,0-.35.35V8.041A1.338,1.338,0,1,1,3.914,6.7a.35.35,0,0,0,.35-.35V4.477a.35.35,0,0,0-.35-.35A3.914,3.914,0,1,0,7.829,8.041v-3.4A4.818,4.818,0,0,0,10.1,5.2a.35.35,0,0,0,.35-.35V2.976A.35.35,0,0,0,10.1,2.626Zm0,0" fill="#979da2"/>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="footerListPack">
                <span className="footer-heading">Subscribe.</span>
                <div className="footer-list">
                <Form className="footerForm">
                  <div className="roundedForm">
                    <Form.Control type="text" className="circularInput invert" placeholder="Enter your email." />
                    <Button variant="default" type="submit" className="circularBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="15.014" height="12.278" viewBox="0 0 15.014 12.278">
                        <g id="Group_16" data-name="Group 16" transform="translate(1 10.864) rotate(-90)">
                          <path id="Shape_1938" data-name="Shape 1938" d="M0,0V12.6" transform="translate(4.725 0)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1939" data-name="Shape 1939" d="M4.725,4.725,0,0" transform="translate(0 7.875)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1940" data-name="Shape 1940" d="M0,4.725,4.725,0" transform="translate(4.725 7.875)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                      </svg>
                    </Button>
                  </div>
                </Form>
                </div>
              </div>
            </div>
            <div className="copyRight col-xs-12 col-md-12 col-lg-12">
              <span>©2021 Audiosocket. All Rights Reserved. Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
 }

 export default Footer;