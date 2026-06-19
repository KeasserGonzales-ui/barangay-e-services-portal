const API_URL = "http://localhost:5000/api/admin/dashboard";

export interface DashboardStats {
  totalApplications: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await fetch(API_URL);

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to load dashboard statistics."
    );
  }

  return result.data;
};