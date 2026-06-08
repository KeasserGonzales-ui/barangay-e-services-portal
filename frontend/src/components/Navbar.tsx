import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Barangay e-Services</h2>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/apply">Apply</Link>
        </li>

        <li>
          <Link to="/track-status">Track Status</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;