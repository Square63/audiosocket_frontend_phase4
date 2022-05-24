import SelectPricingPlan from '../components/SelectPricingPlan'
import { Country, State } from "country-state-city";

function Pricing({countries}) {
  return (
    <SelectPricingPlan countries={countries}></SelectPricingPlan>
  )
}

export default Pricing;

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
