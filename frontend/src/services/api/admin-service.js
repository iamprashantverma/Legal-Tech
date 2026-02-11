import api from "./axios";

export const getAuditLogs = async (params = {}) => {
  return api.get("/admin/audit-logs", {
    params,
  });
};