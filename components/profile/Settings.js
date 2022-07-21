import { React, useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import user from "../../styles/User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useCookie } from 'next-cookie'
import { useRouter } from "next/router";
import { getUserInfo } from "../../redux/actions/authActions";
import { updateProfile } from "../../redux/actions/authActions";
import { toast } from 'react-toastify';

const Settings = () => {
  const cookie = useCookie()
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.userInfo);
  const updatedUserInfo = useSelector(state => state.user.user);
  const [userName, setUserName] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeWhitelistingState, setYoutubeWhitelistingState] = useState(false);
  const [marketingEmailsState, setMarketingEmailsState] = useState(false);

  useEffect(() => {
    if (userInfo){
      setYoutubeWhitelistingState(userInfo?.consumer_profile?.white_listing_enabled);
      setMarketingEmailsState(userInfo?.consumer_profile?.marketing_email);
    }
  }, [userInfo]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserName(JSON.parse(localStorage.getItem("user") ?? ""));
    }
    dispatch(getUserInfo(JSON.parse(localStorage.getItem("user"))))
  }, [updatedUserInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(form.current);
    const first_name = userInfo?.consumer_profile?.first_name
    const last_name = userInfo?.consumer_profile?.last_name
    const email = userInfo?.consumer_profile?.email
    const phone = userInfo?.consumer_profile?.phone
    const organization = userInfo?.consumer_profile?.organization
    const city = userInfo?.consumer_profile?.city
    const address = userInfo?.consumer_profile?.address
    const country = userInfo?.consumer_profile?.country
    const postal_code = userInfo?.consumer_profile?.postal_code
    const youtube_url = userInfo?.consumer_profile?.youtube_url
    if (country && youtube_url) {
      let profileData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        organization: organization,
        city: city,
        address: address,
        country: country,
        postal_code: postal_code,
        youtube_url: youtube_url,
        white_listing_enabled: data.get("youtube_white_listing"),
        marketing_email: data.get("audiosocket_marketing_email"),
			};
      dispatch(updateProfile(profileData));
    } else {
      toast.error("Please complete your Profile Info.");
    }
  };

  const toggleYoutubeWhitelisting = () => {
    setYoutubeWhitelistingState(!youtubeWhitelistingState);
  }

  const togglemarketingEmail = () => {
    setMarketingEmailsState(!marketingEmailsState);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} className={user.boxSetting + " profileEdit as-form-control"} ref={form} noValidate validated={validated}>
        <Form.Group>
          <div className="toogleSwitch">
            <input type="checkbox" id="youtubeWhitelisting" name="youtube_white_listing" checked={youtubeWhitelistingState} onClick={() => toggleYoutubeWhitelisting()} />
            <Form.Label for="youtubeWhitelisting">&nbsp;</Form.Label>
            <span className="switchText">YouTube whitelisting Enabled</span>
            <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
              <a className={user.info}></a>
            </OverlayTrigger>
          </div>
        </Form.Group>
        <Form.Group>
          <div className="toogleSwitch">
            <input type="checkbox" id="audiosocketEmail" name="audiosocket_marketing_email" checked={marketingEmailsState} onClick={() => togglemarketingEmail()}  />
            <Form.Label for="audiosocketEmail">&nbsp;</Form.Label>
            <span className="switchText">Receive marketing emails from Audiosocket</span>
          </div>
        </Form.Group>
        <div className="col-md-12 pt-3 text-center">
          <Button variant="link" className="btnMainLarge" type="submit">
            Update Setting
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
