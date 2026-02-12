import React from "react";
import { useNavigate } from "react-router-dom";

const AuditLogItem = ({ log }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/admin/audit-logs/${log.entity.type}/${log.entity.id}`);
  };

  return (
    <div className="audit-log-item" onClick={goToDetails}>
      <div className="audit-log-item__header">
        <span className="audit-log-item__id">Log #{log.id}</span>
        <span className={`audit-log-item__action audit-log-item__action--${log.action.toLowerCase()}`}>
          {log.action}
        </span>
      </div>

      <div className="audit-log-item__body">
        <div className="audit-log-item__row">
          <strong>Entity:</strong>
          <span>{log.entity?.type} #{log.entity?.id}</span>
        </div>

        <div className="audit-log-item__row">
          <strong>Actor:</strong>
          <span>{log.actor?.role} #{log.actor?.id}</span>
        </div>

        {log.requestId && (
          <div className="audit-log-item__row">
            <strong>Request ID:</strong>
            <span>{log.requestId}</span>
          </div>
        )}
      </div>

      <div className="audit-log-item__timestamp">
        {new Date(log.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default AuditLogItem;
