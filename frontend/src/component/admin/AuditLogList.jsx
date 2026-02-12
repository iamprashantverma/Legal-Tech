import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { getAuditLogs } from "../../services/api/admin-service";
import AuditLogItem from "./AuditLogItem";
import Loading from "../common/Loading";
import EmptyState from "../common/EmptyState";
import { FaClipboardList } from "react-icons/fa";

const AuditLogList = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const resp = await getAuditLogs({ limit: 1000 }); // Get all logs
      setLogs(resp.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchAuditLogs();
  }, [isAuthenticated]);

  if (loading && logs.length === 0) {
    return <Loading text="Loading audit logs..." />;
  }

  return (
    <div className="audit-log-list">
      {logs.length === 0 && !loading ? (
        <EmptyState
          icon={FaClipboardList}
          title="No audit logs found"
          description="There are no audit logs to display at the moment."
        />
      ) : (
        <div className={`audit-log-list__items ${loading ? "audit-log-list__items--loading" : ""}`}>
          {logs.map((log) => (
            <AuditLogItem key={log.id} log={log} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditLogList;
