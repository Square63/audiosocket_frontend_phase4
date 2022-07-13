import { Button, Carousel, FormGroup, FormControl, Row, Col, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Image from 'next/image';
import Rob from '../images/Rob.jpg';
import JJ from '../images/JJ.jpg';
import Scott from '../images/Scott.png';
import Joel from '../images/Joel.png';
import Peter from '../images/Peter.jpg';
import Kent from '../images/Kent.jpg';
import Brenda from '../images/Brenda.jpg';
import Zach from '../images/Zach.png';
import Select from "react-select";
import Link from "next/link";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import amazon from '../images/amazon.svg';
import disnep from '../images/Disnep.svg';
import hbo from '../images/HBO.svg';
import mailchimp from '../images/mailchimp.svg';
import nbc from '../images/NBC.svg';
import netflix from '../images/netflix.svg';
import vice from '../images/vice.svg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import pricing from "../styles/Pricing.module.scss";
import {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionPlans } from "../redux/actions/authActions";
import PricingPlan from '../components/PricingPlan';
import { TOAST_OPTIONS } from '../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

function SelectPricingPlan(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const subscriptionPlans = useSelector(state => state.user.subscriptionPlans);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    dispatch(getSubscriptionPlans())
  }, []);

  useEffect(() => {
    if (subscriptionPlans) {
      setIsLoading(false)
    }
  }, [subscriptionPlans])

  const USE_TYPES = [
    {label: 'Large Business', value: 'Large Business'},
    {label: 'Schools', value: 'Schools'},
    {label: 'Churche', value: 'Churche'},
    {label: 'Non-profit', value: 'Non-profit'},
    {label: 'TV or Digital Media Network', value: 'TV or Digital Media Network'},
    {label: 'Film Production Company', value: 'Film Production Company'},
    {label: 'Other', value: 'Other'}
  ]

  const [step, setStep] = useState(0);
  const [planType, setPlanType] = useState("");
  const [newPlan, setNewPlan] = useState("");
  const [webRights, setWebRights] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [personalMonthlyAnnual, setPersonalMonthlyAnnual] = useState("Annually");
  const [commercialMonthlyAnnual, setCommercialMonthlyAnnual] = useState("Annually");
  const [plan, setPlan] = useState(null);
  const [validated, setValidated] = useState(false);
  const form = useRef(null);
  const [typeOfUseError, setTypeOfUseError] = useState(false);
  const [paypal, setPaypal] = useState(false);

  useEffect(() => {
    if (router.query.personal) {
      setPlanType("Personal")
    }
    else if (router.query.commercial) {
      setPlanType("Commercial")
      setWebRights("Web Only")
      setEmployeeNo("Under 50 Employees")
    }
    else if (router.query.enterprise) {
      setPlanType("Enterprise")
      setWebRights("Expanded Rights")
      setEmployeeNo("Over 50 Employees")
    }
  }, [step]);

  useEffect(() => {
    if (newPlan == "Personal") {
      setPlanType("Personal")
    }
    else if (newPlan == "Commercial") {
      setPlanType("Commercial")
      setWebRights("Web Only")
      setEmployeeNo("Under 50 Employees")
    }
    else if (newPlan == "Enterprise") {
      setPlanType("Enterprise")
      setWebRights("Expanded Rights")
      setEmployeeNo("Over 50 Employees")
    }
  }, [newPlan]);

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
    if (localStorage.getItem("user")){
      setSubscriptionType(type)
      if (planType == "Personal" && personalMonthlyAnnual == "Monthly" && type == "Music Only") {
        setPlan(subscriptionPlans[9])
      }
      else if (planType == "Personal" && personalMonthlyAnnual == "Annually" && type == "Music Only") {
        setPlan(subscriptionPlans[7])
      }
      else if (planType == "Personal" && personalMonthlyAnnual == "Monthly" && type == "Music + SFX") {
        setPlan(subscriptionPlans[8])
      }
      else if (planType == "Personal" && personalMonthlyAnnual == "Annually" && type == "Music + SFX") {
        setPlan(subscriptionPlans[6])
      }
      else if (planType == "Commercial" && commercialMonthlyAnnual == "Monthly" && type == "Music Only") {
        setPlan(subscriptionPlans[11])
      }
      else if (planType == "Commercial" && commercialMonthlyAnnual == "Annually" && type == "Music Only") {
        setPlan(subscriptionPlans[14])
      }
      else if (planType == "Commercial" && commercialMonthlyAnnual == "Monthly" && type == "Music + SFX") {
        setPlan(subscriptionPlans[12])
      }
      else if (planType == "Commercial" && commercialMonthlyAnnual == "Annually" && type == "Music + SFX") {
        setPlan(subscriptionPlans[13])
      }
      setStep(1)
    } else {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    }

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
    const quoteForm = e.currentTarget;
    const data = new FormData(form.current);
    if (data.get("type_of_use") == "")
      setTypeOfUseError(true)
    setValidated(true)
  }

  const handleChange = async (e) => {
    setTypeOfUseError(false)
  }

  const handleBackToPage = (type) => {
    setEmployeeNo(type)
    setSubscriptionType("")
    setStep(0);
    setPlanType("");
    setWebRights("");
    setPersonalMonthlyAnnual("Monthly");
    setCommercialMonthlyAnnual("Monthly");
    setPlan(null);
  }

  const handleSetStep = (type) => {
    setNewPlan(type);
  }

  useEffect(() => {
    if (props.data !== undefined) {
      if (subscriptionType != "") {
        props.data(3);
      } else {
        props.data(2);
      }
    }
  }, [subscriptionType]);

  return (
    <div className={pricing.pricingWrapper+' pricingwrapperGlobal'}>
      <div className={pricing.priceContentContainer+' pricingContentGlobal'}>
        <ToastContainer
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
        />
        {/* Section Heading Code */}
        <div className={pricing.contentHeading}>
          <h1>Standout in a sea of content with remarkable music!</h1>
          <p>Get unlimited music licensing with access to +80,000 songs and over 24,000 sound effects/sound design.</p>
          {planType &&
            <a href="javascript:void(0)" className="backToHeaven backToSelectPlan">
              <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
                <g id="icon-arrow-down" transform="translate(15.414 1.414) rotate(90)">
                  <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </g>
              </svg>
              <span onClick={() => {handleBackToPage("Under 50 Employees")}}>{"Back to Select Plan"}</span>
            </a>
          }
        </div>

        {/* Breadcrumb Code */}
        {
          (planType == "Commercial" && webRights !== "Expanded Rights" && (employeeNo !== "Over 50 Employees" && subscriptionType == "")) &&
          <div className="themeBreadcrumb inPricingWay">
            <Breadcrumb>
              <Breadcrumb.Item href="#" className={planType == "Commercial" && webRights == "" ? "active" : ""} onClick={() => handlePlan(planType)}>{planType}</Breadcrumb.Item>
              {webRights && <Breadcrumb.Item href="#" className={planType == "Commercial" && webRights !== "" && employeeNo == "" ? "active" : ""} onClick={() => handleWebOrRights(webRights)}>{webRights}</Breadcrumb.Item>}
              {employeeNo && <Breadcrumb.Item className={planType == "Commercial" && webRights !== "" && employeeNo !== "" ? "active" : ""}>{employeeNo}</Breadcrumb.Item>}
            </Breadcrumb>
          </div>
        }
        {/* Plan types Code */}

        <div className={pricing.planTypes} >
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


        {/* Enterprises Code */}
        { (employeeNo == "Over 50 Employees" || webRights == "Expanded Rights") &&
            <div className={pricing.enterprisePricing}>
              <div className={pricing.pricingLeftSec}>
                <div className={pricing.headingWithIcon}>
                  <span className={pricing.headingIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="31.274" height="28.142" viewBox="0 0 31.274 28.142">
                      <g id="Group_33" data-name="Group 33" transform="translate(1.319 1)">
                        <g id="business-deal-cash-1" transform="translate(0)">
                          <path id="Shape_203" data-name="Shape 203" d="M413.9,333.9s-2.461-1.087-4.181-1.724c-1.128-.419-.967-2.322-.314-3.038a5.217,5.217,0,0,0,1.534-4.3,3.751,3.751,0,1,0-7.477,0,5.217,5.217,0,0,0,1.534,4.3c.653.716.814,2.619-.314,3.038-1.72.637-4.181,1.724-4.181,1.724" transform="translate(-400.5 -308.078)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_204" data-name="Shape 204" d="M425.9,333.9s-2.461-1.087-4.181-1.724c-1.128-.419-.967-2.322-.314-3.038a5.217,5.217,0,0,0,1.534-4.3,3.747,3.747,0,1,0-7.477,0,5.217,5.217,0,0,0,1.534,4.3c.653.716.814,2.619-.314,3.038-1.72.637-4.181,1.724-4.181,1.724" transform="translate(-397.263 -308.079)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_205" data-name="Shape 205" d="M414.933,308.562h4.158a1.04,1.04,0,0,1,1.039,1.039v7.276a1.04,1.04,0,0,1-1.039,1.039h-4.158l-3.118,3.118v-3.118h-7.276a1.04,1.04,0,0,1-1.039-1.039V309.6a1.04,1.04,0,0,1,1.039-1.039H408.7" transform="translate(-397.717 -308.562)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_206" data-name="Shape 206" d="M411.5,314.563V315.6" transform="translate(-397.402 -308.326)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_207" data-name="Shape 207" d="M411.5,309.563V310.6" transform="translate(-397.402 -308.523)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_208" data-name="Shape 208" d="M409.5,314.72h3.118a1.039,1.039,0,0,0,0-2.079h-2.079a1.039,1.039,0,0,1,0-2.079h3.118" transform="translate(-397.481 -308.483)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <h3>Enterprise Plan</h3>
                </div>
                <div className={pricing.enterpriseContent}>
                  <p className="mb-4">Need a plan for a large business (more than 50 employees), a team account or for *TV, Film, Radio or VOD rights*? Let us customize a plan just for you!</p>
                  <p className="mb-4">Our music is available to license for <strong>ALL MEDIA</strong>.</p>
                  <p className="mb-4">Whatever you’re creating, we’ve got you covered. Just ask!.</p>
                  <p className="mb-4">Please request a custom quote and one of our reps will be in touch ASAP.</p>
                </div>
              </div>
              <div className={pricing.pricingRightSec}>
                <h3>Request Custom Quote</h3>
                <Form noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control required type="text" placeholder="Enter Name *" />
                    <Form.Control.Feedback type="invalid">
                      Name is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control required type="email" placeholder="Email *" />
                    <Form.Control.Feedback type="invalid">
                      Email address is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control required type="number" placeholder="Phone Number *" />
                    <Form.Control.Feedback type="invalid">
                      Phone Number is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Select
                      className='react-select-container'
                      classNamePrefix="react-select"
                      placeholder="Type of Use *"
                      name="type_of_use"
                      options={USE_TYPES}
                      onChange={handleChange}
                    />
                    {typeOfUseError &&
                      <small className="input-error">Type of use is required!</small>
                    }
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control required type="text" placeholder="End Client *" />
                    <Form.Control.Feedback type="invalid">
                      End client is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Control as="textarea" placeholder="Additional Information" rows={5} />
                  </Form.Group>
                  <Form.Group className="mb-4 text-center">
                    <Button variant="link" className="btn btnMainLarge" type="submit">
                      <span>Request Quote</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
                        <g id="icon-arrow-down" transform="translate(1 11.914) rotate(-90)">
                          <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                      </svg>
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
        }

        {/* Billing and Payment Code */}
        { subscriptionType != "" &&
          <div className={pricing.billingPaymentSec}>
            <div className={pricing.planBio}>
              <div className={pricing.headingWithIcon}>
                  <span className={pricing.headingIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="31.274" height="28.142" viewBox="0 0 31.274 28.142">
                      <g id="Group_33" data-name="Group 33" transform="translate(1.319 1)">
                        <g id="business-deal-cash-1" transform="translate(0)">
                          <path id="Shape_203" data-name="Shape 203" d="M413.9,333.9s-2.461-1.087-4.181-1.724c-1.128-.419-.967-2.322-.314-3.038a5.217,5.217,0,0,0,1.534-4.3,3.751,3.751,0,1,0-7.477,0,5.217,5.217,0,0,0,1.534,4.3c.653.716.814,2.619-.314,3.038-1.72.637-4.181,1.724-4.181,1.724" transform="translate(-400.5 -308.078)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_204" data-name="Shape 204" d="M425.9,333.9s-2.461-1.087-4.181-1.724c-1.128-.419-.967-2.322-.314-3.038a5.217,5.217,0,0,0,1.534-4.3,3.747,3.747,0,1,0-7.477,0,5.217,5.217,0,0,0,1.534,4.3c.653.716.814,2.619-.314,3.038-1.72.637-4.181,1.724-4.181,1.724" transform="translate(-397.263 -308.079)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_205" data-name="Shape 205" d="M414.933,308.562h4.158a1.04,1.04,0,0,1,1.039,1.039v7.276a1.04,1.04,0,0,1-1.039,1.039h-4.158l-3.118,3.118v-3.118h-7.276a1.04,1.04,0,0,1-1.039-1.039V309.6a1.04,1.04,0,0,1,1.039-1.039H408.7" transform="translate(-397.717 -308.562)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_206" data-name="Shape 206" d="M411.5,314.563V315.6" transform="translate(-397.402 -308.326)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_207" data-name="Shape 207" d="M411.5,309.563V310.6" transform="translate(-397.402 -308.523)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                          <path id="Shape_208" data-name="Shape 208" d="M409.5,314.72h3.118a1.039,1.039,0,0,0,0-2.079h-2.079a1.039,1.039,0,0,1,0-2.079h3.118" transform="translate(-397.481 -308.483)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        </g>
                      </g>
                    </svg>
                  </span>
                  <h3>{planType} Plan</h3>
              </div>

              <div className={pricing.planInfo}>
                <div className={pricing.planTypeDuration}>
                  {planType == "Personal" ?
                    <><strong className={pricing.planType}>{subscriptionType}</strong><strong className={pricing.seprater}>|</strong><span className={pricing.planDuration}>{personalMonthlyAnnual == "Annually" ? "Yearly Subscription": "Monthly Subscription"}</span></> :
                    <><strong className={pricing.planType}>{subscriptionType}</strong><strong className={pricing.seprater}>|</strong><span className={pricing.planDuration}>{commercialMonthlyAnnual == "Annually" ? "Yearly Subscription": "Monthly Subscription"}</span></>
                  }
                </div>
                <hr/ >
                <div className={pricing.planDatePrice}>
                  <strong className={pricing.planDate}>Due Today</strong>
                  <strong className={pricing.planPrice}>${plan.price}</strong>
                </div>
              </div>
              <a href="javascript:void(0)" onClick={()=> handleCommercialBack("Under 50 Employees")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16.611" height="17.653" viewBox="0 0 16.611 17.653">
                  <g id="Group_55" data-name="Group 55" transform="translate(-0.25 -0.097)">
                    <path id="Path_70" data-name="Path 70" d="M11.467,1.519,1.333,12.544,1,17l4.456-.334L15.592,5.643a1.773,1.773,0,0,0,0-2.507L14.476,2.021l-.5-.5A1.772,1.772,0,0,0,11.467,1.519Z" transform="translate(0 0)" fill="none" stroke="#979da2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <line id="Line_67" data-name="Line 67" x1="4.117" y1="4.137" transform="translate(10.521 2.473)" fill="none" stroke="#979da2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                    <line id="Line_68" data-name="Line 68" x1="4.124" y1="4.124" transform="translate(1.542 12.331)" fill="none" stroke="#979da2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                  </g>
                </svg>
              </a>
            </div>
            <div className={pricing.planBillingPayment}>
              <div className={pricing.pricingLeftSec+' '+pricing.planBilling}>
                <h3 className="mb-4">Billing Information</h3>
                <Form>
                  <Row className="halfGutters">
                    <Col sm={6} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" />
                      </Form.Group>
                    </Col>

                    <Col sm={6} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Last Name *</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="halfGutters">
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="halfGutters">
                    <Col>
                      <Form.Group className="mb-4">
                        <Form.Label>Billing Address *</Form.Label>
                        <Form.Control type="text" placeholder="Billing Address" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="halfGutters">
                    <Col sm={6} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>City *</Form.Label>
                        <Form.Control type="text" placeholder="City" />
                      </Form.Group>
                    </Col>

                    <Col sm={6} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>State/Region *</Form.Label>
                        <Form.Control type="text" placeholder="State/Region" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="halfGutters">
                    <Col sm={6} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>ZIP/Postal Code *</Form.Label>
                        <Form.Control type="text" placeholder="ZIP Code" />
                      </Form.Group>
                    </Col>

                    <Col sm={6} xs={12}>
                      <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Country *</Form.Label>
                        <Select
                          className='react-select-container'
                          classNamePrefix="react-select"
                          placeholder="Country"
                          options={props.countries}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Text className="text-muted themeTextMuted mt-3">* Denotes required field</Form.Text>
                </Form>
              </div>
              <div className={pricing.pricingRightSec+' '+pricing.planPayment}>
                <h3 className="mb-4">Set Up Payment</h3>
                <div className={pricing.paymentBtnWrapper}>
                  <a href="javascript:void(0)" className={`${pricing.creditCardBtn} btn btnMainOutline ${!paypal ? "activate" : ""}`} onClick={() => setPaypal(false)}>Credit Card</a>
                  <a href="javascript:void(0)" className={`${pricing.payPalBtn} btn btnMainOutline ${paypal ? "activate" : ""}`} onClick={() => setPaypal(true)}>
                    <svg id="paypal-logo-vector" xmlns="http://www.w3.org/2000/svg" width="94.62" height="24" viewBox="0 0 94.62 24">
                      <g id="Group_52" data-name="Group 52">
                        <path id="Path_60" data-name="Path 60" d="M30.473-88.961c-1.111-1.267-3.12-1.81-5.69-1.81H17.324a1.068,1.068,0,0,0-1.056.9l-3.1,19.7a.64.64,0,0,0,.146.516.64.64,0,0,0,.487.224h4.6l1.156-7.335-.036.23a1.065,1.065,0,0,1,1.051-.9h2.188c4.3,0,7.664-1.746,8.647-6.8q.044-.224.076-.437a4.77,4.77,0,0,0-1.012-4.288" transform="translate(-13.156 90.771)" fill="#003087"/>
                        <path id="Path_61" data-name="Path 61" d="M225.5-66.052c-.281,1.848-1.693,1.848-3.058,1.848h-.777l.545-3.451a.429.429,0,0,1,.424-.362h.357c.929,0,1.807,0,2.26.529a1.721,1.721,0,0,1,.25,1.435m-.594-4.822h-5.149a.717.717,0,0,0-.708.6l-2.081,13.2a.43.43,0,0,0,.1.345.43.43,0,0,0,.326.151h2.642a.5.5,0,0,0,.495-.422l.591-3.744a.716.716,0,0,1,.706-.6h1.629c3.392,0,5.349-1.64,5.861-4.894a3.965,3.965,0,0,0-.657-3.323,4.776,4.776,0,0,0-3.753-1.316" transform="translate(-151.812 77.235)" fill="#009cde"/>
                        <path id="Path_62" data-name="Path 62" d="M110.613-66.052c-.281,1.848-1.693,1.848-3.058,1.848h-.777l.545-3.451a.429.429,0,0,1,.424-.362h.356c.929,0,1.807,0,2.26.529a1.718,1.718,0,0,1,.25,1.435m-.594-4.822H104.87a.716.716,0,0,0-.707.6l-2.081,13.2a.429.429,0,0,0,.1.346.429.429,0,0,0,.326.15h2.459a.716.716,0,0,0,.706-.6l.562-3.562a.715.715,0,0,1,.706-.6h1.629c3.392,0,5.349-1.641,5.861-4.895a3.965,3.965,0,0,0-.657-3.323,4.776,4.776,0,0,0-3.753-1.316m11.954,9.563a2.75,2.75,0,0,1-2.783,2.355,2.081,2.081,0,0,1-1.656-.666,2.093,2.093,0,0,1-.386-1.731,2.759,2.759,0,0,1,2.763-2.373,2.078,2.078,0,0,1,1.644.672,2.122,2.122,0,0,1,.418,1.743m3.436-4.8h-2.466a.43.43,0,0,0-.425.363l-.108.689-.173-.25a3.51,3.51,0,0,0-2.912-1.034,5.67,5.67,0,0,0-5.5,4.959,4.655,4.655,0,0,0,.918,3.789,3.858,3.858,0,0,0,3.1,1.253,4.721,4.721,0,0,0,3.414-1.41l-.11.685a.429.429,0,0,0,.1.346.429.429,0,0,0,.327.15h2.22a.716.716,0,0,0,.707-.6l1.333-8.44a.43.43,0,0,0-.1-.346.43.43,0,0,0-.327-.15" transform="translate(-73.651 77.235)" fill="#003087"/>
                        <path id="Path_63" data-name="Path 63" d="M261.7-51.668a2.75,2.75,0,0,1-2.783,2.355,2.081,2.081,0,0,1-1.656-.666,2.093,2.093,0,0,1-.386-1.731,2.758,2.758,0,0,1,2.763-2.373,2.078,2.078,0,0,1,1.644.672,2.122,2.122,0,0,1,.418,1.743m3.436-4.8h-2.466a.429.429,0,0,0-.425.363l-.108.689-.173-.25a3.51,3.51,0,0,0-2.912-1.034,5.671,5.671,0,0,0-5.5,4.959,4.655,4.655,0,0,0,.919,3.789,3.858,3.858,0,0,0,3.1,1.253,4.722,4.722,0,0,0,3.414-1.41l-.11.685a.428.428,0,0,0,.1.346.428.428,0,0,0,.326.15h2.219a.717.717,0,0,0,.708-.6l1.333-8.44a.429.429,0,0,0-.1-.346.43.43,0,0,0-.327-.15" transform="translate(-176.655 67.591)" fill="#009cde"/>
                        <path id="Path_64" data-name="Path 64" d="M191.7-55.974h-2.479a.713.713,0,0,0-.591.314l-3.419,5.035-1.449-4.838a.717.717,0,0,0-.686-.511h-2.436a.43.43,0,0,0-.349.18.43.43,0,0,0-.057.389l2.728,8.01-2.566,3.621a.43.43,0,0,0-.03.445.43.43,0,0,0,.381.232h2.476a.717.717,0,0,0,.588-.307l8.241-11.9a.429.429,0,0,0,.028-.443.429.429,0,0,0-.38-.23" transform="translate(-126.807 67.098)" fill="#003087"/>
                        <path id="Path_65" data-name="Path 65" d="M294.534-70.51,292.42-57.066a.429.429,0,0,0,.1.346.429.429,0,0,0,.326.15h2.125a.716.716,0,0,0,.707-.6l2.084-13.2a.429.429,0,0,0-.1-.346.429.429,0,0,0-.327-.15h-2.378a.428.428,0,0,0-.424.362" transform="translate(-203.145 77.234)" fill="#009cde"/>
                        <path id="Path_66" data-name="Path 66" d="M30.473-88.961c-1.111-1.267-3.12-1.81-5.69-1.81H17.324a1.068,1.068,0,0,0-1.056.9l-3.1,19.7a.64.64,0,0,0,.146.516.64.64,0,0,0,.487.224h4.6l1.156-7.335-.036.23a1.065,1.065,0,0,1,1.051-.9h2.188c4.3,0,7.664-1.746,8.647-6.8q.044-.224.076-.437a4.77,4.77,0,0,0-1.012-4.288" transform="translate(-13.156 90.771)" fill="#003087"/>
                        <path id="Path_67" data-name="Path 67" d="M20.8-84.646a.935.935,0,0,1,.922-.788h5.847a12.294,12.294,0,0,1,1.929.139,8.1,8.1,0,0,1,.956.214,5.282,5.282,0,0,1,1.03.41,4.767,4.767,0,0,0-1.011-4.289c-1.112-1.266-3.12-1.809-5.69-1.809H17.322a1.068,1.068,0,0,0-1.054.9l-3.106,19.7a.64.64,0,0,0,.145.516.64.64,0,0,0,.487.224H18.4l1.156-7.336Z" transform="translate(-13.154 90.769)" fill="#003087"/>
                        <path id="Path_68" data-name="Path 68" d="M41.953-71.7q-.034.219-.076.437c-.983,5.05-4.349,6.8-8.647,6.8H31.041a1.064,1.064,0,0,0-1.05.9l-1.121,7.1-.319,2.015a.56.56,0,0,0,.127.452.56.56,0,0,0,.426.2h3.882a.934.934,0,0,0,.922-.788l.038-.2.732-4.636.046-.256a.934.934,0,0,1,.923-.788h.581c3.76,0,6.7-1.527,7.565-5.946.358-1.846.173-3.388-.777-4.47a3.707,3.707,0,0,0-1.063-.82" transform="translate(-23.625 77.793)" fill="#009cde"/>
                        <path id="Path_69" data-name="Path 69" d="M44-73.73q-.225-.067-.464-.119c-.159-.035-.324-.066-.493-.093a12.057,12.057,0,0,0-1.929-.141H35.269a.932.932,0,0,0-.922.789L33.1-65.415l-.036.229a1.064,1.064,0,0,1,1.05-.9h2.189c4.3,0,7.664-1.746,8.647-6.8.029-.149.054-.294.076-.437a5.31,5.31,0,0,0-.809-.341c-.072-.024-.146-.046-.221-.069" transform="translate(-26.702 79.418)" fill="#012169"/>
                      </g>
                    </svg>
                  </a>
                </div>
                {<PricingPlan planId={plan.id} paypal={paypal}/>}
              </div>
            </div>
          </div>
        }


        {/** Plans Landing page **/}
        { planType == "Personal" && subscriptionType == ""  &&
          <div className={pricing.choosePlans}>
            <div className={pricing.pricingLeftSec}>
              <div className={pricing.headingWithIcon}>
                <span className={pricing.headingIcon+' '+pricing.personalPlanIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22.651" height="22.654" viewBox="0 0 22.651 22.654">
                  <g id="Group_2" data-name="Group 2" transform="translate(1 1)">
                    <path id="Path_4" data-name="Path 4" d="M726.184,386.175l-7.511,4.51v1.377a.691.691,0,0,0,.689.689h19.274a.691.691,0,0,0,.689-.689v-1.377h0l-7.511-4.506" transform="translate(-718.673 -372.097)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    <path id="Path_5" data-name="Path 5" d="M736.215,372.989a8.3,8.3,0,0,0,2.818-6.04v-4.018c-.406-2.282-3.16-4.02-5.63-4.02h0c-2.471,0-5.224,1.738-5.629,4.02v4.018a8.289,8.289,0,0,0,2.818,6.038" transform="translate(-723.075 -358.911)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                  </g>
                </svg>
                </span>
                <h3>Personal Plan</h3>
              </div>
              <p className={pricing.plansDesc}>The Personal Plan is perfect for you if you’re creating and publishing videos or podcasts on your personal web channels. This is a single user account.<br></br><br></br>
                A Personal License does not include sponsored media, work for hire or allow anyone else to use your work. If you are creating work for use by a business or client, please select Commercial Media.</p>
              <div className={pricing.plansFeatures}>
                <div className={pricing.featureInclude}>
                  <h4>What it&apos;s good for:</h4>
                  <ul>
                    <li>Web streaming on social media (YouTube, Vimeo, Instagram etc)</li>
                    <li>YouTube monetization for your personal account</li>
                    <li>Personal video projects, school projects</li>
                  </ul>
                </div>
                <div className={pricing.featureNotInclude}>
                  <h4>What it&apos;s not for:</h4>
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
                      <span className={pricing.planDuration}>/Month<sup>*</sup></span>
                    </div>
                  </div>
                  <small><strong>{personalMonthlyAnnual == "Annually" ? "$120 / Year" : ""}</strong></small>

                  <div className={pricing.planIndividual} onClick={() => handleSubscriptionType("Music + SFX")}>
                    <div className={pricing.planType}>
                      <span>Select Plan</span>
                      <p className={pricing.planName}>Music + SFX</p>
                    </div>
                    <div className={pricing.planPriceDuration}>
                      <span className={pricing.planAmount}>${personalMonthlyAnnual == "Annually" ? 16.58 : 25}</span>
                      <span className={pricing.planDuration}>/Month<sup>*</sup></span>
                    </div>
                  </div>
                  <small><strong>{personalMonthlyAnnual == "Annually" ? "$199 / Year" : ""}</strong></small>
                  <br></br>
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
        }

        { (planType == "Commercial" && employeeNo == "Under 50 Employees" && subscriptionType =="") &&
          <div className={pricing.choosePlans}>
            <div className={pricing.pricingLeftSec}>
              <div className={pricing.headingWithIcon}>
                <span className={pricing.headingIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="31.274" height="28.142" viewBox="0 0 31.274 28.142">
                    <g id="Group_33" data-name="Group 33" transform="translate(1.319 1)">
                      <g id="business-deal-cash-1" transform="translate(0)">
                        <path id="Shape_203" data-name="Shape 203" d="M413.9,333.9s-2.461-1.087-4.181-1.724c-1.128-.419-.967-2.322-.314-3.038a5.217,5.217,0,0,0,1.534-4.3,3.751,3.751,0,1,0-7.477,0,5.217,5.217,0,0,0,1.534,4.3c.653.716.814,2.619-.314,3.038-1.72.637-4.181,1.724-4.181,1.724" transform="translate(-400.5 -308.078)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_204" data-name="Shape 204" d="M425.9,333.9s-2.461-1.087-4.181-1.724c-1.128-.419-.967-2.322-.314-3.038a5.217,5.217,0,0,0,1.534-4.3,3.747,3.747,0,1,0-7.477,0,5.217,5.217,0,0,0,1.534,4.3c.653.716.814,2.619-.314,3.038-1.72.637-4.181,1.724-4.181,1.724" transform="translate(-397.263 -308.079)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_205" data-name="Shape 205" d="M414.933,308.562h4.158a1.04,1.04,0,0,1,1.039,1.039v7.276a1.04,1.04,0,0,1-1.039,1.039h-4.158l-3.118,3.118v-3.118h-7.276a1.04,1.04,0,0,1-1.039-1.039V309.6a1.04,1.04,0,0,1,1.039-1.039H408.7" transform="translate(-397.717 -308.562)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_206" data-name="Shape 206" d="M411.5,314.563V315.6" transform="translate(-397.402 -308.326)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_207" data-name="Shape 207" d="M411.5,309.563V310.6" transform="translate(-397.402 -308.523)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_208" data-name="Shape 208" d="M409.5,314.72h3.118a1.039,1.039,0,0,0,0-2.079h-2.079a1.039,1.039,0,0,1,0-2.079h3.118" transform="translate(-397.481 -308.483)" fill="none" stroke="#1a1c1d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      </g>
                    </g>
                  </svg>
                </span>
                <h3>Commercial Plan</h3>
              </div>
              <p className={pricing.plansDesc}>
                The Commercial Plan is perfect for small businesses and freelancers creating web content for themselves and their clients. This is a single user account.
                <br/>
                <br/>
                A Commercial Web License does not cover teams, online games, apps, VOD or Media Created for use by Enterprise Clients (over 50 employees). If you need any of these rights, please select Over 50 employees or Expanded Rights to speak with a representative.
              </p>
              <div className={pricing.plansFeatures}>
                <div className={pricing.featureInclude}>
                  <h4>What it&apos;s good for:</h4>
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
                  <h4>What it&apos;s not for:</h4>
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
                <div className="billingFrequency">
                  <span>Billing Frequency</span>
                  <div className="toggleButton">
                    <input id="toggle-on" className="toggle toggleLeft" name="toggle" value="false" type="radio" checked={commercialMonthlyAnnual == "Annually" ? true : false} onClick={()=> handleCommercialMonthlyAnnual("Annually")}/>
                    <label htmlFor="toggle-on" className="movingBtn">Annually</label>
                    <input id="toggle-off" className="toggle toggleRight" name="toggle" value="true" type="radio" checked={commercialMonthlyAnnual == "Annually" ? false : true} onClick={()=> handleCommercialMonthlyAnnual("Monthly")}/>
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
                      <span className={pricing.planDuration}>{commercialMonthlyAnnual == "Annually" ? "/Month" : "/Month"}<sup>*</sup></span>
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
                      <span className={pricing.planDuration}>{commercialMonthlyAnnual == "Annually" ? "/Month" : "/Month"}<sup>*</sup></span>
                    </div>
                  </div>
                  <small><strong>{commercialMonthlyAnnual == "Annually" ? "$549 / Year" : ""}</strong></small>
                  <br/>
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
        }
      </div>

      {/* Landing page 2 */}
      { ((planType == "Personal" && subscriptionType == "") || (planType == "Commercial" && employeeNo == "Under 50 Employees" && subscriptionType ==""))  &&
        <>
          <section className="campareWithCompetitor">
            <div className="blackSection">
              <div className="blackContent">
                <div className="blackHeading">
                  <h2>It’s not even close.</h2>
                </div>
                <div className="blackPara">
                  <p>Used by top creators in Film, TV &amp; Advertising, Audiosocket’s band &amp; composer roster is the largest &amp; most diverse in its class.</p>
                </div>
              </div>

            </div>
            <div className="greySection">
              <div className="greyInnerSec">
                <div className="comparisionRow">
                  <div className="columnLabel">
                    Provider
                  </div>
                  <div className="columnLabel destroyAfterTime">
                    Number of tracks in catalog
                  </div>
                </div>

                <div className="comparisionRow">
                  <div className="columnData provider">
                    Audiosocket
                  </div>
                  <div className="columnData trackCount">
                    <span className="AsBar">80,000+ Tracks</span>
                  </div>
                </div>

                <div className="comparisionRow">
                  <div className="columnData provider">
                    Epidemic Sound
                  </div>
                  <div className="columnData trackCount">
                    <span className="epidemicBar">&nbsp;</span>
                  </div>
                </div>

                <div className="comparisionRow">
                  <div className="columnData provider">
                    Artlist
                  </div>
                  <div className="columnData trackCount">
                    <span className="artlistBar">&nbsp;</span>
                  </div>
                </div>

                <div className="comparisionRow">
                  <div className="columnData provider">
                    Soundstripe
                  </div>
                  <div className="columnData trackCount">
                    <span className="soundstripeBar">&nbsp;</span>
                  </div>
                </div>
              </div>
              <div className="browseMusic">
                <Link href="/search">
                  <a className="btn btnMainXlarge">Browse Music</a>
                </Link>
              </div>
            </div>
          </section>

          <section className={pricing.brandStripWrapper}>
            <div className="fixed-container">
              <div className="brandsStrip">
                <Image src={amazon} alt="Amazon" className="heroBrand"/>
                <Image src={mailchimp} alt="Mailchimp" className="heroBrand mailChimp"/>
                <Image src={disnep} alt="Disnep" className="heroBrand"/>
                <Image src={hbo} alt="HBO" className="heroBrand"/>
                <Image src={netflix} alt="NETFLIX" className="heroBrand"/>
                <Image src={nbc} alt="NBC" className="heroBrand"/>
                <Image src={vice} alt="VICE" className="heroBrand"/>
              </div>
            </div>
          </section>
        {
          planType == "Personal" ?
            (<section className="testimonial">
              <div className="testimonialContainer">
                <Carousel>
                  <Carousel.Item interval={3000}>
                    <div className="authorImg">
                      <Image src={Rob} alt="Picture" className=""/>
                    </div>
                    <Carousel.Caption>
                      <p>“My preference is for moody ambient music and I find it in spades on Audiosocket.Their similarity search also solves a big issue in my workflow when I use temp tracks to match a creative vision but then am unable to license those specific temps. It’s been a great help for me to quickly find similar songs when these cases arise.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Rob Ellis</p>
                        <p><span>Cinematographer and YouTube Creator</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={JJ} alt="Picture" className=""/>
                    </div>
                    <Carousel.Caption>
                    <p>“Audiosocket is the leader in music licensing with a huge library of amazing assets that make it incredibly easy to find high-quality music for all of your projects.And with their find similar feature, it’s faster than ever before to find music for your project.Highly recommend!!”</p>
                      <div className="authorStatus">
                        <p className="authorName">JJ Englert</p>
                        <p><span>Jump Studios</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={Scott} alt="Picture" className=""/>
                    </div>
                    <Carousel.Caption>
                      <p>“Just wanted to let you know that…the interface and licensing platform are just awesome.Couldn’t be more intuitive and easy to use, and the stuff I’m finding is perfect for my needs.So this is just a note to say thanks for building and maintaining a platform that works great for people like me.I’m also grateful to y’all for suggesting very cool tracks.I’m sure I’ll be using more of them soon.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Scott Aiges</p>
                        <p><span>Bird Photographer and Videographer</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                </Carousel>
              </div>
            </section>) :
            planType == "Commercial" &&
            (<section className="testimonial">
              <div className="testimonialContainer">
                <Carousel>
                  <Carousel.Item interval={3000}>
                    <div className="authorImg">
                      <Image src={Joel} alt="Picture" className="" />
                    </div>
                    <Carousel.Caption>
                      <p>“I have been playing around with your new Similarity Search and am excited to put it to work for us.We have licensed individual songs from you in the past and have consistently been impressed with the music content we are able to find on your site.So far, I am impressed with the collection of music your AI supplies.I have a hard time believing I could find some of these tracks by using keywords only to try and match the sound I’m looking for.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Joel Land - Threefold Video Production Agency</p>
                        <p><span>Project Manager</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={Peter} alt="Picture" className="" />
                    </div>
                    <Carousel.Caption>
                      <p>“I’ve spent some time on Audiosocket’s website and am extremely impressed by the quality music that you provide.Having used several competitors, I definitely think that your offering is far superior.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Peter Larson</p>
                        <p><span>Ready Fire Digital</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={Kent} alt="Picture" className="" />
                    </div>
                    <Carousel.Caption>
                      <p>“Audiosocket has always been our secret weapon for the biggest variety of music genres.Audiosocket has styles of music we have never found anywhere else…your new search feature using YouTube as a reference is really working! …This is a big time saver, which you know I’m obsessed with.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Kent Rayhill - Ohana Films</p>
                        <p><span>Wedding Videographer</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={Brenda} alt="Picture" className="" />
                    </div>
                    <Carousel.Caption>
                      <p>“WOW you folks have AMAZING music and the search function is really wonderful.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Brenda Hipsher - Calbrite / MAC Group</p>
                        <p><span>VP Sales & Marketing / Brand Manager</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={Zach} alt="Picture" className="" />
                    </div>
                    <Carousel.Caption>
                      <p>“I thought similarity search seemed a little gimmicky, but it has seriously proved to be a time-saving asset for me on multiple edits so far. It’s kind of crazy how it works”</p>
                      <div className="authorStatus">
                        <p className="authorName">Zach Wentz. Threefold Video Production Agency.</p>
                        <p><span>Senior Editor</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                </Carousel>
              </div>
            </section>)
          }

          <section className="pricing">
            <div className="bgWave">
              <div className="pricingContainer">
                <h2>Priced to fit your needs.</h2>
                <div className="pricingPlans">
                  <div className="plan personal">
                    <h4 className="planHeading">personal</h4>
                    <div className="planPrice">
                      <p className="planPriceText">Plans starting at</p>
                      <p className="planPriceAmount"><span>$10</span>&nbsp;/Month</p>
                    </div>
                    <p className="planDescription">
                      Perfect if you’re creating and publishing videos or podcasts on your personal web channels. This is a single user account.
                    </p>
                    <div className="PlanBtnContainer">
                      <Link href="/pricing?personal=true">
                       <a onClick={() => handleSetStep("Personal")} className="btn btnMainLarge">Learn More</a>
                      </Link>
                    </div>
                  </div>

                  <div className="plan commercial">
                    <h4 className="planHeading">commercial</h4>
                    <div className="planPrice">
                      <p className="planPriceText">Plans starting at</p>
                      <p className="planPriceAmount"><span>$33</span>&nbsp;/Month</p>
                    </div>
                    <p className="planDescription">
                      Perfect for the freelancer or business with up to 50 employees creating web media for commercial purposes. This is a single user account.
                    </p>
                    <div className="PlanBtnContainer">
                      <Link href="/pricing?commercial=true">
                        <a onClick={() => handleSetStep("Commercial")} className="btn btnMainLarge">Learn More</a>
                      </Link>
                    </div>
                  </div>

                  <div className="plan enterprises">
                    <h4 className="planHeading">enterprises</h4>
                    <div className="planPrice">
                      <p className="planPriceText">Customized quote to meet your needs.</p>
                    </div>
                    <p className="planDescription">
                      Need a plan for a large business (more than 50 employees), a team account or for TV, Film, Radio or VOD rights? Let us customize a license or plan just for you!
                    </p>
                    <div className="PlanBtnContainer">
                      <Link href="/pricing?enterprise=true">
                        <a onClick={() => handleSetStep("Enterprise")} className="btn btnMainLarge">Request a custom quote</a>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <section className="singleLicenseOffer">
            <div className="fixed-container">
              <div className="licenseHeading">
                <h3>We also offer single-use licenses.</h3>
                <p>When browsing for tracks, click the Add To Cart button and select a single license from the pop-up.</p>
              </div>
              <div className="licenseTypeWrapper">
                <div className="licenseType">
                  <span className="licenseName">
                    Individual
                    <OverlayTrigger overlay={<Tooltip>For individual users creating media for their personal channels. Perfect for your YouTube videos, podcast, vlogs, and home videos that are self-published on 3rd party platforms. Monetization via Adsense/AdShare on 3rd party platforms is permitted.</Tooltip>}>
                      <a href="" className="info"></a>
                    </OverlayTrigger>
                  </span>
                  <p className="licenseAmount">$15</p>
                </div>
                <div className="licenseType">
                  <span className="licenseName">
                    Small Business
                    <OverlayTrigger overlay={<Tooltip>For use by businesses with 50 or fewer employees or freelancers creating content for businesses with 50 or fewer employees.</Tooltip>}>
                      <a href="" className="info"></a>
                    </OverlayTrigger>
                  </span>
                  <p className="licenseAmount">$99</p>
                </div>
                <div className="licenseType">
                  <span className="licenseName">
                    Indie Film
                    <OverlayTrigger overlay={<Tooltip>For use by individual videographers, or filmmakers in a single film or video with a budget less than $2 Million USD. Films may be distributed on the Web and submitted to film festivals. </Tooltip>}>
                      <a href="" className="info"></a>
                    </OverlayTrigger>
                  </span>
                  <p className="licenseAmount">$129</p>
                </div>
                <div className="licenseType">
                  <span className="licenseName">
                    Large Business
                    <OverlayTrigger overlay={<Tooltip>For use by businesses with 51 or more employees or freelancers creating content for businesses with 51 or more employees.</Tooltip>}>
                      <a href="" className="info"></a>
                    </OverlayTrigger>
                  </span>
                  <p className="licenseAmount">$995</p>
                </div>
                <div className="licenseType">
                  <span className="licenseName">
                    Custom License
                  </span>
                  <a href="/pricing?enterprise=true" className="contactSale">Contact Sales</a>
                </div>
              </div>
            </div>
          </section>

          <section className={pricing.faqSection}>
            <h3>FAQs</h3>
            <div className="pricingContainer">
              <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0" onClick={(e)=> handleCollapse(e)}>
                  What does an Audiosocket Subscription Include?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>When you purchase a subscription, you&apos;ve got unlimited access to our entire catalog of over +80,000 tracks and 24,000 SFX/Sound Designs that can be used to create something truly original! You can license as many tracks as you like during the Term of your Subscription. Each license issued is good for that specific Work in perpetuity.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1" onClick={(e)=> handleCollapse(e)}>
                  Can I pay monthly?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Yes! You can choose to be billed monthly or pay an up-front annual rate. When you pay for the year up-front, you get a HUGE discount!</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3" onClick={(e)=> handleCollapse(e)}>
                  Where can I preview the legal licenses?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <p>Review our website Terms and Conditions, our Privacy Policy and our licenses by clicking on one of the links below.</p>
                    <br/>
                    <Link href="/termsConditions" eventKey="1">
                      <p className="pointerCursor">Terms and conditions</p>
                    </Link>
                    <Link href="/privacyPolicy" eventKey="1">
                      <p className="pointerCursor">Privacy Policy</p>
                    </Link>
                    <br/>
                    <Link href="/individualLicense" eventKey="1">
                      <p className="pointerCursor">Individual License</p>
                    </Link>
                    <Link href="/indieFilm" eventKey="1">
                      <p className="pointerCursor">Indie Film License</p>
                    </Link>
                    <Link href="/smallBusiness" eventKey="1">
                      <p className="pointerCursor">Small Business License</p>
                    </Link>
                    <Link href="/largeBusiness" eventKey="1">
                      <p className="pointerCursor">Large Business License</p>
                    </Link>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="4" onClick={(e)=> handleCollapse(e)}>
                  Can I use any song from Audiosocket in my Subscription?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>Yes! When you sign-up, you&apos;ll be given access to everything in the Audiosocket catalog. That&apos;s over 80,000 tracks and 2000 Sound Designs. Lucky you! You&apos;re well on your way, discovering the perfect music for your media, all created by trending indie bands, artists and composers from over 200 genres.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="5" onClick={(e)=> handleCollapse(e)}>
                  What is Content ID on YouTube?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="5">
                  <Card.Body>YouTube created an automated content tracking system called Content ID (CID). CID scans videos and alerts copyright owners, such as musicians, when their music is used in videos on the YouTube Platform. If the owner of the music has registered with Content ID, you may receive a Claim. DO NOT WORRY! If you have the license, then you have legal permission to use the music in your videos. You can decide if you wish to disregard the Claim or dispute the Claim. If you are monetizing your videos on YouTube, then you will want to dispute the Claim. See &quot;How Do I Dispute a YouTube Claim&quot;.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="6" onClick={(e)=> handleCollapse(e)}>
                  How Do I Dispute a Content ID Claim on my YouTube Video?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="6">
                  <Card.Body>
                  <p>If you are NOT monetizing your video, you can chose to disregard the claim or you can dispute the claim. If you ARE monetizing your videos, you should dispute the claim. There is a simple process to do so.</p>
                  <br/>
                  <p>Please note, while the claim is being resolved, ads are still running and the revenue earned will be released to you as soon as the claim is released. We will work to make this happen as quickly as possible!</p>
                  <br/>
                  <p>YouTube has published <a href='https://support.google.com/youtube/answer/2797454?hl=en'>this VIDEO </a> to help as well as these simple instructions:</p>
                  <br/>
                  <p><strong>How to dispute a Content ID claim</strong></p>
                  <p>1. Sign in to your YouTube Studio.</p>
                  <p>2. From the left Menu, click Videos.</p>
                  <p>3. Filter for Copyright claims.</p>
                  <p>4. Hover over “Copyright claim” in the Restrictions column and click SEE DETAILS.</p>
                  <br/>
                  <p>When you are asked to explain your claim, please state &quot;This track was licensed through Audiosocket&quot;.</p>
                  <br/>
                  <p>Please submit our Claim FORM as well so we can assist with speedy resolution.</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="7" onClick={(e)=> handleCollapse(e)}>
                  Will I still earn all of the revenue from my videos if I receive a YouTube claim?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="7">
                  <Card.Body>Absolutely! You will still receive all of the revenue from the ads on your video. However, while the claim is being reviewed, the monies earned are held until the claim is resolved. Once the claim is released, the earnings are released to you. Please dispute the claim and then submit our FORM so we can assist you with getting the claim released quickly.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="8" onClick={(e)=> handleCollapse(e)}>
                  How often do you add new songs to your catalog?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="8">
                  <Card.Body>We add new songs every single week.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="9" onClick={(e)=> handleCollapse(e)}>
                  How long is my license good for?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="9">
                  <Card.Body>The licenses you generate during your Subscription are good forever!</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="10" onClick={(e)=> handleCollapse(e)}>
                  Can I use the same track in multiple projects?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="10">
                  <Card.Body>You can use the same track multiple times, BUT you will need a new license for each and every use of a track. Make sure to License Now in checkout for each unique production or you will not legally have the rights needed to use the media. A license is a legal document that is tied to your use through a Project Title.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="11" onClick={(e)=> handleCollapse(e)}>
                  Can I cancel my Subscription?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="11">
                  <Card.Body>For monthly subscriptions, you can cancel at any time. For prepaid annual subscriptions, you may cancel any time, however the effective date would be at the end of your paid term and no refunds are given if you cancel before the end of the term. Your prepaid subscription will automatically renew at the end of the year unless you cancel it with at least 30 days before the renewal date. You may cancel your Subscription at any time by managing your Subscription settings in your account.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="12" onClick={(e)=> handleCollapse(e)}>
                  What happens to my licenses if I cancel my Subscription?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="12">
                  <Card.Body>All of the licenses issued to you during your Subscription are perpetual. That means they&apos;re good forever!* However, you cannot create any new licenses from the songs you downloaded after your Subscription has expired. You must click the License Now button every time you use a track during your Subscription. *Please see our Terms of Service for more info on cancellation.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="13" onClick={(e)=> handleCollapse(e)}>
                  Is an Audiosocket Subscription right for me?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="13">
                  <Card.Body>If you are consistently creating visual works that need music, or if you&apos;re working on a production that requires a lot of music, a Subscription is right for you! The monthly price is close to that for a single track license and can be paid monthly so you can budget the spend over the course of a year. This makes the service affordable and flexible. Maybe you changed your mind 3 months after you licensed a track, no problem, just drop in a new track, your Subscription covers you!</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="14" onClick={(e)=> handleCollapse(e)}>
                  How does the Subscription work?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="14">
                  <Card.Body>Once you&apos;ve chosen and purchased the Subscription that works for you, you&apos;re ready to start licensing. Here&apos;s how it works: 1.) Once you&apos;ve found a track you wish to license, add the track to your cart 2.) Add your final work title to the Work Title field at checkout 3.) Click the Checkout button and your license will be saved in your account under the &quot;Licenses&quot; tab 4.) Please note, you must create a new license for each unique Work. This is a very important step that ensures you have the right to use the music in your project</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="15" onClick={(e)=> handleCollapse(e)}>
                  Why is the price for a single track almost the same as a Subscription?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="15">
                  <Card.Body>We believe in loyalty. If you use music from our artists consistently, they make more money over time than they would from a single-use one time license. We believe we have the best Subscription offering on the market, hands down! With over 80,000 high quality tracks across 200 genres from award winning bands, artists and composers, no other Subscription service comes close.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="16" onClick={(e)=> handleCollapse(e)}>
                  Is my Subscription good for TV?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="16">
                  <Card.Body>No, Subscription licenses are only good for web. If you&apos;re interested in television rights, please use the Custom request form.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="17" onClick={(e)=> handleCollapse(e)}>
                  What if I need broader rights than those covered in my Subscription?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="17">
                  <Card.Body>As a subscriber, you will receive 20% off of any custom license needed for broader rights. You simply contact our SUPPORT team and let them know that you need expanded rights.</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="18" onClick={(e)=> handleCollapse(e)}>
                  I licensed my music, so why did I get a Claim on YT?
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="18">
                  <Card.Body>Claims on YouTube is an indication that copyrighted music has been used in your video. If you have a license, you do not need to worry as you&apos;ve paid the copyright owner to use their work legally. And you will receive all of the revenues on your video as soon as the license has been verified. The reason Audiosocket music is sometimes claimed is because we represent a large and very diverse catalog of amazingly talented artists, whose work is published by many labels across the world. This simply means that there can be more than one administrator and we need to confirm that you have secured the license. We typically hear back within the day, sometimes immediately. We will let you know when the Claim has been released. Thank you for your patience and understanding that Artists, like you, use ContentID to protect their work on YT.</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            </div>
          </section>
        </>
      }

    </div>
  );
}

export default SelectPricingPlan;
