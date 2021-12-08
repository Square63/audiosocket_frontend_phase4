import React from "react";
import user from "../../styles/User.module.scss";
import Button from "react-bootstrap/Button";

const PaymentHistory = () => {
  return (
    <div className={user.paymentHistory}>
      <ul>
        <li>
          <span className={user.paymentDate}>October 5, 2021</span>
          <a href="javascript:void(0)" className={user.paymentReciept}>view receipt</a>
        </li>
        <li>
          <span className={user.paymentDate}>September 5, 2021</span>
          <a href="javascript:void(0)" className={user.paymentReciept}>view receipt</a>
        </li>
        <li>
          <span className={user.paymentDate}>August 5, 2021</span>
          <a href="javascript:void(0)" className={user.paymentReciept}>view receipt</a>
        </li>
        <li>
          <span className={user.paymentDate}>July 5, 2021</span>
          <a href="javascript:void(0)" className={user.paymentReciept}>view receipt</a>
        </li>
      </ul>
    </div>
  );
};

export default PaymentHistory;
