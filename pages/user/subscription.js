import withPrivateRoute from "../../components/withPrivateRoute";
import { Form, Button} from "react-bootstrap";
import user from "../../styles/User.module.scss";

function Subscription() {
  return (
    <div className={user.editSubscription}>
      <h3 className={user.planStatus}>Current Plan</h3>
      <div className={user.plansShelf}>
        <div className={user.currentPlan+' boxWithOutShadow'}>
          <div className={user.plansHeading}>
            <h2>Personal Plan - Music Only <small>Monthly</small></h2>
            <div className={user.withRate}>
              <span className={user.rate}>$59</span>
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
              <div className="toogleSwitch">
                <input type="checkbox" id="toggleSubscription" />
                <Form.Label htmlFor="toggleSubscription">&nbsp;</Form.Label>
                <span className="switchText">Toggle Subscription</span>
              </div>
              <p>Use to pause or cancel your current subscription. You can re-enable at any time.</p>
              <a href="javascript:void(0)" className="btn btnMainSmall mt-0">
                Switch to Yearly Billing
              </a>
            </div>
          </div>
        </div>
      </div>
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
              Commercial Plan - Music Only
            </h2>
            <div className={user.withRate}>
              <span className={user.rate}>$59</span>
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
              <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                Select Plan
              </a>
            </div>
          </div>
        </div>

        <div className="boxWithOutShadow">
          <div className={user.plansHeading}>
            <h2>
              Personal Plan - Music + SFX
            </h2>
            <div className={user.withRate}>
              <span className={user.rate}>$59</span>
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
              <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                Select Plan
              </a>
            </div>
          </div>
        </div>

        <div className="boxWithOutShadow">
          <div className={user.plansHeading}>
            <h2>
              Commercial Plan - Music + SFX
            </h2>
            <div className={user.withRate}>
              <span className={user.rate}>$72</span>
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
              <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                Select Plan
              </a>
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
              <a href="javascript:void(0)" className="btn btnMainLarge mt-0">
                Request a Custom Quote
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default withPrivateRoute(Subscription);