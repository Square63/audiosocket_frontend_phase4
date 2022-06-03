import user from "../../styles/User.module.scss";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'next/image';
import masterCard from '../../images/mastercard.svg';
import visaCard from '../../images/visaCard.svg';
import Link from "next/link";

function Billing() {
  return (
    <div className={user.billingInfo}>
      <div className={user.cardInfoWrapper}>
        <div className={user.cardInfo}>
          <div className={user.cardPlate}>
            <Image src={masterCard} alt="Card Name"/>
            <Image src={visaCard} alt="Card Name"/>
          </div>
          <div className={user.cardText}>
            <span className={user.cardNumber}>Ending in 5726</span>
            <span className={user.cardRank}>Mastercard</span>
          </div>
        </div>
        <OverlayTrigger overlay={<Tooltip>Edit Payment Mode</Tooltip>}>
          <a href="javascript:void(0)" className={user.editpaymentMode}>&nbsp;</a>
        </OverlayTrigger>
      </div>
      <div className={user.anotherWay}>
        <a href="javascript:void(0);">Choose another way to pay</a>
      </div>
    </div>
  );
}

export default Billing;
