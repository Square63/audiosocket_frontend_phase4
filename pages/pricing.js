import { Form, Button, Carousel, FormGroup, FormControl, Row, Col, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Image from 'next/image';
import testimonialAvatar from '../images/avatar.png';
import Select from "react-select";
import Link from "next/link";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import pricing from "../styles/Pricing.module.scss";

function Pricing() {
  return (
    <div className="pricingWrapper">
      <div className={pricing.priceContentContainer}>

        {/* Section Heading Code */}
        <div className={pricing.contentHeading}>
          <h1>Standout in a sea of content with remarkable music!</h1>
          <p>Get unlimited music licensing with access to +80,000 songs and over 24,000 sound effects/sound design.</p>
        </div>

        {/* Breadcrumb Code */}
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
              <li className={pricing.plansItem}>
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
            </ul>
          </div>
        </div> */}

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

        {/* Billing and Payment Code */}
        {/* <div className={pricing.billingPaymentSec}>
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
                <h3>Commercial Plan</h3>
            </div>

            <div className={pricing.planInfo}>
              <div className={pricing.planTypeDuration}>
                <strong className={pricing.planType}>Music Only</strong><strong className={pricing.seprater}>|</strong><span className={pricing.planDuration}>Monthly Subscription</span>
              </div>
              <hr/ >
              <div className={pricing.planDatePrice}>
                <strong className={pricing.planDate}>Due Date</strong>
                <strong className={pricing.planPrice}>$59</strong>
              </div>
            </div>
            <a href="javascript:void(0)">
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
                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                  </Col>

                  <Col>
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
                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>City *</Form.Label>
                      <Form.Control type="text" placeholder="City" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label>State/Region *</Form.Label>
                      <Form.Control type="text" placeholder="State/Region" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>ZIP/Postal Code *</Form.Label>
                      <Form.Control type="text" placeholder="ZIP Code" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label>Country *</Form.Label>
                      <Select
                        className='react-select-container'
                        classNamePrefix="react-select"
                        placeholder="Country"
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
                <a href="javascript:void(0)" className={`${pricing.creditCardBtn} btn btnMainOutline`}>Credit Card</a>
                <a href="javascript:void(0)" className={`${pricing.payPalBtn} btn btnMainOutline`}>
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
              <Form>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control type="email" placeholder="Enter Name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control type="text" placeholder="Enter Card Number" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>Expiry Date</Form.Label>
                      <Form.Control type="month" placeholder="MM/YY" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Label>Security Code</Form.Label>
                      <Form.Control type="text" placeholder="CVV" />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                      <Form.Label>Apply Discount Code</Form.Label>
                      <div className="stickySearch">
                        <Form.Control type="text" placeholder="Enter Code" />
                        <Button variant="default" type="submit" className="btnMainLarge stickyBtn">Apply</Button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <p className={pricing.paymentSetupNotice}>By clicking the “Start Membership” button, you agree to our Terms of License and Privacy Policy and that Audiosocket will automatically continue your membership and charge the membership fee on a monthly/annual basis (depending on the plan they selected) until you cancel.</p>
                <button variant="link" className="btn btnMainLarge">Start Membership</button>
              </Form>
            </div>
          </div>
        </div> */}

        {/** Plans Landing page **/}
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
            <p className={pricing.plansDesc}>A Personal License does not include sponsored media, work for hire or allow anyone else to use your work. If you are creating work for use by a business or Client, please select Commercial Media.</p>
            <div className={pricing.plansFeatures}>
              <div className={pricing.featureInclude}>
                <h4>What it’s good for:</h4>
                <ul>
                  <li>Small business media (under 100 employees)</li>
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

      <section className="testimonial">
              <div className="testimonialContainer">
                <Carousel>
                  <Carousel.Item interval={3000}>
                    <div className="authorImg">
                      <Image src={testimonialAvatar} alt="Picture" className=""/>
                    </div>
                    <Carousel.Caption>
                      <p>“Audiosocket blows away the service I used to use in terms of number of tracks and quality tracks! I used to have to settle for using the same tracks over and over for my corporate clients. This service lets me find just the right track with enough variety to make each project unique.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Pete Larson</p>
                        <p><span>Ready Fire Digital</span> , <span>Filmmaker</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={testimonialAvatar} alt="Picture" className=""/>
                    </div>
                    <Carousel.Caption>
                      <p>“Audiosocket blows away the service I used to use in terms of number of tracks and quality tracks! I used to have to settle for using the same tracks over and over for my corporate clients. This service lets me find just the right track with enough variety to make each project unique.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Pete Larson</p>
                        <p><span>Ready Fire Digital</span> , <span>Filmmaker</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>

                  <Carousel.Item>
                    <div className="authorImg">
                      <Image src={testimonialAvatar} alt="Picture" className=""/>
                    </div>
                    <Carousel.Caption>
                      <p>“Audiosocket blows away the service I used to use in terms of number of tracks and quality tracks! I used to have to settle for using the same tracks over and over for my corporate clients. This service lets me find just the right track with enough variety to make each project unique.”</p>
                      <div className="authorStatus">
                        <p className="authorName">Pete Larson</p>
                        <p><span>Ready Fire Digital</span> , <span>Filmmaker</span></p>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                  
                </Carousel>
              </div>
      </section>

      <section className="pricing">
        <div className="bgWave">
          <div className="fixed-container">
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
                  <a href="" className="btn btnMainLarge">Learn More</a>
                </div>
              </div>

              <div className="plan commercial">
                <h4 className="planHeading">commercial</h4>
                <div className="planPrice">
                  <p className="planPriceText">Plans starting at</p>
                  <p className="planPriceAmount"><span>$33</span>&nbsp;/Month</p>
                </div>
                <p className="planDescription">
                  Perfect for the freelancer or business with up to 100 employees creating web media for commercial purposes. This is a single user account.
                </p>
                <div className="PlanBtnContainer">
                  <a href="" className="btn btnMainLarge">Learn More</a>
                </div>
              </div>

              <div className="plan enterprises">
                <h4 className="planHeading">enterprises</h4>
                <div className="planPrice">
                  <p className="planPriceText">Customized quote to meet your needs.</p>
                </div>
                <p className="planDescription">
                  Need a plan for a large business (more than 100 employees), a team account or for TV, Film, Radio or VOD rights? Let us customize a license or plan just for you!
                </p>
                <div className="PlanBtnContainer">
                  <a href="" className="btn btnMainLarge">Request a custom quote</a>
                </div>
              </div>

            </div>
            <p className="plansBottDesc">We also offer single-use licenses.</p>
            <div className="btnContainer text-center">
              <a href="" className="btn btnMainLarge">Learn More</a>
            </div>
          </div>
        </div>
      </section>

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
              <div className="columnLabel">
                Plans starting at
              </div>
            </div>

            <div className="comparisionRow">
              <div className="columnData provider">
                Audiosocket
              </div>
              <div className="columnData trackCount">
                <span className="AsBar">80,000+ Tracks</span>
              </div>
              <div className="columnData planRate">
                <span>$10<sup>.00</sup> <small>/Month</small></span>
              </div>
            </div>

            <div className="comparisionRow">
              <div className="columnData provider">
                Epidemic Sound
              </div>
              <div className="columnData trackCount">
                <span className="epidemicBar">&nbsp;</span>
              </div>
              <div className="columnData planRate">
                <span>$15<sup>.00</sup> <small>/Month</small></span>
              </div>
            </div>

            <div className="comparisionRow">
              <div className="columnData provider">
                Artlist
              </div>
              <div className="columnData trackCount">
                <span className="artlistBar">&nbsp;</span>
              </div>
              <div className="columnData planRate">
                <span>$16<sup>.00</sup> <small>/Month</small></span>
              </div>
            </div>

            <div className="comparisionRow">
              <div className="columnData provider">
                Soundstripe
              </div>
              <div className="columnData trackCount">
                <span className="soundstripeBar">&nbsp;</span>
              </div>
              <div className="columnData planRate">
                <span>$12<sup>.00</sup> <small>/Month</small></span>
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

      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Click me!
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

            
    </div>
  );
}

export default Pricing;