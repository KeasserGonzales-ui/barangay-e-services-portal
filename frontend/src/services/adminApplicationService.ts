const API_URL = "http://localhost:5000/api/admin/applications";

export interface ApplicationFilters {
  search?: string;
  status?: string;
  service?: string;
}

export const getAllApplications = async (
  filters: ApplicationFilters = {}
) => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.status) {
    params.append("status", filters.status);
  }

  if (filters.service) {
    params.append("service", filters.service);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch applications.");
  }

  return data;
};