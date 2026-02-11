import React from "react";
import { useNavigate } from "react-router-dom";

const AuditLogItem = ({ log }) => {
  const navigate = useNavigate();

  const goToDetails = (e) => {
    e.stopPropagation();
    navigate(`/admin/audit-logs/${log.entity.type}/${log.entity.id}`);
  };

  return (
    <div
      className="audit-log-item"
      onClick={() => navigate(`/audit-logs/${log.id}`)}
    >
      <span
        className={`audit-log-item__action audit-log-item__action--${log.action.toLowerCase()}`}
      >
        {log.action}
      </span>

      <span className="audit-log-item__entity">
        {log.entity?.type} #{log.entity?.id}
      </span>

      <span className="audit-log-item__timestamp">
        {new Date(log.timestamp).toLocaleString()}
      </span>

      <span className="audit-log-item__request-id">
        {log.requestId || "__"}
      </span>

      <button className="audit-log-item__view-btn" onClick={goToDetails}>
        View Details
      </button>
    </div>
  );
};

export default AuditLogItem;
