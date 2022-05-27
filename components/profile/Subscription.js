import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import user from "../../styles/User.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentSubscription } from "../../redux/actions/authActions";

const Subscription = () => {
  const dispatch = useDispatch();
  const currentSubscription = useSelector(state => state);

  useEffect(() => {
    debugger
    dispatch(getCurrentSubscription())
  }, []);

  return (
    <div className={user.subscription}>
      <div className="subscriptionPlan">
        <div className="aboutPlan">
          <span className="planType">Individual Plan</span>
          <span className="planDuration">Monthly</span>
        </div>
        <div className="planPrice">
          <span>$33</span>
        </div>
      </div>
      <div className={user.subscriptionPeriod}>
        <span className={user.subscriptionLabel}>Current Subscription Period</span>
        <span className={user.subscriptionFromTo}>10/05/2021 - 11/04/2021</span>
      </div>
      <div className="col-md-12 pt-3 text-center">
        <Link href="/user/subscription">
          <a className="btn btnMainLarge">Edit Subscription</a>
        </Link>
      </div>
    </div>
  );
};

export default Subscription;
