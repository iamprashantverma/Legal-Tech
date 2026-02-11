import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { getAuditLogs } from "../../services/api/admin-service";
import AuditLogItem from "./AuditLogItem";
import Pagination from "../common/Pagination";

const PAGE_SIZE = 5;

const AuditLogList = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAuditLogs = async (pageNumber) => {
    setLoading(true);
    try {
      const resp = await getAuditLogs({ page: pageNumber, limit: PAGE_SIZE });
      setLogs(resp.data.data);
      setTotalPages(resp.data.pagination.totalPages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchAuditLogs(page);
  }, [page, isAuthenticated]);

  return (
    <div className="audit-log-list">
      <h2 className="audit-log-list__title">Audit Logs</h2>

      <div
        className={`audit-log-list__items ${
          loading ? "audit-log-list__items--loading" : ""
        }`}
      >
        {logs.length === 0 && !loading && (
          <p className="audit-log-list__empty">No audit logs found</p>
        )}

        {logs.map((log) => (
          <AuditLogItem key={log.id} log={log} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        disabled={loading}
      />
    </div>
  );
};

export default AuditLogList;
