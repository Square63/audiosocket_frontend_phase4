import user from "../../styles/User.module.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'next/image';
import masterCard from '../../images/mastercard.svg';
import visaCard from '../../images/visaCard.svg';
import paypal from '../../images/paypal.svg';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getPaymentMethod } from "../../redux/actions/authActions";
import InpageLoader from "../InpageLoader";

function Billing() {
  const dispatch = useDispatch();
  const paymentMethod = useSelector(state => state.user.payment_details);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
    if (!paymentMethod) {

      dispatch(getPaymentMethod())
    } else {
      
    }
  }, [paymentMethod]);

  return (
    <>
      {
        paymentMethod ? (
          <div className={user.billingInfo}>
            <div className={user.cardInfoWrapper}>
              <div className={user.cardInfo}>
                <div className={user.cardPlate}>
                  <Image src={paymentMethod.card_type ? (paymentMethod.card_type === "Visa" ? visaCard : masterCard) : paypal} alt="Card Name"/>
                </div>
                <div className={user.cardText}>
                  <span className={user.cardRank}>{paymentMethod.card_type}</span>
                  {paymentMethod.email ? <span className={user.cardNumber}>{paymentMethod.email}</span> : <span className={user.cardNumber}>Ending in {paymentMethod.last_4}</span>}
                </div>
              </div>
              
                <OverlayTrigger overlay={<Tooltip>Edit Payment Mode</Tooltip>}>
                  <Link href="/updateCard">    
                    <a href="javascript:void(0)" className={user.editpaymentMode}>&nbsp;</a>
                  </Link>
                </OverlayTrigger>
            </div>
            <div className={user.anotherWay}>
              <Link href="/updateCard">
                <a href="javascript:void(0);">Choose another way to pay</a>
              </Link>
            </div>
          </div>
        ) :
          <>No Billing Info Available</>
      }
    </>
    
  );
}

export default Billing;
