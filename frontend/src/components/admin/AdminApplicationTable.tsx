interface AdminApplicationTableProps {
  applications: {
    id: number;
    reference_number: string;
    applicant_name: string;
    service_type: string;
    status: string;
    created_at: string;
  }[];
  loading: boolean;
}

export default function AdminApplicationTable({
  applications,
  loading,
}: AdminApplicationTableProps) {
  if (loading) {
    return <p>Loading applications...</p>;
  }

  if (applications.length === 0) {
    return <p>No applications found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Reference No.</th>
          <th>Applicant</th>
          <th>Service</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {applications.map((application) => (
          <tr key={application.id}>
            <td>{application.reference_number}</td>
            <td>{application.applicant_name}</td>
            <td>{application.service_type}</td>
            <td>{application.status}</td>
            <td>{application.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}