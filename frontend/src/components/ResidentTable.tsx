interface Resident {
  id: number;
  resident_code: string | null;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  gender: string;
  contact_number: string;
  purok: string;
  is_active: number;
}

interface ResidentTableProps {
  residents: Resident[];
  loading: boolean;
}

const ResidentTable = ({
  residents,
  loading,
}: ResidentTableProps) => {
  if (loading) {
    return <p>Loading residents...</p>;
  }

  if (residents.length === 0) {
    return <p>No residents found.</p>;
  }

  return (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f3f4f6",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "12px" }}>Resident Code</th>
            <th style={{ padding: "12px" }}>Full Name</th>
            <th style={{ padding: "12px" }}>Gender</th>
            <th style={{ padding: "12px" }}>Purok</th>
            <th style={{ padding: "12px" }}>Contact</th>
            <th style={{ padding: "12px" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {residents.map((resident) => (
            <tr
              key={resident.id}
              style={{
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <td style={{ padding: "12px" }}>
                {resident.resident_code ?? "-"}
              </td>

              <td style={{ padding: "12px" }}>
                {[
                  resident.first_name,
                  resident.middle_name,
                  resident.last_name,
                  resident.suffix,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </td>

              <td style={{ padding: "12px" }}>
                {resident.gender || "-"}
              </td>

              <td style={{ padding: "12px" }}>
                {resident.purok || "-"}
              </td>

              <td style={{ padding: "12px" }}>
                {resident.contact_number || "-"}
              </td>

              <td style={{ padding: "12px" }}>
                {resident.is_active ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResidentTable;