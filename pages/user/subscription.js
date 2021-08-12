import withPrivateRoute from "../../components/withPrivateRoute";
import user from "../../styles/User.module.scss";

function Subscription() {
  return (
    <div className={'userContent '+user.subscription}>
      <div className={user.subscriptionWrapper}>
        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Commercial Monthly Music SFX Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>72</span>
              </p>
              <p className={user.period}>per month</p>
            </div>
          </div>
        </a>

        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Commercial Monthly Music Only Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>59</span>
              </p>
              <p className={user.period}>per month</p>
            </div>
          </div>
        </a>

        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Commercial Annual Music SFX Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>549</span>
              </p>
              <p className={user.period}>per year</p>
            </div>
          </div>
        </a>

        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Commercial Annual Music Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>399</span>
              </p>
              <p className={user.period}>per year</p>
            </div>
          </div>
        </a>

        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Personal Monthly Music SFX Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>25</span>
              </p>
              <p className={user.period}>per month</p>
            </div>
          </div>
        </a>

        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Personal Monthly Music Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>15</span>
              </p>
              <p className={user.period}>per month</p>
            </div>
          </div>
        </a>

        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Personal Annual Music SFX Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>199</span>
              </p>
              <p className={user.period}>per year</p>
            </div>
          </div>
        </a>

        <a href="">
          <div className={user.licenceSubscription}>
            <div className={user.title}>Personal Annual Music Subscription</div>
            <div className={user.priceLabel}>
              <p className={user.price}>
                <small>$</small>
                <span>120</span>
              </p>
              <p className={user.period}>per year</p>
            </div>
          </div>
        </a>

      </div>
    </div>
  );
}

export default withPrivateRoute(Subscription);