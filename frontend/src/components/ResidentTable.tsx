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
  onEdit: (residentId: number) => void;
  onView: (residentId: number) => void;
  onActivate: (residentId: number) => void;
  onDeactivate: (residentId: number) => void;
  onDelete: (residentId: number) => void;
}

const ResidentTable = ({
  residents,
  loading,
  onEdit,
  onView,
  onActivate,
  onDeactivate,
  onDelete,
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
            <th
              style={{
                padding: "12px",
                textAlign: "center",
                minWidth: "420px",
              }}
            >
              Actions
            </th>
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
                <span
                  style={{
                    color: resident.is_active ? "#15803d" : "#b91c1c",
                    fontWeight: 600,
                  }}
                >
                  {resident.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td
                style={{
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => onView(resident.id)}
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    👁️ View
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(resident.id)}
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>

                  {resident.is_active ? (
                    <button
                      type="button"
                      onClick={() => onDeactivate(resident.id)}
                      style={{
                        padding: "6px 12px",
                        cursor: "pointer",
                        backgroundColor: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      ⛔ Deactivate
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onActivate(resident.id)}
                      style={{
                        padding: "6px 12px",
                        cursor: "pointer",
                        backgroundColor: "#16a34a",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      ✅ Activate
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onDelete(resident.id)}
                    style={{
                      padding: "6px 12px",
                      cursor: "pointer",
                      backgroundColor: "#991b1b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResidentTable;