import withPrivateRoute from "../../components/withPrivateRoute";
import ProfileForm from "../../components/profile/ProfileForm";
import { Country, State } from "country-state-city";
import Billing from "../../components/profile/Billing";
import Security from "../../components/profile/Security";
import Subscription from "../../components/profile/Subscription";
import PaymentHistory from "../../components/profile/PaymentHistory";
import Settings from "../../components/profile/Settings";
import { useReducer } from "react";
import { useState, useEffect } from "react";
import { TOAST_OPTIONS } from '../../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

function Edit({ countries }) {
  const [states, setStates] = useState([]);
  const updatedPassword = useSelector(state => state.user.user);
  const updatedUserInfo = useSelector(state => state.user.user);

  useEffect(() => {
    if (updatedPassword){
      if(!updatedPassword?.consumer) {
        if (updatedPassword.password_confirmation) {
          toast.error("Confirm Password doesnot match. Please try again.", TOAST_OPTIONS);
        } else if (updatedPassword === 'Wrong Password'){
          toast.error("You have entered wrong password. Please try again.", TOAST_OPTIONS);
        }
        toast.error(updatedPassword.message, TOAST_OPTIONS);
      } else {
        toast.success("Password updated successfully.", TOAST_OPTIONS);
      }
    }
  }, [updatedPassword])

  useEffect(() => {
    if(updatedUserInfo?.error) {
      toast.error(updatedUserInfo.error, TOAST_OPTIONS);
    } else if (updatedUserInfo.email) {
      toast.success("User updated successfully.", TOAST_OPTIONS);
    }
  }, [updatedUserInfo])

  const handleCountryChange = (code) => {
    const statesArr = getStatesByCountry(code);
    setStates(statesArr);
  };

  return (
    <>
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
      <div className="boxDivision">
        <div className="boxColumn">
          <div className="boxWithShadow">
            <div className="boxHeading">Profile Info</div>
            <ProfileForm
              countries={countries}
              states={states}
              onCountryChange={handleCountryChange}
            />
          </div>
          <div className="boxWithShadow">
            <div className="boxHeading">Profile Security</div>
            <Security />
          </div>
        </div>
        <div className="boxColumn">
          <div className="boxWithShadow">
            <div className="boxHeading">Billing Info</div>
            <Billing />
          </div>
          <div className="boxWithShadow">
            <div className="boxHeading">Subscription</div>
            <Subscription />
          </div>
          <div className="boxWithShadow paymentHistoryWrapper">
            <div className="boxHeading">Payment History</div>
            <PaymentHistory />
          </div>
          <div className="boxWithShadow">
            <div className="boxHeading">Settings</div>
            <Settings />
          </div>
        </div>
      </div>
    </>
  );
}

export default withPrivateRoute(Edit);

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

export const getStatesByCountry = (code) => {
  const stateslist = State.getStatesOfCountry(code);
  const statesArr = stateslist.map((state) => {
    return {
      label: state.name,
      value: state.name,
      isoCode: state.isoCode,
    };
  });
  return statesArr;
};
