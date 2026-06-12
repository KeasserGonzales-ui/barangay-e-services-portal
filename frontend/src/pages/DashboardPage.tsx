import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import { getUser, logout } from "../utils/auth";

function DashboardPage() {
  const navigate = useNavigate();

  const user = getUser();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <Header />

      <main>
        <h2>Resident Dashboard</h2>

        <section>
          <h3>
            Welcome{" "}
            {user?.email ?? "Resident"}
          </h3>

          <p>
            Manage your Barangay Clearance
            applications and track their
            status.
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role ?? "resident"}
          </p>

          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </section>

        <section>
          <h3>Quick Actions</h3>

          <ul>
            <li>Apply for Barangay Clearance</li>
            <li>Track Application Status</li>
            <li>Update Resident Profile</li>
          </ul>
        </section>

        <section>
          <h3>Recent Applications</h3>

          <p>No applications submitted yet.</p>
        </section>
      </main>
    </>
  );
}

export default DashboardPage;