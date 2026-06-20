interface ResidentTableProps {
  residents: {
    id: number;
    resident_code: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    gender: string;
    contact_number: string;
    purok: string;
    is_active: number;
  }[];
  loading: boolean;
}

export default function ResidentTable({
  residents,
  loading,
}: ResidentTableProps) {
  if (loading) {
    return <p>Loading residents...</p>;
  }

  if (residents.length === 0) {
    return <p>No residents found.</p>;
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th align="left">Resident Code</th>
          <th align="left">Full Name</th>
          <th align="left">Gender</th>
          <th align="left">Contact Number</th>
          <th align="left">Purok</th>
          <th align="left">Status</th>
        </tr>
      </thead>

      <tbody>
        {residents.map((resident) => (
          <tr key={resident.id}>
            <td>{resident.resident_code}</td>

            <td>
              {[
                resident.first_name,
                resident.middle_name,
                resident.last_name,
                resident.suffix,
              ]
                .filter(Boolean)
                .join(" ")}
            </td>

            <td>{resident.gender || "-"}</td>

            <td>{resident.contact_number || "-"}</td>

            <td>{resident.purok || "-"}</td>

            <td>
              {resident.is_active ? (
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Active
                </span>
              ) : (
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Inactive
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}