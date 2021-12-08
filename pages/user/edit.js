import withPrivateRoute from "../../components/withPrivateRoute";
import ProfileForm from "../../components/profile/ProfileForm";
import { Country, State } from "country-state-city";
import Billing from "../../components/profile/Billing";
import Security from "../../components/profile/Security";
import Subscription from "../../components/profile/Subscription";
import PaymentHistory from "../../components/profile/PaymentHistory";
import Settings from "../../components/profile/Settings";
import { useReducer } from "react";

function Edit({ countries, states }) {
  return (
    <div className="boxDivision">
      <div className="boxColumn">
        <div class="boxWithShadow">
          <div className="boxHeading">Profile</div>
          <ProfileForm countries={countries} states={states}/>
        </div>
        <div class="boxWithShadow">
          <div className="boxHeading">Profile Security</div>
          <Security />
        </div>
      </div>
      <div className="boxColumn">
        <div class="boxWithShadow">
          <div className="boxHeading">Billing Info</div>
          <Billing />
        </div>
        <div class="boxWithShadow">
          <div className="boxHeading">Subscription</div>
          <Subscription />
        </div>
        <div class="boxWithShadow paymentHistoryWrapper">
          <div className="boxHeading">Payment History</div>
          <PaymentHistory />
        </div>
        <div class="boxWithShadow">
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
  const stateslist = State.getStatesOfCountry("US");
  const states = [];
  stateslist.forEach((state, key) => {
    states.push({
      label: state.name,
      value: state.name,
      stateCode: state.isoCode,
    });
  });
  return {
    props: {
      countries,
      states,
    },
  };
};
