import Link from "next/link";

function custom404() {
  return (
    <div className="fourOhFour">
      <div className="inner404">
        <p className="errorCode">ERROR CODE: 404</p>
        <h1>Page not found</h1>
        <p className="errorMsg">The page you are looking for does not exist.</p>
        <Link href="/">
          <a className="btn btnMainLarge">Go to homepage</a>
        </Link>
      </div>
    </div>
  );
}

export default custom404;
