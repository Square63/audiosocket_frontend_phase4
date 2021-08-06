import withPrivateRoute from "../../components/withPrivateRoute";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useRef, useState} from "react";
import Select from "react-select";
import { Country } from "country-state-city";
import {useRouter} from "next/router";

function Edit({countries}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryError, setCountryError] = useState(false);
  const form = useRef(null);
  const router = useRouter()
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectCountry = (target) => {
    if(target.value)
      setCountryError(false);
    setSelectedCountry(target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCountryError(false);
    const loginForm = e.currentTarget;
    if (loginForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      if(!selectedCountry)
        setCountryError(true);
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = new FormData(form.current);
      alert('updated!');
    }
  }

  return (
    <div className="userContent">
      <Form noValidate validated={validated} ref={form} onSubmit={handleSubmit} className="profileEdit as-form-control">
        <div className="row">
          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label className="required">Name</Form.Label>
              <Form.Control
                required
                name="name"
                type="text"
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">
                Name is required!
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label className="required">New Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                A valid email address is required!
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                placeholder="Enter phone"
              />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label>organization</Form.Label>
              <Form.Control
                name="organization"
                type="text"
                placeholder="Enter company name"
              />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Enter here"
              />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label>city</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="Enter city"
              />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label className="required">Country</Form.Label>
              <Select
                placeholder="Select Country"
                className={!countryError ? "country-select-container-header" : "country-select-container-header invalid"}
                classNamePrefix="country-select-header"
                options={countries}
                defaultValue={selectedCountry ? countries.filter(option => option.value === selectedCountry) : {label: "Select Country", value: null}}
                onChange={handleSelectCountry}
                noOptionsMessage={() => {return "No country found"}}
                theme={theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: '#c0d72d',
                  },
                  height: 34,
                })}
              />
              {countryError &&
                <small className="input-error">Country is required!</small>
              }

            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label>postal code</Form.Label>
              <Form.Control
                name="postal_code"
                type="text"
                placeholder="Enter code"
              />
            </Form.Group>
          </div>
          

          <div className="col-lg-6">
            <Form.Group className="">
              <Form.Label>Youtube URL</Form.Label>
              <Form.Control
                name="youtube_url"
                type="text"
                placeholder="Enter here"
              />
            </Form.Group>
          </div>

          <div className="col-md-12">
            <div className="elementInline">
              <Form.Label className="m-0 mr-3">White-listing enabled</Form.Label>
              <div className="radio">
                <label htmlFor="account_youtube_monetization_0" className="radio radio-gradient">
                  <span className="radio__input">
                    <input type="radio" id="account_youtube_monetization_0" name="account[youtube_monetization]"  value="1"/>
                    <span className="radio__control"></span>
                  </span>
                  <span className="radio__label">Yes</span>
                </label>
              </div>
              <div className="radio">
                <label htmlFor="account_youtube_monetization_1" className="radio radio-gradient">
                  <span className="radio__input">
                    <input type="radio" id="account_youtube_monetization_1" name="account[youtube_monetization]" value="0"/>
                    <span className="radio__control"></span>
                  </span>
                  <span className="radio__label">No</span>
                </label>
              </div>
            </div>
          </div>

          <div className="col-md-12 mt-5">
            <Button className="userAccountBtn" type="submit">
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default withPrivateRoute(Edit);

export const getStaticProps = () => {
  const countriesList = Country.getAllCountries();
  const countries = [];
  countries.push({label: "Select Country", value: null, countryCode: null});
  countries.push({label: "United States", value: "United States", countryCode: "US"});
  countriesList.forEach((country, key) => {
    if(country.isoCode !== 'US')
      countries.push({label: country.name, value: country.name, countryCode: country.isoCode})
  });
  return {
    props: {
      countries
    }
  }
}