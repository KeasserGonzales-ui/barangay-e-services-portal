import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";

import type { ResidentPayload } from "../services/residentService";

interface ResidentFormProps {
  initialData?: ResidentPayload;
  onSubmit: (data: ResidentPayload) => Promise<void>;
  loading?: boolean;
  submitLabel?: string;
}

const emptyForm: ResidentPayload = {
  first_name: "",
  middle_name: "",
  last_name: "",
  suffix: "",
  birthdate: "",
  gender: "",
  civil_status: "",
  house_no: "",
  street: "",
  purok: "",
  barangay: "",
  city: "",
  contact_number: "",
};

const ResidentForm = ({
  initialData,
  onSubmit,
  loading = false,
  submitLabel = "Save Resident",
}: ResidentFormProps) => {
  const [formData, setFormData] =
    useState<ResidentPayload>(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...emptyForm,
        ...initialData,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="first_name"
        placeholder="First Name *"
        value={formData.first_name}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="middle_name"
        placeholder="Middle Name"
        value={formData.middle_name ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="last_name"
        placeholder="Last Name *"
        value={formData.last_name}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="suffix"
        placeholder="Suffix"
        value={formData.suffix ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="date"
        name="birthdate"
        value={formData.birthdate ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <select
        name="gender"
        value={formData.gender ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <input
        type="text"
        name="civil_status"
        placeholder="Civil Status"
        value={formData.civil_status ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="house_no"
        placeholder="House No."
        value={formData.house_no ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={formData.street ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="purok"
        placeholder="Purok"
        value={formData.purok ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="barangay"
        placeholder="Barangay"
        value={formData.barangay ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <input
        type="text"
        name="contact_number"
        placeholder="Contact Number"
        value={formData.contact_number ?? ""}
        onChange={handleChange}
        className="w-full rounded-lg border p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default ResidentForm;