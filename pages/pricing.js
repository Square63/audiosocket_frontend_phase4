import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Select from "react-select";
import pricing from "../styles/Pricing.module.scss";
import {useContext, useEffect, useState, useRef} from "react";

function Pricing() {

  const [step, setStep] = useState(0);
  const [planType, setPlanType] = useState("");
  const [webRights, setWebRights] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");

  useEffect(() => {
    
  }, [step]);

  const handlePlan = (type) => {
    setPlanType(type)
    setStep(1)
  }

  const handleWebOrRights = (type) => {
    setWebRights(type)
    setStep(1)
  }

  const handleEmplyeeNo = (type) => {
    setEmployeeNo(type)
    setStep(1)
  }

  return (
    <div className="pricingWrapper">
      <div className={pricing.priceContentContainer}>

        {/* Section Heading Code */}
        <div className={pricing.contentHeading}>
          <h1>Standout in a sea of content with remarkable music!</h1>
          <p>Get unlimited music licensing with access to +80,000 songs and over 24,000 sound effects/sound design.</p>
        </div>

        {/* Breadcrumb Code */}
        {
          planType == "Commercial" && 
          <div className="themeBreadcrumb inPricingWay">
            <Breadcrumb>
              <Breadcrumb.Item href="#" className={planType == "Commercial" && webRights == "" ? "active" : ""}>{planType}</Breadcrumb.Item>
              {webRights && <Breadcrumb.Item href="#" className={planType == "Commercial" && webRights !== "" && employeeNo == "" ? "active" : ""}>{webRights}</Breadcrumb.Item>}
              {employeeNo && <Breadcrumb.Item className={planType == "Commercial" && webRights !== "" && employeeNo !== "" ? "active" : ""}>{employeeNo}</Breadcrumb.Item>}
            </Breadcrumb>
          </div>
        }
        {/* Plan types Code */}
        <div className={pricing.planTypes} >
          <div className={pricing.pricingLeftSec}>
            <p>What type of content are you creating?</p>
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
              planType == "Commercial" && webRights == "Web Only" &&
                <>
                <li className={pricing.plansItem} onClick={() => handleEmplyeeNo("Under 100 Emplyees")}>
                  <a href="javascript:void(0)">
                    <span className={pricing.typeName}>
                      <span className={pricing.typeHeading}>Under 100 Emplyees</span>
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
                <li className={pricing.plansItem} onClick={() => handleEmplyeeNo("Over 100 Emplyees")}>
                  <a href="javascript:void(0)">
                    <span className={pricing.typeName}>
                      <span className={pricing.typeHeading}>Over 100 Emplyees</span>
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
        {/* <div className={pricing.enterprisePricing}>
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
              <p className="mb-4">Need a plan for a large business (more than 100 employees), a team account or for *TV, Film, Radio or VOD rights*? Let us customize a plan just for you!</p>
              <p className="mb-4">Our music is available to license for <strong>ALL MEDIA</strong>.</p>
              <p className="mb-4">Whatever you’re creating, we’ve got you covered. Just ask!.</p>
              <p className="mb-4">Please request a custom quote and one of our reps will be in touch ASAP.</p>
            </div>
          </div>
          <div className={pricing.pricingRightSec}>
            <h3>Request Custom Quote</h3>
            <Form>
              <Form.Group className="mb-4">
                <Form.Control type="text" placeholder="Enter Name *" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control type="email" placeholder="Email *" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control type="text" placeholder="Phone Number" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Select
                  className='react-select-container'
                  classNamePrefix="react-select"
                  placeholder="Type of Use"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control type="text" placeholder="End Client" />
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
        </div> */}
  
      </div>
    </div>
  );
}

export default Pricing;