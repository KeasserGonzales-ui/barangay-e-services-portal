interface ResidentFiltersProps {
  search: string;
  gender: string;
  purok: string;
  isActive: string;
  onSearchChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onPurokChange: (value: string) => void;
  onIsActiveChange: (value: string) => void;
}

export default function ResidentFilters({
  search,
  gender,
  purok,
  isActive,
  onSearchChange,
  onGenderChange,
  onPurokChange,
  onIsActiveChange,
}: ResidentFiltersProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      <input
        type="text"
        placeholder="Search resident..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        value={gender}
        onChange={(e) => onGenderChange(e.target.value)}
      >
        <option value="">All Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="text"
        placeholder="Purok"
        value={purok}
        onChange={(e) => onPurokChange(e.target.value)}
      />

      <select
        value={isActive}
        onChange={(e) => onIsActiveChange(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="1">Active</option>
        <option value="0">Inactive</option>
      </select>
    </div>
  );
}