import withPrivateRoute from "../../components/withPrivateRoute";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";

const ProfileForm = ({ countries, states }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const form = useRef(null);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectCountry = (target) => {
    if (target.value) setCountryError(false);
    setSelectedCountry(target.value);
  };

  const handleSelectState = (target) => {
    if (target.value) setStateError(false);
    setSelectedState(target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCountryError(false);
    setStateError(false);
    const loginForm = e.currentTarget;
    if (loginForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      if (!selectedCountry) setCountryError(true);
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = new FormData(form.current);
      alert("updated!");
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      ref={form}
      onSubmit={handleSubmit}
      className="profileEdit as-form-control"
    >
      <div className="row">
        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label className="required">First Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Enter your first name"
            />
            <Form.Control.Feedback type="invalid">
              Name is required!
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label className="required">Last Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              placeholder="Enter your last name"
            />
            <Form.Control.Feedback type="invalid">
              Name is required!
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="col-lg-12">
          <Form.Group className="">
            <Form.Label className="required">Email Address</Form.Label>
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
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phone" type="text" placeholder="Enter phone" />
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label>Organization</Form.Label>
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
            <Form.Control name="address" type="text" placeholder="Enter here" />
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" type="text" placeholder="Enter city" />
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label className="required">State</Form.Label>
            <Select
              placeholder="Select State"
              className={
                !countryError
                  ? "react-select-container"
                  : "react-select-container invalid"
              }
              classNamePrefix="react-select"
              options={states}
              defaultValue={
                selectedCountry
                  ? states.filter((option) => option.value === selectedState)
                  : { label: "Select State", value: null }
              }
              onChange={handleSelectState}
              noOptionsMessage={() => {
                return "No state found";
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#c0d72d",
                },
                height: 34,
              })}
            />
            {stateError && (
              <small className="input-error">State is required!</small>
            )}
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label className="required">Country</Form.Label>
            <Select
              placeholder="Select Country"
              className={
                !countryError
                  ? "react-select-container"
                  : "react-select-container invalid"
              }
              classNamePrefix="react-select"
              options={countries}
              defaultValue={
                selectedCountry
                  ? countries.filter(
                      (option) => option.value === selectedCountry
                    )
                  : { label: "Select Country", value: null }
              }
              onChange={handleSelectCountry}
              noOptionsMessage={() => {
                return "No country found";
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#c0d72d",
                },
                height: 34,
              })}
            />
            {countryError && (
              <small className="input-error">Country is required!</small>
            )}
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label>Postal code</Form.Label>
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

        <div className="col-md-12 mt-5">
          <Button className="btn primary-btn" type="submit">
            Update Profile
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default withPrivateRoute(ProfileForm);
