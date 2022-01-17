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
  const updatedPassword = useSelector(state => state.user);

  useEffect(() => {
    if(!updatedPassword?.success) {

      toast.error(updatedPassword.message, TOAST_OPTIONS);
    } else {
      toast.success(updatedPassword.message, TOAST_OPTIONS);
    }
  }, [updatedPassword])

  const handleCountryChange = (code) => {
    const statesArr = getStatesByCountry(code);
    setStates(statesArr);
  };

  return (
    
    <div className="boxDivision">
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
