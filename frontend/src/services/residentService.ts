const API_URL = "http://localhost:5000/api/residents";

export interface ResidentFilters {
  search?: string;
  gender?: string;
  purok?: string;
  is_active?: string;
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

export const getResidentById = async (id: number | string) => {
  const response = await fetch(`${API_URL}/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch resident."
    );
  }

  return data;
};