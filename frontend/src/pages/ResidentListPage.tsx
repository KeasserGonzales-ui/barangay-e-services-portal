import { useEffect, useState } from "react";

import ResidentFilters from "../components/ResidentFilters";
import ResidentTable from "../components/ResidentTable";

import { getAllResidents } from "../services/residentService";

interface Resident {
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
}

export default function ResidentListPage() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [purok, setPurok] = useState("");
  const [isActive, setIsActive] = useState("");

  const loadResidents = async () => {
    try {
      setLoading(true);

      const response = await getAllResidents({
        search,
        gender,
        purok,
        is_active: isActive,
      });

      setResidents(response.data || []);
    } catch (error) {
      console.error("Failed to load residents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResidents();
  }, [search, gender, purok, isActive]);

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <header style={{ marginBottom: "24px" }}>
        <h1>Resident Master Data</h1>

        <p>
          Universal search for Resident Code, Name, Contact Number,
          Gender, Purok and Status.
        </p>
      </header>

      <section style={{ marginBottom: "24px" }}>
        <ResidentFilters
          search={search}
          gender={gender}
          purok={purok}
          isActive={isActive}
          onSearchChange={setSearch}
          onGenderChange={setGender}
          onPurokChange={setPurok}
          onIsActiveChange={setIsActive}
        />
      </section>

      <section>
        <ResidentTable
          residents={residents}
          loading={loading}
        />
      </section>
    </main>
  );
}