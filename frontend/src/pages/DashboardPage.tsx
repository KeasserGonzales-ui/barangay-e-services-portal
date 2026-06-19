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

      <main className="dashboard-page">
        <div className="dashboard-container">
          <h2>Resident Dashboard</h2>

          <section className="dashboard-card">
            <h3>Welcome, {user?.email ?? "Resident"}</h3>

            <p>
              Manage your Barangay Clearance applications and
              track their status.
            </p>

            <hr />

            <h4>Resident Information</h4>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email ?? "Not Available"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user?.role ?? "resident"}
            </p>

            <p>
              <strong>Account Status:</strong> Active
            </p>

            <button
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </section>

          <section className="dashboard-card">
            <h3>Quick Actions</h3>

            <ul>
              <li>Apply for Barangay Clearance</li>
              <li>Track Application Status</li>
              <li>Update Resident Profile</li>
            </ul>
          </section>

          <section className="dashboard-card">
            <h3>Recent Applications</h3>

            <p>No applications submitted yet.</p>
          </section>
        </div>
      </main>
    </>
  );
}

export default DashboardPage;