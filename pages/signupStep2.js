import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useRef, useContext, useEffect} from "react";
import {AuthContext} from "../store/authContext";
import {useRouter} from "next/router";
import signup from "../styles/Signup.module.scss";
import Select from "react-select";
import Link from "next/link"

function SignupStep2() {
  return(
    <div className={signup.stepTwoWrapper}>
      <div className="fixed-container">
        <div className={signup.signUpInner}>
          <div className={signup.planWrapper}>
            <div className="boxWithOutShadow">
              <h2 className={signup.plansHeading}>
                personal plan
              </h2>
              <ul className={signup.planFeatures}>
                <li><span>Unlimited Licenses</span></li>
                <li><span>All access to over +80,000 songs</span></li>
                <li><span>Use for personal and student web media</span></li>
                <li><span>Cleared for use on your social channels</span></li>
                <li><span>Monetize on your personal channels.</span></li>
                <li className={signup.notAvailable}><span>Use for videos or podcasts hosted on company websites or social media channels</span></li>
                <li className={signup.notAvailable}><span>Monetize on YouTube, Patreon, Twitch and all social platforms</span></li>
                <li className={signup.notAvailable}><span>CID instant clear codes for your clients</span></li>
                <li className={signup.notAvailable}><span>Unlimited use in digital ads</span></li>
              </ul>
              <div className={signup.plansBtnWrapper}>
                <a href="javascript:void(0)" className="btn btnMainLarge inBlack btn-block mt-0">
                  <span className={signup.btnCategory}>Music Only</span><span>$15 /Month</span>
                </a>
                <a href="javascript:void(0)" className="btn btnMainLarge btn-block mt-0">
                  <span className={signup.btnCategory}>Music + SFX</span><span>$25 /Month</span>
                </a>
              </div>
            </div>

            <div className="boxWithOutShadow">
              <h2 className={signup.plansHeading}>
                commercial plan
              </h2>
              <ul className={signup.planFeatures}>
                <li><span>Unlimited Licenses</span></li>
                <li><span>All access to over +80,000 songs</span></li>
                <li><span>Use for personal and student web media</span></li>
                <li><span>Cleared for use on your social channels</span></li>
                <li><span>Monetize on your personal channels.</span></li>
                <li><span>Use for videos or podcasts hosted on company websites or social media channels</span></li>
                <li><span>Monetize on YouTube, Patreon, Twitch and all social platforms</span></li>
                <li><span>CID instant clear codes for your clients</span></li>
                <li><span>Unlimited use in digital ads</span></li>
              </ul>
              <div className={signup.plansBtnWrapper}>
                <a href="javascript:void(0)" className="btn btnMainLarge inBlack btn-block mt-0">
                  <span className={signup.btnCategory}>Music Only</span><span>$15 /Month</span>
                </a>
                <a href="javascript:void(0)" className="btn btnMainLarge btn-block mt-0">
                  <span className={signup.btnCategory}>Music + SFX</span><span>$25 /Month</span>
                </a>
              </div>
            </div>

            <div className={signup.fullWidthPlans}>
              <h2 className={signup.plansHeading}>Enterprise Plan</h2>
              <div className={signup.plansContent}>
                <p>Need a plan for a large business (more than 100 employees), a team account or for TV, Film, Radio or VOD rights?
                  Let us customize a plan just for you!</p>
                <p>Our music is available to license for <strong>ALL MEDIA</strong>. Whatever you’re creating, we’ve got you covered. Just ask!.</p>
                <p>Please request a custom quote and one of our reps will be in touch ASAP.</p>
              </div>
              <div className={signup.plansBtnWrapper}>
                <a href="" className="btn btnMainLarge">
                  Request a Custom Quote
                </a>
              </div>
            </div>

            <div className={signup.fullWidthPlans}>
              <h2 className={signup.plansHeading}>Individual Licensing</h2>
              <div className={signup.plansContent}>
                <p>If you’d prefer to pay for track licensing individually, you can create an account without a subscription</p>
              </div>
              <div className={signup.plansBtnWrapper}>
                <a href="" className="btn btnMainLarge">
                  Continue with Individual Track Licensing
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    
  );
}

export default SignupStep2;