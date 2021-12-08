import React from "react";
import Button from "react-bootstrap/Button";
import user from "../../styles/User.module.scss";

const Subscription = () => {
  return (
    <div className={user.subscription}>
      <div className={user.subscriptionPlan}>
        <div className={user.aboutPlan}>
          <span className={user.planType}>Individual Plan</span>
          <span className={user.planDuration}>Monthly</span>
        </div>
        <div className={user.planPrice}>
          <span>$33</span>
        </div>
      </div>
      <div className={user.subscriptionPeriod}>
        <span className={user.subscriptionLabel}>Current Subscription Period</span>
        <span className={user.subscriptionFromTo}>10/05/2021 - 11/04/2021</span>
      </div>
      <div className="col-md-12 pt-3 text-center">
        <Button variant="link" className="btnMainLarge" type="submit">
          Edit Subscription
        </Button>
      </div>
    </div>
  );
};

export default Subscription;
