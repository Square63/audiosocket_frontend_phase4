import Link from "next/link";

function Header() {
  return (
    <div className="nav">
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/login">Login</Link></li>
      </ul>
    </div>
  );
 }

 export default Header;