import withPrivateRoute from "../../components/withPrivateRoute";
import ProfileForm from "../../components/profile/ProfileForm";
import { Country, State } from "country-state-city";
import Billing from "../../components/profile/Billing";
import Security from "../../components/profile/Security";

function Edit({ countries, states }) {
  return (
    <div className="row">
      <div className="col-lg-6">
        <fieldset>
          <legend>Profile</legend>
          <ProfileForm countries={countries} states={states} />
        </fieldset>
        <fieldset>
          <legend>Profile Security</legend>
          <Security />
        </fieldset>
      </div>
      <div className="col-lg-6">
        <fieldset>
          <legend>Billing Info</legend>
          <Billing />
        </fieldset>
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
