import signup from "../styles/Signup.module.scss";
import pricing from "../styles/Pricing.module.scss";
import { useEffect, useState, useRef } from "react";
import { Breadcrumb, Form, Button, Carousel, FormGroup, FormControl, Row, Col, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Image from 'next/image';
import mood1 from '../images/mood1.png';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from "../redux/actions/authActions";
import { authSignup } from "../redux/actions/authActions";
import { useCookie } from 'next-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_OPTIONS } from '../common/api';
import {useRouter} from "next/router";
import { getSubscriptionPlans } from "../redux/actions/authActions";
import { gmailLogin } from "../redux/actions/authActions";

function Sidebar(props) {
  const [showSignup, setShowSignup] = useState(false)
  const [step, setStep] = useState(0);
  const [planType, setPlanType] = useState("");
  const [webRights, setWebRights] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [personalMonthlyAnnual, setPersonalMonthlyAnnual] = useState("Annually");
  const [commercialMonthlyAnnual, setCommercialMonthlyAnnual] = useState("Annually");
  const [validated, setValidated] = useState(false);
  const [contentType, setContentType] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const cookie = useCookie()
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.auth);
  const form = useRef(null);
  const router = useRouter()
  const subscriptionPlans = useSelector(state => state.user.subscriptionPlans);
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState(null);


  useEffect(() => {
    dispatch(getSubscriptionPlans())
  }, []);

  useEffect(() => {
    if (subscriptionPlans) {
      setIsLoading(false)
    }
  }, [subscriptionPlans])


  useEffect(() => {

    if(!loggedInUser.user) {
      toast.error(loggedInUser.error?.message, TOAST_OPTIONS);
    } else if (loggedInUser.user && (Object.keys(loggedInUser.user).length)) {
      localStorage.setItem("user", JSON.stringify(loggedInUser.user));
      localStorage.setItem("first_name", JSON.stringify(loggedInUser.userDetails.first_name));
      localStorage.setItem("last_name", JSON.stringify(loggedInUser.userDetails.last_name));
      localStorage.setItem("email", JSON.stringify(loggedInUser.userDetails.email));
      localStorage.setItem("has_subscription", JSON.stringify(loggedInUser.userDetails.subscription_flag));
      if (JSON.stringify(loggedInUser.user) == localStorage.getItem("user"))
        cookie.set('user', JSON.stringify(loggedInUser.user))
      router.reload(window.location.pathname)
    }
  }, [loggedInUser])

  useEffect(() => {
    if (props.showSidebar)
      document.body.classList.add('overflow-hidden');
    else
      document.body.classList.remove('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showSignup, step, props.showSidebar]);

  const handleShowSignUp = (type) => {
    setShowSignup(type)
    setStep(1)
  }

  const handlePlan = (type) => {
    setPlanType(type)
    setWebRights("")
    setEmployeeNo("")
    setStep(1)
  }

  const handleWebOrRights = (type) => {
    setWebRights(type)
    setEmployeeNo("")
    setStep(1)
  }

  const handleEmplyeeNo = (type) => {
    setEmployeeNo(type)
    setStep(1)
  }

  const handleSubscriptionType = (type) => {
    setSubscriptionType(type)
    let planId = null
    let MonthlyAnnual;
    subscriptionPlans.map((plan)=> {
      if (planType == 'Personal' && personalMonthlyAnnual == 'Annually')
        MonthlyAnnual = 'Annual';
      else if (planType == 'Commercial' && commercialMonthlyAnnual == 'Annually')
        MonthlyAnnual = 'Annual';
      else
        MonthlyAnnual = 'Monthly';
      if (removeSpaces(`${planType}${MonthlyAnnual}${type}`) == removeSpaces(plan.braintree_plan_id)) {
        setPlan(plan);
        planId = plan.id;
      }
    })
    setStep(1)
    router.push(`/plans/${planId}`)
  }

  const removeSpaces = (type) => {
    return type.replace(/[^A-Z0-9]/ig, "").toLowerCase();
  }

  const handleCommercialBack = (type) => {
    setEmployeeNo(type)
    setSubscriptionType("")
  }

  const handleCollapse = (e) => {
    e.target.classList.toggle("rotateArrow")
  }

  const handlePersonalMonthlyAnnual = (type) => {
    setPersonalMonthlyAnnual(type)
    setStep(1)
  }

  const handleCommercialMonthlyAnnual = (type) => {
    setCommercialMonthlyAnnual(type)
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginForm = e.currentTarget;
    if (loginForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      const data = new FormData(form.current);
      if(!data.get('remember_me'))
        data.append('remember_me', false)

      let authData = {
        email: data.get('email'),
        password: data.get('password')
      };
      dispatch(authLogin(authData));
    }
  }

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    setConfirmPasswordError(false);
    const signupForm = e.currentTarget;
    const data = new FormData(form.current);
    if(data.get('password') !== data.get('confirm_password')) {
      setConfirmPasswordError(true);

    }
    if (signupForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);

    } else {
      let authData = {
        email: data.get("email"),
        first_name: data.get("first_name"),
        last_name: data.get("last_name"),
        password: data.get("password"),
        password_confirmation: data.get("confirm_password"),
        content_type: contentType,
      };
      dispatch(authSignup(authData));
    }
  }

  const handleConfirmPassword = () => {
    const data = new FormData(form.current);
    if(!data.get('confirm_password')) {
      setConfirmPasswordError(false);
      return;
    }
    if(data.get('password') !== data.get('confirm_password'))
      setConfirmPasswordError(true);
    else
      setConfirmPasswordError(false);
  }

  const handleSelectContentType = (target) => {
    setContentType(target.value);
  }

  const handleGmailLogin = () => {
    dispatch(gmailLogin());
  }

  return (
    <div>

      <div className={props.showSidebar ? "sidebarBackdrop active" : "sidebarBackdrop" } onClick={() => props.handleSidebarHide()}></div>
      <div className={props.showSidebar ? "offcanvas offcanvas-end show" : "offcanvas offcanvas-end" } id="offcanvasRight">
        <div className="offcanvasHeader">
          <div className="sidebartrackInfo">
            <a href="javascript:void(0)" className="tileOverlay">
              {props.track && props.track.album_artwork && <Image src={props.track.album_artwork} alt="Mood" className="tilesImg" layout="fill"></Image>}
            </a>
            <div className="trackDesc">
              <h3 className="trackName">{props.track ? props.track.title : ""}</h3>
              <p className="artistName">{props.track ? props.track.artist_name : ""}</p>
            </div>
          </div>
          {/* <ToastContainer
            position="top-center"
            autoClose={10000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ width: "auto" }}
          /> */}
          <a href="javascript:void(0)" className="btnClose" onClick={() => props.handleSidebarHide()}>
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
          {
            props.sidebarType == "login" &&
              /* Sign Up Form */
              <>
                { showSignup &&
                  <div className={signup.sidebarDeviseForm}>
                    <h2 className="offcanvasHeading">Sign Up</h2>
                    <p className="offcanvasDesc">Already have an account? <a href="javascript:void(0)" onClick={()=> handleShowSignUp(false)}>Sign In</a></p>
                    <div className={pricing.formWrapper}>
                      <h3>Create Account</h3>
                      <Form noValidate validated={validated} ref={form} onSubmit={handleSignUpSubmit} className={pricing.sidebarForm}>
                        <Row className="halfGutters">
                          <Col sm={6} xs={12}>
                            <Form.Group className="mb-4">
                            <Form.Control required name="first_name" type="text" placeholder="First Name" />
                            <Form.Control.Feedback type="invalid">
                              First name is required!
                            </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col sm={6} xs={12}>
                            <Form.Group className="mb-4">
                            <Form.Control required name="last_name" type="text" placeholder="Last Name" />
                            <Form.Control.Feedback type="invalid">
                              Last name is required!
                            </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-4">
                            <Form.Control required name="email" type="email" placeholder="Email" />
                            <Form.Control.Feedback type="invalid">
                              A valid email address is required!
                            </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row className="halfGutters">
                          <Col sm={6} xs={12}>
                            <Form.Group className="mb-4">
                            <Form.Control required name="password" type="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">
                              Password is required!
                            </Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          <Col sm={6} xs={12}>
                            <Form.Group className="mb-4">
                            <Form.Control className={confirmPasswordError ? "confirm_password invalid" : "confirm_password"} name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleConfirmPassword} />
                            {confirmPasswordError &&
                            <small className="input-error">Password doesn&apos;t match!</small>
                            }
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
                        <a href="javascript:void(0)" className={signup.google+' '+signup.signupBtn} onClick={handleGmailLogin}>
                          <div>
                            <div className={signup.icon}></div>
                            <span>Continue with Google</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                }

                {/* Sign In Form */}
                { !showSignup &&
                  <div className={signup.sidebarDeviseForm}>
                    <h2 className="offcanvasHeading">Sign In</h2>
                    <p className="offcanvasDesc">Don’t have an account yet? <a href="javascript:void(0)" onClick={()=> handleShowSignUp(true)}>Sign Up</a></p>
                    <div className={pricing.formWrapper}>
                      <h3>Create Account</h3>
                      <Form className={pricing.sidebarForm} noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
                        <Row>
                          <Col>
                            <Form.Group className="mb-4">
                              <Form.Control required name="email" type="email" placeholder="Email" />
                              <Form.Control.Feedback type="invalid">
                                A valid email address is required!
                              </Form.Control.Feedback>
                            </Form.Group>

                          </Col>
                        </Row>
                        <Row className="halfGutters">
                          <Col>
                            <Form.Group className="mb-4">
                            <Form.Control required name="password" type="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">
                              Password is required!
                            </Form.Control.Feedback>
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
                        <a href="javascript:void(0)" className={signup.google+' '+signup.signupBtn } onClick={handleGmailLogin}>
                          <div>
                            <div className={signup.icon}></div>
                            <span>Continue with Google</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                }

              </>
          }

          {
            props.sidebarType == "cart" &&

              <>
                <div className={pricing.sideBarPlansWrapper+' '+pricing.pricingWrapper}>
                  <h2 className="offcanvasHeading">License track</h2>
                  <div className={pricing.plansContent}>
                    {/* Breadcrumb Code */}
                    {
                      (planType == "Commercial" && webRights !== "Expanded Rights" && (employeeNo !== "Over 50 Employees" && subscriptionType == "")) &&
                      <div className="themeBreadcrumb inPricingWay">
                        <Breadcrumb>
                          <Breadcrumb.Item href="#" active={planType == "Commercial" && webRights == "" ? true : false} onClick={() => handlePlan(planType)}>{planType}</Breadcrumb.Item>
                          {webRights && <Breadcrumb.Item href="#" active={planType == "Commercial" && webRights !== "" && employeeNo == "" ? true : false} onClick={() => handleWebOrRights(webRights)}>{webRights}</Breadcrumb.Item>}
                          {employeeNo && <Breadcrumb.Item active={planType == "Commercial" && webRights !== "" && employeeNo !== "" ? true : false}>{employeeNo}</Breadcrumb.Item>}
                        </Breadcrumb>
                      </div>
                    }

                    {/* Plan types Code */}
                    {planType !== "Personal" && employeeNo == "" &&
                      <div className={pricing.planTypes}>
                        <div className={pricing.pricingLeftSec}>
                        {
                          planType == "" ?
                          <p>What type of content are you creating?</p> :
                          planType != "Personal" && employeeNo == "" && webRights == "Web Only" ?
                          <p>What type of content are you creating?</p> :
                          planType != "Personal" && employeeNo == "" && webRights == "" ?
                          <p>What type of content are you creating?</p> :
                          ""
                        }
                        </div>

                        <div className={pricing.pricingRightSec}>
                          <ul className={pricing.plansList}>
                          {
                            step == 0 && planType == "" &&
                              <>
                              <li className={pricing.plansItem} onClick={() => handlePlan("Personal")}>
                                <a href="javascript:void(0)">
                                  <span className={pricing.typeName}>
                                    <span className={pricing.typeHeading}>Personal</span>
                                    <span className={pricing.typeDesc}>Personal website, social media, student work</span>
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
                              <li className={pricing.plansItem} onClick={() => handlePlan("Commercial")}>
                                <a href="javascript:void(0)">
                                  <span className={pricing.typeName}>
                                    <span className={pricing.typeHeading}>Commercial</span>
                                    <span className={pricing.typeDesc}>Work that can be used by a business or a client</span>
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
                              </>
                          }
                          {
                            planType == "Commercial" && webRights == "" &&
                              <>
                              <li className={pricing.plansItem} onClick={() => handleWebOrRights("Web Only")}>
                                <a href="javascript:void(0)">
                                  <span className={pricing.typeName}>
                                    <span className={pricing.typeHeading}>Web Only</span>
                                    <span className={pricing.typeDesc}>Website, social media, web ads</span>
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
                              <li className={pricing.plansItem} onClick={() => handleWebOrRights("Expanded Rights")}>
                                <a href="javascript:void(0)">
                                  <span className={pricing.typeName}>
                                    <span className={pricing.typeHeading}>Expanded Rights</span>
                                    <span className={pricing.typeDesc}>Film, TV, VOD, Games, Apps</span>
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
                              </>
                          }
                          {
                            planType == "Commercial" && webRights == "Web Only" && employeeNo == "" &&
                              <>
                              <li className={pricing.plansItem} onClick={() => handleEmplyeeNo("Under 50 Employees")}>
                                <a href="javascript:void(0)">
                                  <span className={pricing.typeName}>
                                    <span className={pricing.typeHeading}>Under 50 Employees</span>
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
                              <li className={pricing.plansItem} onClick={() => handleEmplyeeNo("Over 50 Employees")}>
                                <a href="javascript:void(0)">
                                  <span className={pricing.typeName}>
                                    <span className={pricing.typeHeading}>Over 50 Employees</span>
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
                              </>
                          }
                          </ul>
                        </div>
                      </div>
                    }
                    {/******************* Choose Plan *****************/}
                    { planType == "Personal" && subscriptionType == ""  &&
                      <div className={pricing.sidebarChoosePlans}>
                        <h4>Purchase Options</h4>
                        <div className={pricing.choosePlans}>
                          <div className={pricing.pricingLeftSec}>
                            <div className={pricing.plansFeatures}>
                              <div className={pricing.featureInclude}>
                                <h4>What it’s good for:</h4>
                                <ul>
                                  <li>Web streaming on social media (YouTube, Vimeo, Instagram etc)</li>
                                  <li>YouTube monetization for your personal account</li>
                                  <li>Personal video projects, school projects</li>
                                </ul>
                              </div>
                              <div className={pricing.featureNotInclude}>
                                <h4>What it’s not for:</h4>
                                <ul>
                                  <li>Promoting a product service or brand</li>
                                  <li>Videos created for a business or a client’s business</li>
                                  <li>Digital ads</li>
                                  <li>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</li>
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
                                  <input id="toggle-on" className="toggle toggleLeft" name="toggle" value="false" type="radio" checked={personalMonthlyAnnual == "Annually" ? true : false} onClick={()=> handlePersonalMonthlyAnnual("Annually")}/>
                                  <label htmlFor="toggle-on" className="movingBtn">Annually</label>
                                  <input id="toggle-off" className="toggle toggleRight" name="toggle" value="true" type="radio" checked={personalMonthlyAnnual == "Annually" ? false : true} onClick={()=> handlePersonalMonthlyAnnual("Monthly")}/>
                                  <label htmlFor="toggle-off" className="movingBtn">Monthly</label>
                                </div>
                                <em>Save 33% with an annual plan</em>
                              </div>
                              <div className={pricing.planSelect}>
                                <p className={pricing.selectText}>Select:</p>
                                <div className={pricing.planIndividual} onClick={() => handleSubscriptionType("Music Only")}>
                                  <div className={pricing.planType}>
                                    <span>Select Plan</span>
                                    <p className={pricing.planName}>Music Only</p>
                                  </div>
                                  <div className={pricing.planPriceDuration}>
                                    <span className={pricing.planAmount}>${personalMonthlyAnnual == "Annually" ? 10 : 15}</span>
                                    <span className={pricing.planDuration}>{personalMonthlyAnnual == "Annually" ? "/Year" : "/Month"}<sup>*</sup></span>
                                  </div>
                                </div>

                                <div className={pricing.planIndividual} onClick={() => handleSubscriptionType("Music + SFX")}>
                                  <div className={pricing.planType}>
                                    <span>Select Plan</span>
                                    <p className={pricing.planName}>Music + SFX</p>
                                  </div>
                                  <div className={pricing.planPriceDuration}>
                                    <span className={pricing.planAmount}>${personalMonthlyAnnual == "Annually" ? 16.58 : 25}</span>
                                    <span className={pricing.planDuration}>{personalMonthlyAnnual == "Annually" ? "/Year" : "/Month"}<sup>*</sup></span>
                                  </div>
                                </div>

                                {personalMonthlyAnnual == "Annually" && <small className={pricing.billingNote}>*Monthly rates when billed annually</small>}
                              </div>
                            </div>
                            <div className={pricing.oneTimePurchase} onClick={props.addTrackToCartLicenseModalSidebar}>
                              <span className={pricing.typeName}>
                                <span className={pricing.typeHeading}>Single Track</span>
                                <span className={pricing.typeDesc}>One-time use pricing available at checkout</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 text-center">
                          <Button variant="link" className="btn btnMainLarge" type="submit">
                            <span>Add to Cart</span>
                          </Button>
                        </div>
                      </div>

                    }

                    { (planType == "Commercial" && employeeNo == "Under 50 Employees" && subscriptionType =="") &&
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
                                <input id="toggle-on" className="toggle toggleLeft" name="toggle" value="false" type="radio" checked={commercialMonthlyAnnual == "Annually" ? true : false} onClick={() => handleCommercialMonthlyAnnual("Annually")}/>
                                  <label htmlFor="toggle-on" className="movingBtn">Annually</label>
                                <input id="toggle-off" className="toggle toggleRight" name="toggle" value="true" type="radio" checked={commercialMonthlyAnnual == "Annually" ? false : true} onClick={() => handleCommercialMonthlyAnnual("Monthly")}/>
                                  <label htmlFor="toggle-off" className="movingBtn">Monthly</label>
                                </div>
                                <em>Save 44% with an annual plan</em>
                              </div>
                              <div className={pricing.planSelect}>
                                <p className={pricing.selectText}>Select:</p>
                                <div className={pricing.planIndividual} onClick={() => handleSubscriptionType("Music Only")}>
                                  <div className={pricing.planType}>
                                    <span>Select Plan</span>
                                    <p className={pricing.planName}>Music Only</p>
                                  </div>
                                  <div className={pricing.planPriceDuration}>
                                    <span className={pricing.planAmount}>${commercialMonthlyAnnual == "Annually" ? 33.25 : 59}</span>
                                    <span className={pricing.planDuration}>{commercialMonthlyAnnual == "Annually" ? "/Year" : "/Month"}<sup>*</sup></span>
                                  </div>
                                </div>
																<small><strong>{commercialMonthlyAnnual == "Annually" ? "$399 / Year" : ""}</strong></small>

                                <div className={pricing.planIndividual} onClick={() => handleSubscriptionType("Music + SFX")}>
                                  <div className={pricing.planType}>
                                    <span>Select Plan</span>
                                    <p className={pricing.planName}>Music + SFX</p>
                                  </div>
                                  <div className={pricing.planPriceDuration}>
                                    <span className={pricing.planAmount}>${commercialMonthlyAnnual == "Annually" ? 45.75 : 72}</span>
                                    <span className={pricing.planDuration}>{commercialMonthlyAnnual == "Annually" ? "/Year" : "/Month"}<sup>*</sup></span>
                                  </div>
                                </div>
																<small><strong>{commercialMonthlyAnnual == "Annually" ? "$549 / Year" : ""}</strong></small>
																<br/>
                                {commercialMonthlyAnnual == "Annually" && <small className={pricing.billingNote}>*Monthly rates when billed annually</small>}
                              </div>
                            </div>
                            <div className={pricing.oneTimePurchase} onClick={props.addTrackToCartLicenseModalSidebar}>
                              <span className={pricing.typeName}>
                                <span className={pricing.typeHeading}>Single Track</span>
                                <span className={pricing.typeDesc}>One-time use pricing available at checkout</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 text-center">
                          <Button variant="link" className="btn btnMainLarge" type="submit">
                            <span>Add to Cart</span>
                          </Button>
                        </div>
                      </div>
                    }

                  </div>
                </div>
              </>
          }


        </div>
      </div>

    </div>
  );
}

export default Sidebar;
