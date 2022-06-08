import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";
import Link from "next/link";
import BillinSection from "../../components/profile/Billing";
import PaymentHistory from "../../components/profile/PaymentHistory";

function Billing() {
  return (
    <div className="boxDivision">
      <div className="boxColumn">
        <div className="boxWithShadow">
          <div className="boxHeading">
            Billing Info
          </div>
            <BillinSection />
        </div>          
      </div>
      
      <div className="boxColumn">
        <div className="boxWithShadow paymentHistoryWrapper">
          <div className="boxHeading">
            Payment History
          </div>
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
}

export default withPrivateRoute(Billing);