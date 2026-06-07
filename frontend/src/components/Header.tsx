import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <h1>🏛 Barangay E-Service Portal</h1>
        <p>Online Barangay Clearance Application</p>
      </div>

      <nav className="nav-links" aria-label="Main Navigation">
        <Link to="/">Home</Link>
        <Link to="/apply">Apply Clearance</Link>
        <Link to="/track-status">Track Status</Link>
      </nav>
    </header>
  );
}

export default Header;