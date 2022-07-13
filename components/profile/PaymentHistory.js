import React from "react";
import user from "../../styles/User.module.scss";
import Button from "react-bootstrap/Button";
import InpageLoader from "../InpageLoader";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPaymentHistory } from "../../redux/actions/authActions";

const PaymentHistory = () => {
  const dispatch = useDispatch();
  const paymentHistory = useSelector(state => state.user.paymentHistory);
  const [isLoading, setIsLoading] = useState(true);
  const [userPaymentHistory, setUserPaymentHistory] = useState(null);

  useEffect(() => {
    dispatch(getPaymentHistory())
  }, []);

  useEffect(() => {
    if (paymentHistory) {
      setIsLoading(false);
      setUserPaymentHistory(paymentHistory);
    }
  }, [paymentHistory])

  return (
    !userPaymentHistory ?
      <InpageLoader /> :
      userPaymentHistory?.length > 0 ?
        <div className={user.paymentHistory}>
          {userPaymentHistory.map((payment, index)=>
            <ul key={index}>
              <li>
                <span className={user.paymentDate}>{new Date(payment.created_at).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <a href={payment.invoice} target= "_blank" rel="noreferrer" className={user.paymentReciept}>view receipt</a>
              </li>
            </ul>
          )}
        </div> :
        <>No Payment History Available</>
  );
};

export default PaymentHistory;
