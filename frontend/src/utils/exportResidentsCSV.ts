export interface ResidentExportData {
  resident_code: string | null;
  first_name: string;
  middle_name: string;
  last_name: string;
  suffix: string;
  gender: string;
  purok: string;
  contact_number: string;
  is_active: number;
}

export const exportResidentsCSV = (
  residents: ResidentExportData[]
) => {
  if (residents.length === 0) {
    alert("No residents available to export.");
    return;
  }

  const headers = [
    "Resident Code",
    "Full Name",
    "Gender",
    "Purok",
    "Contact Number",
    "Status",
  ];

  const rows = residents.map((resident) => [
    resident.resident_code ?? "",
    [
      resident.first_name,
      resident.middle_name,
      resident.last_name,
      resident.suffix,
    ]
      .filter(Boolean)
      .join(" "),
    resident.gender,
    resident.purok,
    resident.contact_number,
    resident.is_active ? "Active" : "Inactive",
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "")}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob(
    ["\uFEFF" + csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  const today = new Date()
    .toISOString()
    .split("T")[0];

  link.href = url;
  link.download = `residents-${today}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};