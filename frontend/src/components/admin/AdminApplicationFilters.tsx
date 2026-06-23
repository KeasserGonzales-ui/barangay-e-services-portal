interface AdminApplicationFiltersProps {
  search: string;
  status: string;
  service: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onServiceChange: (value: string) => void;
}

export default function AdminApplicationFilters({
  search,
  status,
  service,
  onSearchChange,
  onStatusChange,
  onServiceChange,
}: AdminApplicationFiltersProps) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        padding: "20px",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ margin: 0 }}>Universal Application Search</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search Reference Number, Applicant Name, Contact Number, Address, Purpose, Remarks, Service Type, Status or Date..."
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          width: "100%",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            minWidth: "180px",
          }}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={service}
          onChange={(e) => onServiceChange(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            minWidth: "220px",
          }}
        >
          <option value="">All Services</option>

          <option value="Barangay Clearance">
            Barangay Clearance
          </option>

          <option value="Certificate of Residency">
            Certificate of Residency
          </option>

          <option value="Business Clearance">
            Business Clearance
          </option>
        </select>
      </div>

      <small style={{ color: "#6b7280" }}>
        Universal Search supports:
        <br />
        ✓ Reference Number
        <br />
        ✓ Applicant Name
        <br />
        ✓ Contact Number
        <br />
        ✓ Address
        <br />
        ✓ Purpose
        <br />
        ✓ Remarks
        <br />
        ✓ Service Type
        <br />
        ✓ Status
        <br />
        ✓ Date Created
      </small>
    </section>
  );
}