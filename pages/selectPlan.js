import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useRef, useContext, useEffect} from "react";
import {AuthContext} from "../store/authContext";
import Select from "react-select";
import Link from "next/link"
import router, {Router} from "next/router";

import signup from "../styles/Signup.module.scss";
import PricingPlan from '../components/PricingPlan';
import SelectPricingPlan from '../components/SelectPricingPlan'

function SelectPlan() {

  useEffect(() => {
    // if(!localStorage.getItem('user')) {
    //   router.push('/signup');
    // }
  }, []);

  const [activeStep, setActiveStep] = useState(false);

  function handleSteps(step) {
    if (step == 3) {
      setActiveStep(true);
    } else {
      setActiveStep(false);
    }
  }

  return(
    <div className={signup.stepWrapper+" "+signup.stepTwoWrapper}>
      <div className="fixed-container">
        <div className={signup.signUpInner}>
          <div className={signup.signupHeaderWrapper}>
            <div className={signup.signupHeading}>
              <h1>Sign Up</h1>
            </div>
            <div className={signup.steps}>
              <ul>
                <li>
                  <span>1</span>Create Account
                </li>
                <li className={activeStep ? "" : signup.active }>
                  <span>2</span>Select Plan
                </li>
                <li className={activeStep ? signup.active : ""}>
                  <span>3</span>Setup Payment
                </li>
              </ul>
            </div>
          </div>

          <SelectPricingPlan data={handleSteps} display={true}></SelectPricingPlan>
        </div>
      </div>
    </div>
  );
}

export default SelectPlan;
