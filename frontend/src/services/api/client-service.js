import api from "./axios";

// Get logged-in client profile
export const getMyProfile = async () => {
  return api.get("/client/me");
};

// Create new intake
export const createIntake = async (formData) => {
  return api.post("/client/intake", formData);
};

// Get intakes of logged-in client
export const getMyIntakes = ({ status, page = 1, limit = 6 } = {}) => {
  return api.get("/client/intakes", {
    params: {
      status,
      page,
      limit,
    },
  });
};

// Get cases of logged-in client
export const getMyCases = () => {
  // to be implemented
};

// Get intake by ID
export const getIntakeById = async (id) => {
  return api.get(`/client/intakes/${id}`);
};


