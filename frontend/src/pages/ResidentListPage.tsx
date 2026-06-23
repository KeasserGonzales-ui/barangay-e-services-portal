import { useEffect, useState } from "react";

import ResidentFilters from "../components/ResidentFilters";
import ResidentForm from "../components/ResidentForm";
import ResidentModal from "../components/ResidentModal";
import ResidentStatisticsCards from "../components/ResidentStatisticsCards";
import ResidentTable from "../components/ResidentTable";

import {
  getAllResidents,
  getResidentStatistics,
  getResidentById,
  createResident,
  updateResident,
  activateResident,
  deactivateResident,
  deleteResident,
  type ResidentPayload,
  type ResidentStatistics,
} from "../services/residentService";

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [statistics, setStatistics] =
    useState<ResidentStatistics>({
      totalResidents: 0,
      activeResidents: 0,
      inactiveResidents: 0,
      maleResidents: 0,
      femaleResidents: 0,
    });

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [purok, setPurok] = useState("");
  const [isActive, setIsActive] = useState("");

  const [selectedResidentId, setSelectedResidentId] =
    useState<number | null>(null);

  const [selectedResident, setSelectedResident] =
    useState<ResidentPayload | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const loadStatistics = async () => {
    try {
      const data = await getResidentStatistics();
      setStatistics(data);
    } catch (error) {
      console.error(
        "Failed to load resident statistics:",
        error
      );
    }
  };

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

      await loadStatistics();
    } catch (error) {
      console.error("Failed to load residents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResidents();
  }, [search, gender, purok, isActive]);
    const handleEditResident = async (
    residentId: number
  ) => {
    try {
      setSelectedResidentId(residentId);

      const response = await getResidentById(
        residentId
      );

      setSelectedResident(response.data);
      setIsEditOpen(true);
    } catch (error) {
      console.error(
        "Failed to load resident:",
        error
      );
    }
  };

  const handleViewResident = async (
    residentId: number
  ) => {
    try {
      const response = await getResidentById(
        residentId
      );

      setSelectedResident(response.data);
      setIsViewOpen(true);
    } catch (error) {
      console.error(
        "Failed to load resident:",
        error
      );
    }
  };

  const handleActivateResident = async (
    residentId: number
  ) => {
    try {
      await activateResident(residentId);

      await loadResidents();

      alert("Resident activated successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to activate resident.");
    }
  };

  const handleDeactivateResident = async (
    residentId: number
  ) => {
    try {
      await deactivateResident(residentId);

      await loadResidents();

      alert("Resident deactivated successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to deactivate resident.");
    }
  };

  const handleDeleteResident = async (
    residentId: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this resident?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteResident(residentId);

      await loadResidents();

      alert("Resident deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete resident.");
    }
  };

  const closeModal = () => {
    setIsEditOpen(false);
    setSelectedResident(null);
    setSelectedResidentId(null);
  };

  const handleUpdateResident = async (
    data: ResidentPayload
  ) => {
    if (selectedResidentId === null) {
      return;
    }

    try {
      setSaving(true);

      await updateResident(
        selectedResidentId,
        data
      );

      await loadResidents();

      closeModal();

      alert("Resident updated successfully.");
    } catch (error) {
      console.error(
        "Failed to update resident:",
        error
      );

      alert("Failed to update resident.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateResident = async (
    data: ResidentPayload
  ) => {
    try {
      setSaving(true);

      await createResident(data);

      await loadResidents();

      setIsCreateMode(false);

      alert("Resident created successfully.");
    } catch (error) {
      console.error(
        "Failed to create resident:",
        error
      );

      alert("Failed to create resident.");
    } finally {
      setSaving(false);
    }
  };
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
          Universal search for Resident Code,
          Name, Contact Number,
          Gender, Purok and Status.
        </p>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            onClick={() => setIsCreateMode(true)}
            style={{
              padding: "10px 18px",
              cursor: "pointer",
            }}
          >
            + Create Resident
          </button>
        </div>
      </header>

      <ResidentStatisticsCards
        statistics={statistics}
      />

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

      <section style={{ marginBottom: "32px" }}>
        <ResidentTable
          residents={residents}
          loading={loading}
          onEdit={handleEditResident}
          onView={handleViewResident}
          onActivate={handleActivateResident}
          onDeactivate={handleDeactivateResident}
          onDelete={handleDeleteResident}
        />
      </section>

      <ResidentModal
        open={isCreateMode}
        title="Create Resident"
        onClose={() => setIsCreateMode(false)}
      >
        <ResidentForm
          onSubmit={handleCreateResident}
          loading={saving}
          submitLabel="Create Resident"
        />
      </ResidentModal>

      <ResidentModal
        open={isEditOpen}
        title="Edit Resident"
        onClose={closeModal}
      >
        {selectedResident && (
          <ResidentForm
            initialData={selectedResident}
            onSubmit={handleUpdateResident}
            loading={saving}
            submitLabel="Update Resident"
          />
        )}
      </ResidentModal>

      <ResidentModal
        open={isViewOpen}
        title="Resident Information"
        onClose={() => setIsViewOpen(false)}
      >
        {selectedResident && (
          <div
            style={{
              display: "grid",
              gap: "10px",
              lineHeight: 1.7,
            }}
          >
            <div>
              <strong>First Name:</strong>{" "}
              {selectedResident.first_name}
            </div>

            <div>
              <strong>Middle Name:</strong>{" "}
              {selectedResident.middle_name || "-"}
            </div>

            <div>
              <strong>Last Name:</strong>{" "}
              {selectedResident.last_name}
            </div>

            <div>
              <strong>Suffix:</strong>{" "}
              {selectedResident.suffix || "-"}
            </div>

            <div>
              <strong>Birthdate:</strong>{" "}
              {selectedResident.birthdate || "-"}
            </div>

            <div>
              <strong>Gender:</strong>{" "}
              {selectedResident.gender || "-"}
            </div>

            <div>
              <strong>Civil Status:</strong>{" "}
              {selectedResident.civil_status || "-"}
            </div>

            <div>
              <strong>Contact:</strong>{" "}
              {selectedResident.contact_number || "-"}
            </div>

            <div>
              <strong>House No.:</strong>{" "}
              {selectedResident.house_no || "-"}
            </div>

            <div>
              <strong>Street:</strong>{" "}
              {selectedResident.street || "-"}
            </div>

            <div>
              <strong>Purok:</strong>{" "}
              {selectedResident.purok || "-"}
            </div>

            <div>
              <strong>Barangay:</strong>{" "}
              {selectedResident.barangay || "-"}
            </div>

            <div>
              <strong>City:</strong>{" "}
              {selectedResident.city || "-"}
            </div>
          </div>
        )}
      </ResidentModal>
    </main>
  );
}