import { Form, Button, FormGroup, FormControl, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
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
        <div className={pricing.planTypes}>
          <div className={pricing.typesLeftSec}>
            <p>What type of content are you creating?</p>
          </div>
          <div className={pricing.typesRightSec}>
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
        </div>

        {/* Enterprises Code */}
        <div className={pricing.enterprisePricing}>
          
        </div>
      </div>
    </div>
  );
}

export default Pricing;