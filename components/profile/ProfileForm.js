import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/actions/authActions";
import { updateProfile } from "../../redux/actions/authActions";

const ProfileForm = ({ countries, states, onCountryChange }) => {
  // const countryRef = useRef(null)
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const updatedUserInfo = useSelector(state => state.user.user);
  console.log("USER INFO", userInfo)
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [userName, setUserName] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false)
  }, [updatedUserInfo])

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserName(JSON.parse(localStorage.getItem("user") ?? ""));
    }
    dispatch(getUserInfo(JSON.parse(localStorage.getItem("user"))))
  }, [updatedUserInfo]);

  const handleSelectCountry = (target) => {
    if (target.value) setCountryError(false);
    setSelectedCountry(target.value);
    onCountryChange(target.countryCode);
    setSelectedState(null);
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
    const data = new FormData(form.current);
    if (loginForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      if (!selectedCountry) setCountryError(true);
      if (!selectedState) setStateError(true);
      setValidated(true);
      setIsLoading(false);
    } else {
      let profileData = {
				first_name: data.get("first_name"),
				last_name: data.get("last_name"),
        email: data.get("email"),
        phone: data.get("phone"),
        organization: data.get("organization"),
        city: data.get("city"),
        address: data.get("address"),
        country: data.get("country"),
        postal_code: data.get("postal_code"),
        youtube_url: data.get("youtube_url")
			};
      dispatch(updateProfile(profileData));
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
              name="first_name"
              type="text"
              defaultValue={userInfo ? userInfo.first_name : ""}
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
              name="last_name"
              type="text"
              defaultValue={userInfo ? userInfo.last_name : ""}
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
              defaultValue={userInfo ? userInfo.email : ""}
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
            <Form.Control name="phone" type="text" placeholder="Enter phone" defaultValue={userInfo ? (userInfo.consumer_profile ? userInfo.consumer_profile.phone : "") : ""} />
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label>Organization</Form.Label>
            <Form.Control
              name="organization"
              type="text"
              defaultValue={userInfo ? (userInfo.consumer_profile ? userInfo.consumer_profile.organization : "") : ""}
              placeholder="Enter company name"
            />
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
              value={
                selectedCountry
                  ? countries.filter((option) => option.value === selectedCountry)
                  : { label: (userInfo && userInfo.consumer_profile ? userInfo.consumer_profile.country : "") , value: (userInfo && userInfo.consumer_profile ? userInfo.consumer_profile.country : "") }
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
              name="country"
            />
            {countryError && (
              <small className="input-error">Country is required!</small>
            )}
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label>City</Form.Label>
            <Form.Control name="city" type="text" placeholder="Enter city" defaultValue={userInfo ? (userInfo.consumer_profile ? userInfo.consumer_profile.city : "") : ""} />
          </Form.Group>
        </div>

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" type="text" placeholder="Enter here" defaultValue={userInfo ? (userInfo.consumer_profile ? userInfo.consumer_profile.address : "") : ""} />
          </Form.Group>
        </div>

        {/* <div className="col-lg-6">
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
              value={
                selectedState
                  ? states.filter((option) => option.value === selectedState)
                  : { label: "Adrar", value: "Adrar" }
              }
              onChange={handleSelectState}
              noOptionsMessage={() => {
                return selectedCountry ? "No state found" : "Choose a country";
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
        </div> */}

        <div className="col-lg-6">
          <Form.Group className="">
            <Form.Label>Postal code</Form.Label>
            <Form.Control
              name="postal_code"
              type="text"
              placeholder="Enter code"
              defaultValue={userInfo ? (userInfo.consumer_profile ? userInfo.consumer_profile.postal_code : "") : ""}
            />
          </Form.Group>
        </div>

        <div className="col-lg-12">
          <Form.Group className="">
            <Form.Label>Youtube URL</Form.Label>
            <Form.Control
              name="youtube_url"
              type="text"
              placeholder="Enter here"
              defaultValue={userInfo ? (userInfo.consumer_profile ? userInfo.consumer_profile.youtube_url : "") : ""}
            />
          </Form.Group>
        </div>

        <div className="col-md-12 pt-3 text-center">
          <Button variant="link" className="btnMainLarge" type="submit" disabled={isLoading}>
            {isLoading ? (
              <div>
                Updating...
              </div>
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ProfileForm;
