const API_BASE_URL = "http://localhost:5000/api/admin";

export interface DashboardStats {
  totalApplications: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export interface RecentApplication {
  id: number;
  reference_number: string;
  applicant_name: string;
  service_type: string;
  status: string;
  created_at: string;
}

export const getDashboardStats =
  async (): Promise<DashboardStats> => {
    const response = await fetch(
      `${API_BASE_URL}/dashboard`
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to load dashboard statistics."
      );
    }

    return result.data;
  };

export const getRecentApplications = async (): Promise<
  RecentApplication[]
> => {
  const response = await fetch(
    `${API_BASE_URL}/applications`
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to load recent applications."
    );
  }

  return (result.data || []).slice(0, 5);
};