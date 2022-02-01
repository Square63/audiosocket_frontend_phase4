import React from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import user from "../../styles/User.module.scss";

const Subscription = () => {
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
        <Link href="/user/subscription" className="btn btnMainLarge" type="submit">
          Edit Subscription
        </Link>
      </div>
    </div>
  );
};

export default Subscription;
