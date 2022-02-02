import withPrivateRoute from "../../components/withPrivateRoute";
import signup from "../../styles/Signup.module.scss";

function Subscription() {
  return (
    <div className={signup.editSubscription}>
      <div className={signup.billingFrequency}>
        <span>Billing Frequency</span>
        <div className={signup.toggleButton}>
          <input id="toggle-on" className={signup.toggle+" "+signup.toggleLeft} name="toggle" value="false" type="radio" checked/>
          <label htmlFor="toggle-on" className={signup.btn}>Monthly</label>
          <input id="toggle-off" className={signup.toggle+" "+signup.toggleRight} name="toggle" value="true" type="radio"/>
          <label htmlFor="toggle-off" className={signup.btn}>Annually</label>
        </div>
        <em>Save 33% with annual billing</em>
      </div>
    </div>
  );
}

export default withPrivateRoute(Subscription);