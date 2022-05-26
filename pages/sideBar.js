import signup from "../styles/Signup.module.scss";
import pricing from "../styles/Pricing.module.scss";
import Image from 'next/image';
import mood1 from '../images/mood1.png';
import {useState, useEffect} from "react";
import { Breadcrumb, Form, Button, Carousel, FormGroup, FormControl, Row, Col, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
function SideBar() {
  
  const handleSidebarShow = () => {
    document.getElementById("offcanvasRight").classList.add("show");
    document.getElementsByClassName("sidebarBackdrop")[0].classList.add("active");
    document.body.classList.add('overflow-hidden');
  }
  const handleSidebarHide = () => {
    document.getElementById("offcanvasRight").classList.remove("show");
    document.getElementsByClassName("sidebarBackdrop")[0].classList.remove("active");
    document.body.classList.remove('overflow-hidden');
  }
  
  
  return (
    <div>
      <a href="javascript:void(0)" className="btn btnMainLarge" onClick={() => handleSidebarShow()}>Launch</a>
      <div className="sidebarBackdrop" onClick={() => handleSidebarHide()}></div>
      <div className="offcanvas offcanvas-end" id="offcanvasRight">
        <div className="offcanvasHeader">
          <div className="sidebartrackInfo">
            <a href="javascript:void(0)" className="tileOverlay">
              <Image src={mood1} alt="Mood" className="tilesImg"></Image>
            </a>
            <div className="trackDesc">
              <h3 className="trackName">BROWN SKY (OMNIVERSE MIX)</h3>
              <p className="artistName">Lucy Bland</p>
            </div>
          </div>
          <a href="javascript:void(0)" className="btnClose" onClick={() => handleSidebarHide()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.121" height="16.121" viewBox="0 0 16.121 16.121">
              <g id="Group_112" data-name="Group 112" transform="translate(-11680.439 270.061)">
                <g id="Group_80" data-name="Group 80" transform="translate(129 1304.5)">
                  <line id="Line_70" data-name="Line 70" x1="14" y2="14" transform="translate(11552.5 -1573.5)" fill="none" stroke="#707070" strokeWidth="3"/>
                  <line id="Line_71" data-name="Line 71" x2="14" y2="14" transform="translate(11552.5 -1573.5)" fill="none" stroke="#707070" strokeWidth="3"/>
                </g>
              </g>
            </svg>
          </a>
        </div>
        <div className="offcanvas-body">
          {/* Sign Up Form */}
          {/* <div className={signup.sidebarDeviseForm}>
            <h2 className="offcanvasHeading">Sign Up</h2>
            <p className="offcanvasDesc">Already have an account? <a href="javascript:void(0)">Sign In</a></p>
            <div className={pricing.formWrapper}>
              <h3>Create Account</h3>
              <Form className={pricing.sidebarForm}>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="text" placeholder="Enter Last Name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-2 text-center">
                  <Button variant="link" className="btn btnMainLarge" type="submit">
                    <span>Continue</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
                      <g id="icon-arrow-down" transform="translate(1 11.914) rotate(-90)">
                        <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      </g>
                    </svg>
                  </Button>
                </div>
              </Form>
            </div>
            <div className={signup.existingAccount}>
              <div className={signup.or}>
                <span>OR</span>
              </div>
              <div className={signup.socialBtn}>
                <a href='' className={signup.facebook+' '+signup.signupBtn}>
                  <div>
                    <div className={signup.icon}></div>
                    <span>Continue  with Facebook</span>
                  </div>
                </a>
                <a href='' className={signup.google+' '+signup.signupBtn}>
                  <div>
                    <div className={signup.icon}></div>
                    <span>Continue  with Google</span>
                  </div>
                </a>
                <a href='' className={signup.apple+' '+signup.signupBtn}>
                  <div>
                    <div className={signup.icon}></div>
                    <span>Continue  with Apple</span>
                  </div>
                </a>
              </div>
            </div>
          </div> */}

          {/* Sign In Form */}
          {/* <div className={signup.sidebarDeviseForm}>
            <h2 className="offcanvasHeading">Sign In</h2>
            <p className="offcanvasDesc">Don’t have an account yet? <a href="javascript:void(0)">Sign Up</a></p>
            <div className={pricing.formWrapper}>
              <h3>Create Account</h3>
              <Form className={pricing.sidebarForm}>
                <Row>
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-2 text-center">
                  <Button variant="link" className="btn btnMainLarge" type="submit">
                    <span>Sign In</span>
                  </Button>
                </div>
              </Form>
            </div>
            <div className={signup.existingAccount}>
              <div className={signup.or}>
                <span>OR</span>
              </div>
              <div className={signup.socialBtn}>
                <a href='' className={signup.facebook+' '+signup.signupBtn}>
                  <div>
                    <div className={signup.icon}></div>
                    <span>Continue  with Facebook</span>
                  </div>
                </a>
                <a href='' className={signup.google+' '+signup.signupBtn}>
                  <div>
                    <div className={signup.icon}></div>
                    <span>Continue  with Google</span>
                  </div>
                </a>
                <a href='' className={signup.apple+' '+signup.signupBtn}>
                  <div>
                    <div className={signup.icon}></div>
                    <span>Continue  with Apple</span>
                  </div>
                </a>
              </div>
            </div>
          </div> */}

          {/***************** Sidebar Plans Types ************************/}
          <div className={pricing.sideBarPlansWrapper+' '+pricing.pricingWrapper}>
            <h2 className="offcanvasHeading">License track</h2>
            <div className={pricing.plansContent}>
              <div className="themeBreadcrumb inPricingWay">
                <Breadcrumb>
                  <Breadcrumb.Item href="#">Commercial</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">Web Only</Breadcrumb.Item>
                  <Breadcrumb.Item active>Under 100 Employees</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              {/* Plan types Code */}
              {/* <div className={pricing.planTypes}>
                <div className={pricing.pricingLeftSec}>
                  <p>What type of content are you creating?</p>
                </div>
                <div className={pricing.pricingRightSec}>
                  <ul className={pricing.plansList}>
                    <li className={pricing.plansItem}>
                      <a href="javascript:void(0)">
                        <span className={pricing.typeName}>
                          <span className={pricing.typeHeading}>Under 100 employees</span>
                          <span className={pricing.typeDesc}>Commercial License</span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
                          <g id="icon-arrow-down" transform="translate(1 11.914) rotate(-90)">
                            <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                            <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                            <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li className={pricing.plansItem}>
                      <a href="javascript:void(0)">
                        <span className={pricing.typeName}>
                          <span className={pricing.typeHeading}>Over 100 Employees</span>
                          <span className={pricing.typeDesc}>Enterprise License</span>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
                          <g id="icon-arrow-down" transform="translate(1 11.914) rotate(-90)">
                            <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                            <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                            <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}

              {/******************* Choose Plan *****************/}
              <div className={pricing.sidebarChoosePlans}>
                <h4>Purchase Options</h4>
                <div className={pricing.choosePlans}>
                  <div className={pricing.pricingLeftSec}>
                    <div className={pricing.plansFeatures}>
                      <div className={pricing.featureInclude}>
                        <h4>What it’s good for:</h4>
                        <ul>
                          <li>Small business media (under 50 employees)</li>
                          <li>Freelancers creating media for small business clients</li>
                          <li>Web streaming on social media (YouTube, Vimeo, Instagram etc)</li>
                          <li>YouTube monetization</li>
                          <li>Wedding / Event videos</li>
                          <li>Digital Ads (Pre-Roll, Post-Roll, Facebook, Instagram)</li>
                        </ul>
                      </div>
                      <div className={pricing.featureNotInclude}>
                        <h4>What it’s not for:</h4>
                        <ul>
                          <li>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc) </li>
                          <li>Games & Apps</li>
                          <li>Theatrical release</li>
                        </ul>
                      </div>
                    </div>
                  </div>
          
                  <div className={pricing.pricingRightSec}>
                    <div className={pricing.planBillingWrapper}>
                      <div className={pricing.planWrapperHeading}>
                        <h5>Unlimited Songs</h5>
                        <p>Subscription</p>
                      </div>
                      <div className="billingFrequency">
                        <span>Billing Frequency</span>
                        <div className="toggleButton">
                          <input id="toggle-on" className="toggle toggleLeft" name="toggle" value="false" type="radio" checked/>
                          <label htmlFor="toggle-on" className="movingBtn">Annually</label>
                          <input id="toggle-off" className="toggle toggleRight" name="toggle" value="true" type="radio"/>
                          <label htmlFor="toggle-off" className="movingBtn">Monthly</label>
                        </div>
                        <em>Save 44% with an annual plan</em>
                      </div>
                      <div className={pricing.planSelect}>
                        <p className={pricing.selectText}>Select:</p>
                        <div className={pricing.planIndividual}>
                          <div className={pricing.planType}>
                            <span>Select Plan</span>
                            <p className={pricing.planName}>Music Only</p>
                          </div>
                          <div className={pricing.planPriceDuration}>
                            <span className={pricing.planAmount}>$33.25</span>
                            <span className={pricing.planDuration}>/Month<sup>*</sup></span>
                          </div>
                        </div>

                        <div className={pricing.planIndividual}>
                          <div className={pricing.planType}>
                            <span>Select Plan</span>
                            <p className={pricing.planName}>Music + SFX</p>
                          </div>
                          <div className={pricing.planPriceDuration}>
                            <span className={pricing.planAmount}>$45.75</span>
                            <span className={pricing.planDuration}>/Month<sup>*</sup></span>
                          </div>
                        </div>

                        <small className={pricing.billingNote}>*Monthly rates when billed annually</small>
                      </div>
                    </div>
                    <div className={pricing.oneTimePurchase}>
                      <span className={pricing.typeName}>
                        <span className={pricing.typeHeading}>Single Track</span>
                        <span className={pricing.typeDesc}>One-time use pricing available at checkout</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default SideBar;