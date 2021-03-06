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
  const yearlyPlan = useSelector(state => state.user.yearlyPlan);
  const [isLoading, setIsLoading] = useState(true);
  const [userCurrentPlan, setUserCurrentPlan] = useState(null);
  const [monthlyYearly, setMonthlyYearly] = useState("Annually");


  useEffect(() => {
    dispatch(getSubscriptionPlans())
  }, []);

  useEffect(() => {
    if (subscriptionPlans || currentPlan || yearlyPlan) {
      setIsLoading(false)
      setUserCurrentPlan(currentPlan)
    }
  }, [subscriptionPlans, currentPlan, yearlyPlan])

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
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.9kL4HmyjCYJgdpBHX1g3JHAp235eKlLAO_vcPb4bYGk',
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

  const handleMonthlyYearly = (value) => {
    setMonthlyYearly(value);
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
                    {yearlyPlan && <Link href={{ pathname: "/plans/" + yearlyPlan.id, query: {yearly: true }}}>
                      <a href="javascript:void(0)" className="btn btnMainSmall mt-0">
                        Switch to Yearly Billing
                      </a>
                    </Link>}


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
              <input id="toggle-on" className="toggle toggleLeft" name="toggle" value="false" type="radio" checked={monthlyYearly == "Monthly" ? true : false} onClick={ () => handleMonthlyYearly("Monthly")} />
              <label htmlFor="toggle-on" className="movingBtn">Monthly</label>
              <input id="toggle-off" className="toggle toggleRight" name="toggle" value="true" type="radio" checked={monthlyYearly == "Annually" ? true : false} onClick={ () => handleMonthlyYearly("Annually")} />
              <label htmlFor="toggle-off" className="movingBtn">Annually</label>
            </div>
          </div>
          { monthlyYearly == "Monthly" ? <div className={user.plansShelf}>
            <div className="boxWithOutShadow">
              <div className={user.plansHeading}>
                <h2>
                  Personal Monthly Music Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${subscriptionPlans[5].price}</span>
                  <small className={user.planDuration}>/Month</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization for your personal account</span></li>
                  <li><span>Personal video projects, school projects</span></li>

                  <li className={user.notAvailable}><span>Promoting a product service or brand</span></li>
                  <li className={user.notAvailable}><span>Videos created for a business or a client???s business</span></li>
                  <li className={user.notAvailable}><span>Digital ads</span></li>
                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[5].id}>
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
                  Personal Monthly Music & SFX Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${subscriptionPlans[4].price}</span>
                  <small className={user.planDuration}>/Month</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization for your personal account</span></li>
                  <li><span>Personal video projects, school projects</span></li>

                  <li className={user.notAvailable}><span>Promoting a product service or brand</span></li>
                  <li className={user.notAvailable}><span>Videos created for a business or a client???s business</span></li>
                  <li className={user.notAvailable}><span>Digital ads</span></li>
                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[4].id}>
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
                  Commercial Monthly Music Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${subscriptionPlans[9].price}</span>
                  <small className={user.planDuration}> /Month</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Small business media (under 50 employees)</span></li>
                  <li><span>Freelancers creating media for small business clients</span></li>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization</span></li>
                  <li><span>Wedding / Event videos</span></li>
                  <li><span>Digital Ads (Pre-Roll, Post-Roll, Facebook, Instagram)</span></li>

                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[9].id}>
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
                  Commercial Monthly Music & SFX Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${subscriptionPlans[18].price}</span>
                  <small className={user.planDuration}> /Month</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Small business media (under 50 employees)</span></li>
                  <li><span>Freelancers creating media for small business clients</span></li>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization</span></li>
                  <li><span>Wedding / Event videos</span></li>
                  <li><span>Digital Ads (Pre-Roll, Post-Roll, Facebook, Instagram)</span></li>

                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[18].id}>
                    <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                      Select Plan
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div> :
          <div className={user.plansShelf}>
            <div className="boxWithOutShadow">
              <div className={user.plansHeading}>
                <h2>
                  Personal Annual Music Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${((subscriptionPlans[7].price)/12).toFixed(2)}</span>
                  <small className={user.planDuration}>/Month</small>
                  <small className={user.durationConvertion}> ${subscriptionPlans[7].price}/Year</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization for your personal account</span></li>
                  <li><span>Personal video projects, school projects</span></li>

                  <li className={user.notAvailable}><span>Promoting a product service or brand</span></li>
                  <li className={user.notAvailable}><span>Videos created for a business or a client???s business</span></li>
                  <li className={user.notAvailable}><span>Digital ads</span></li>
                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[7].id}>
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
                  Personal Annual Music & SFX Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${((subscriptionPlans[6].price)/12).toFixed(2)}</span>
                  <small className={user.planDuration}>/Month</small>
                  <small className={user.durationConvertion}> ${subscriptionPlans[6].price}/Year</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization for your personal account</span></li>
                  <li><span>Personal video projects, school projects</span></li>

                  <li className={user.notAvailable}><span>Promoting a product service or brand</span></li>
                  <li className={user.notAvailable}><span>Videos created for a business or a client???s business</span></li>
                  <li className={user.notAvailable}><span>Digital ads</span></li>
                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[6].id}>
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
                  Commercial Annual Music Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${((subscriptionPlans[20].price)/12).toFixed(2)}</span>
                  <small className={user.planDuration}> /Month</small>
                  <small className={user.durationConvertion}> ${subscriptionPlans[20].price}/Year</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Small business media (under 50 employees)</span></li>
                  <li><span>Freelancers creating media for small business clients</span></li>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization</span></li>
                  <li><span>Wedding / Event videos</span></li>
                  <li><span>Digital Ads (Pre-Roll, Post-Roll, Facebook, Instagram)</span></li>

                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[20].id}>
                    <a href="javascript:void(0)" className="btn btnMainLarge m-0">
                      Select Plan
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="boxWithOutShadow">
              <div className={user.plansHeading}>
                <h2>
                  Commercial Annual Music & SFX Subscription
                </h2>
                <div className={user.withRate}>
                  <span className={user.rate}>${((subscriptionPlans[19].price)/12).toFixed(2)}</span>
                  <small className={user.planDuration}> /Month</small>
                  <small className={user.durationConvertion}> ${subscriptionPlans[19].price}/Year</small>
                </div>
              </div>
              <div className={user.planBody}>
                <ul className={user.planFeatures}>
                  <li><span>Small business media (under 50 employees)</span></li>
                  <li><span>Freelancers creating media for small business clients</span></li>
                  <li><span>Web streaming on social media (YouTube, Vimeo, Instagram etc)</span></li>
                  <li><span>YouTube monetization</span></li>
                  <li><span>Wedding / Event videos</span></li>
                  <li><span>Digital Ads (Pre-Roll, Post-Roll, Facebook, Instagram)</span></li>

                  <li className={user.notAvailable}><span>TV, Radio, Video On Demand (Netflix, Hulu, Amazon Prime etc)</span></li>
                  <li className={user.notAvailable}><span>Games & Apps</span></li>
                  <li className={user.notAvailable}><span>Theatrical release</span></li>
                </ul>
                <div className={user.plansBtnWrapper}>
                  <Link href={"/plans/" + subscriptionPlans[19].id}>
                    <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                      Select Plan
                    </a>
                  </Link>
                </div>
              </div>
            </div>

          </div>}

          <div className={user.enterprises+' boxWithOutShadow mt-5 w-50 mx-auto'}>
              <div className={user.plansHeading}>
                <h2>
                  Enterprise Plan
                </h2>
              </div>
              <div className={user.planBody}>
                <div className={user.planFeatures}>
                  <p className="mb-4">Need a plan for a large business (more than 50 employees), a team account with multiple seats, or TV, Film, Radio, VOD or expanded media rights? Let us customize a license or a plan just for you!</p>
                  <p className="mb-4">Our music is available to license for <strong>ALL MEDIA</strong>.</p>
                  <p className="mb-4">Whatever you???re creating, we???ve got you covered. Just ask!</p>
                  <p className="mb-4">Please request a custom quote and one of our reps will be in touch ASAP.</p>
                </div>
                <div className={user.plansBtnWrapper}>
                  <Link href="/pricing?enterprise=true">
                    <a className="btn btnMainLarge mt-0">
                      Request a Custom Quote
                    </a>
                  </Link>
                </div>
              </div>
            </div>
        </div>
      )}
    </>
  );
}

export default withPrivateRoute(Subscription);
