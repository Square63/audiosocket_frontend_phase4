import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import user from "../../styles/User.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSubscription } from "../../redux/actions/authActions";
import InpageLoader from "../InpageLoader";

const Subscription = () => {
  const dispatch = useDispatch();
  const currentSubscription = useSelector(state => state.user.current_subscription);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
    if (!currentSubscription) {

      dispatch(getCurrentSubscription())
    } else {
      
    }
  }, [currentSubscription]);

  return (
    <div className={user.subscription}>
      {!isLoading ? (
        currentSubscription ? 
          <>
            <div className="subscriptionPlan">
              <div className="aboutPlan">
                <span className="planType">{currentSubscription.subscription_plan.name}</span>
                <span className="planDuration">{currentSubscription.subscription_date.duration}</span>
              </div>
              <div className="planPrice">
                <span>${currentSubscription.subscription_plan.price}</span>
              </div>
            </div>
            <div className={user.subscriptionPeriod}>
              <span className={user.subscriptionLabel}>Current Subscription Period</span>
              <span className={user.subscriptionFromTo}>{currentSubscription.subscription_date.starting_date} - {currentSubscription.subscription_date.ending_date}</span>
            </div>
            <div className="col-md-12 pt-3 text-center">
              <Link href="/user/subscription">
                <a className="btn btnMainLarge">Edit Subscription</a>
              </Link>
            </div>
          </> :
          <>No Active subscription</>
      ) : (
        <InpageLoader/>
      )}
      
    </div>
  );
};

export default Subscription;
