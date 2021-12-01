import user from "../../styles/User.module.scss";
import Link from "next/link";

function Billing() {
  return (
    <div className={"userContent " + user.userAccount}>
      <h1>Billing</h1>
      <p>
        {" "}
        You are not subscribed yet. Please, subscribe{" "}
        <Link href="/user/subscription">here</Link>.
      </p>
    </div>
  );
}

export default Billing;
