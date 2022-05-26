import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button} from "react-bootstrap";
import user from "../../styles/User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionPlans } from "../../redux/actions/authActions";
import { useState, useEffect } from "react";
import InpageLoader from '../../components/InpageLoader';
import { useRouter } from "next/router";
import Router from "next/router";
// import { Link } from "@mui/material";
import Link from "next/link";
import { BASE_URL } from "../../common/api";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Subscription() {
  const dispatch = useDispatch();
  const router = useRouter();
  const subscriptionPlans = useSelector(state => state.user.subscriptionPlans);
  const currentPlan = useSelector(state => state.user.currentPlan);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrentPlan, setUserCurrentPlan] = useState(null);


  useEffect(() => {
    dispatch(getSubscriptionPlans())
  }, []);

  useEffect(() => {
    if (subscriptionPlans || currentPlan) {
      setIsLoading(false)
      setUserCurrentPlan(currentPlan)
    }
  }, [subscriptionPlans, currentPlan])

  useEffect(() => {
  }, [userCurrentPlan])

  const handleCancelSubscription = async() =>{
    try {
      // Send nonce to your server
      const authToken = JSON.parse(localStorage.getItem("user") ?? "");
      const url = `${BASE_URL}/api/v1/consumer/plans/cancel_current_braintree_subscription`
      const response = await axios.delete(
        url,
        {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
            'auth-token': authToken
          }
        }
      )

      toast.success(response.data.message)
      localStorage.setItem("has_subscription", false);
      setUserCurrentPlan(null)
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {isLoading ? (
        <InpageLoader/>
      ) : (
        <div className={user.editSubscription}>
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
          {userCurrentPlan && 
          <>
            <h3 className={user.planStatus}>Current Plan</h3>
            <div className={user.plansShelf}>
              <div className={user.currentPlan+' boxWithOutShadow'}>
                <div className={user.plansHeading}>
                  <h2>{userCurrentPlan.name} <small>Monthly</small></h2>
                  <div className={user.withRate}>
                    <span className={user.rate}>${userCurrentPlan.price}</span>
                    <small className={user.planDuration}>/Month</small>
                  </div>
                </div>
                <div className={user.planBody}>
                  <ul className={user.planFeatures}>
                    <li><span>Unlimited Licenses</span></li>
                    <li><span>All access to over +80,000 songs</span></li>
                    <li><span>Use for personal and student web media</span></li>
                    <li><span>Cleared for use on your social channels</span></li>
                    <li><span>Monetize on your personal channels.</span></li>
                  </ul>
                  <div className={user.sideContent}>
                    {/* <div className="toogleSwitch">
                      <input type="checkbox" id="toggleSubscription" />
                      <Form.Label htmlFor="toggleSubscription">&nbsp;</Form.Label>
                      <span className="switchText">Toggle Subscription</span>
                    </div><br></br> */}
                    <a href="javascript:void(0)" className="btn btnMainSmall inBlack mt-0" onClick={handleCancelSubscription}>
                      Cancel Subscription
                    </a>
                    <p>Use to pause or cancel your current subscription. You can re-enable at any time.</p>
                    <a href="javascript:void(0)" className="btn btnMainSmall mt-0">
                      Switch to Yearly Billing
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          </>
          }
          <div className="billingFrequency">
            <h3 className={user.planStatus}>Change Your Plan</h3>
            <span>Billing Frequency</span>
            <div className="toggleButton">
              <input id="toggle-on" className="toggle toggleLeft" name="toggle" value="false" type="radio" checked/>
              <label htmlFor="toggle-on" className="movingBtn">Monthly</label>
              <input id="toggle-off" className="toggle toggleRight" name="toggle" value="true" type="radio"/>
              <label htmlFor="toggle-off" className="movingBtn">Annually</label>
            </div>
          </div>
          <div className={user.plansShelf}>
            <div className="boxWithOutShadow">
              <div className={user.plansHeading}>
                <h2>
                  {subscriptionPlans[0].name}
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${subscriptionPlans[0].price}</span>
                  <small className={user.planDuration}>/Month</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li className={user.notAvailable}><span>Unlimited Licenses</span></li>
                  <li className={user.notAvailable}><span>All access to over +80,000 songs</span></li>
                  <li className={user.notAvailable}><span>Use for personal and student web media</span></li>
                  <li className={user.notAvailable}><span>Cleared for use on your social channels</span></li>
                  <li className={user.notAvailable}><span>Monetize on your personal channels.</span></li>
                  <li><span>Use for videos or podcasts hosted on company websites or social media channels</span></li>
                  <li><span>Monetize on YouTube, Patreon, Twitch and all social platforms</span></li>
                  <li><span>CID instant clear codes for your clients</span></li>
                  <li><span>Unlimited use in digital ads</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[0].id}>
                    <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                      Select Plan
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="boxWithOutShadow">
              <div className={user.plansHeading}>
                <h2>
                  {subscriptionPlans[1].name}
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${subscriptionPlans[1].price}</span>
                  <small className={user.planDuration}>/Month</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Unlimited Licenses</span></li>
                  <li><span>All access to over +80,000 songs</span></li>
                  <li><span>Use for personal and student web media</span></li>
                  <li><span>Cleared for use on your social channels</span></li>
                  <li><span>Monetize on your personal channels.</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[1].id}>
                    <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                      Select Plan
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="boxWithOutShadow">
              <div className={user.plansHeading}>
                <h2>
                  {subscriptionPlans[2].name}
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${subscriptionPlans[2].price}</span>
                  <small className={user.planDuration}> /Month</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li className={user.notAvailable}><span>Unlimited Licenses</span></li>
                  <li className={user.notAvailable}><span>All access to over +80,000 songs</span></li>
                  <li className={user.notAvailable}><span>Use for personal and student web media</span></li>
                  <li className={user.notAvailable}><span>Cleared for use on your social channels</span></li>
                  <li className={user.notAvailable}><span>Monetize on your personal channels.</span></li>
                  <li><span>Use for videos or podcasts hosted on company websites or social media channels</span></li>
                  <li><span>Monetize on YouTube, Patreon, Twitch and all social platforms</span></li>
                  <li><span>CID instant clear codes for your clients</span></li>
                  <li><span>Unlimited use in digital ads</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[2].id}>
                    <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                      Select Plan
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className={user.enterprises+' boxWithOutShadow'}>
              <div className={user.plansHeading}>
                <h2>
                  Enterprise Plan
                </h2>
              </div>
              <div className={user.planBody}>
                <div className={user.planFeatures}>
                  <p>Need a plan for a large business (more than 100 employees), a team account or for TV, Film, Radio or VOD rights?
                    Let us customize a plan just for you!
                  </p>

                  <p>Our music is available to license for ALL MEDIA. Whatever you’re creating, we’ve got you covered. Just ask!.</p>
                  <p>Please request a custom quote and one of our reps will be in touch ASAP.</p>
                </div>
                <div className={user.plansBtnWrapper}>
                  <a href="https://audiosocket.activehosted.com/f/43" className="btn btnMainLarge mt-0">
                    Request a Custom Quote
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default withPrivateRoute(Subscription);