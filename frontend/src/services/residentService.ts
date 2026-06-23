const API_URL = "http://localhost:5000/api/residents";

export interface ResidentFilters {
  search?: string;
  gender?: string;
  purok?: string;
  is_active?: string;
}

export interface ResidentPayload {
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  birthdate?: string;
  gender?: string;
  civil_status?: string;
  house_no?: string;
  street?: string;
  purok?: string;
  barangay?: string;
  city?: string;
  contact_number?: string;
}

export interface ResidentStatistics {
  totalResidents: number;
  activeResidents: number;
  inactiveResidents: number;
  maleResidents: number;
  femaleResidents: number;
}

export const getAllResidents = async (
  filters: ResidentFilters = {}
) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.gender) {
    params.append("gender", filters.gender);
  }

  if (filters.purok) {
    params.append("purok", filters.purok);
  }

  if (filters.is_active) {
    params.append("is_active", filters.is_active);
  }

  const response = await fetch(
    `${API_URL}/list?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch residents."
    );
  }

  return data;
};

export const getResidentStatistics = async (): Promise<ResidentStatistics> => {
  const response = await fetch(`${API_URL}/statistics`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch resident statistics."
    );
  }

  return data.data;
};

export const getResidentById = async (
  id: number | string
) => {
  const response = await fetch(`${API_URL}/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch resident."
    );
  }

  return data;
};

export const createResident = async (
  payload: ResidentPayload
) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create resident."
    );
  }

  return data;
};

export const updateResident = async (
  id: number | string,
  payload: ResidentPayload
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update resident."
    );
  }

  return data;
};

export const activateResident = async (
  id: number | string
) => {
  const response = await fetch(
    `${API_URL}/${id}/activate`,
    {
      method: "PATCH",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to activate resident."
    );
  }

  return data;
};

export const deactivateResident = async (
  id: number | string
) => {
  const response = await fetch(
    `${API_URL}/${id}/deactivate`,
    {
      method: "PATCH",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to deactivate resident."
    );
  }

  return data;
};

export const deleteResident = async (
  id: number | string
) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete resident."
    );
  }

  return data;
};