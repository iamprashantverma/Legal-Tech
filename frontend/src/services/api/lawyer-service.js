import api from "../api/axios";

// Fetch all cases for the logged-in lawyer
export const getAllCases = async () => {
  return api.get("/lawyer");
};

// Fetch logged-in lawyer profile
export const getMyProfile = async () => {
  return api.get("/lawyer/me");
};

// Fetch case details by case ID
export const getCaseById = async (caseId) => {
  return api.get(`/lawyer/${caseId}`);
};

// Fetch pending intakes with pagination
export const getPendingIntakes = async ({ page = 1, limit = 6 } = {}) => {
  return api.get("/lawyer/intakes", {
    params: {
      page,
      limit,
    },
  });
};

// Add review/comment for a specific intake
export const addReview = async (intakeId, review) => {
  return api.post(`/lawyer/intakes/${intakeId}/comment`, review);
};

export const getIntakeById = async (id) => {
  return api.get(`/lawyer/intakes/${id}`);
};
