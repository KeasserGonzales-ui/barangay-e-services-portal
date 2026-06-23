import { useEffect, useState } from "react";

import AdminApplicationFilters from "../components/admin/AdminApplicationFilters";
import AdminApplicationTable from "../components/admin/AdminApplicationTable";

import { getAllApplications } from "../services/adminApplicationService";

interface Application {
  id: number;
  reference_number: string;
  applicant_name: string;
  service_type: string;
  status: string;
  created_at: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);

      const response = await getAllApplications({
        search,
        status,
        service,
      });

      setApplications(response.data || []);
    } catch (error) {
      console.error("Failed to load applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [search, status, service]);

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <header style={{ marginBottom: "24px" }}>
        <h1>Admin Applications</h1>

        <p>
          Universal Search for Reference Number, Applicant Name,
          Contact Number, Address, Purpose, Remarks, Service Type,
          Status, and Date Created.
        </p>
      </header>

      <section style={{ marginBottom: "24px" }}>
        <AdminApplicationFilters
          search={search}
          status={status}
          service={service}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onServiceChange={setService}
        />
      </section>

      <section>
        <AdminApplicationTable
          applications={applications}
          loading={loading}
        />
      </section>
    </main>
  );
}