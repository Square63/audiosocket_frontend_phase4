import {useState} from "react";
import signup from "../styles/Signup.module.scss";
import SelectPricingPlan from '../components/SelectPricingPlan'
import { Country } from "country-state-city";

function SelectPlan({countries}) {
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
      <div className={signup.signUpInner+' signUpInnerGlobal'}>
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

        <SelectPricingPlan data={handleSteps} countries={countries} display={true}></SelectPricingPlan>
      </div>
    </div>
  );
}

export default SelectPlan;

export const getStaticProps = () => {
  const countriesList = Country.getAllCountries();
  const countries = [];
  countries.push({ label: "Select Country", value: null, countryCode: null });
  countries.push({
    label: "United States",
    value: "United States",
    countryCode: "US",
  });
  countriesList.forEach((country, key) => {
    if (country.isoCode !== "US")
      countries.push({
        label: country.name,
        value: country.name,
        countryCode: country.isoCode,
      });
  });
  return {
    props: {
      countries,
    },
  };
};
