import { useEffect, useState } from "react";

import Header from "../components/Header";

import { getDashboardStats } from "../services/adminDashboardService";
import type { DashboardStats } from "../services/adminDashboardService";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <>
      <Header />

      <main
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        <header
          style={{
            marginBottom: "32px",
          }}
        >
          <h1>Barangay e-Services Admin Dashboard</h1>

          <p>
            Manage applications, residents, certificates,
            reports, and barangay services from one place.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div className="dashboard-card">
            <h3>Total Applications</h3>
            <h2>
              {loading ? "..." : stats.totalApplications}
            </h2>
          </div>

          <div className="dashboard-card">
            <h3>Pending</h3>
            <h2>{loading ? "..." : stats.pending}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Under Review</h3>
            <h2>{loading ? "..." : stats.underReview}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Approved</h3>
            <h2>{loading ? "..." : stats.approved}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Rejected</h3>
            <h2>{loading ? "..." : stats.rejected}</h2>
          </div>
        </section>

        <section
          style={{
            marginBottom: "32px",
          }}
        >
          <h2>Universal Search</h2>

          <input
            type="text"
            placeholder="Search applications, residents, certificates, reports..."
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
            }}
          />
        </section>

        <section
          style={{
            marginBottom: "32px",
          }}
        >
          <h2>Quick Actions</h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button>Applications</button>
            <button>Residents</button>
            <button>Certificates</button>
            <button>Reports</button>
            <button>Activity Logs</button>
          </div>
        </section>

        <section>
          <h2>Recent Applications</h2>

          <p>No recent applications available.</p>
        </section>
      </main>
    </>
  );
}