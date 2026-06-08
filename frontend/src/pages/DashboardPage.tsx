import Header from "../components/Header";

function DashboardPage() {
  return (
    <>
      <Header />

      <main>
        <h2>Resident Dashboard</h2>

        <section>
          <h3>Welcome to Barangay E-Service Portal</h3>

          <p>
            Manage your Barangay Clearance applications and track their status.
          </p>
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