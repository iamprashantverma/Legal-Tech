import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAuditLogs } from "../../services/api/admin-service";
import AuditState from "./AuditState";
import Loading from "../common/Loading";

const AuditLogDetails = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { entityType, entityId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchAudit = async () => {
      try {
        setLoading(true);
        const resp = await getAuditLogs({ entityType, entityId });
        setAuditData(resp.data.data?.[0] || null);
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [isAuthenticated, entityType, entityId, navigate]);

  const handleBack = () => {
    navigate("/admin/audit-logs");
  };

  if (loading) return <Loading text="Loading audit log details..." />;
  if (!auditData) return <div className="state">No audit log found</div>;

  return (
    <div className="audit-ui">

      <div className="audit-ui__header">
        <div>
          <h2>Audit Log #{auditData.id}</h2>
          <span className={`audit-ui__action audit-ui__action--${auditData.action.toLowerCase()}`}>
            {auditData.action}
          </span>
        </div>
        <button className="btn-light" onClick={handleBack}>
          Back to List
        </button>
      </div>

      <div className="audit-ui__grid">

        <div className="audit-card">
          <h3>Entity</h3>
          <p><strong>Type:</strong> {auditData.entity.type}</p>
          <p><strong>ID:</strong> {auditData.entity.id}</p>
        </div>

        <div className="audit-card">
          <h3>Actor</h3>
          <p><strong>Role:</strong> {auditData.actor.role}</p>
          <p><strong>ID:</strong> {auditData.actor.id}</p>
        </div>

        <div className="audit-card">
          <h3>Request</h3>
          <p><strong>Timestamp:</strong> {new Date(auditData.timestamp).toLocaleString()}</p>
          <p><strong>IP:</strong> {auditData.metadata.ip}</p>
        </div>

      </div>

      <div className="audit-ui__state-wrapper">

        <div className="audit-ui__state before">
          <h3>Before</h3>
          <AuditState data={auditData.beforeState} />
        </div>

        <div className="audit-ui__state after">
          <h3>After</h3>
          <AuditState data={auditData.afterState} />
        </div>

      </div>

    </div>
  );
};

export default AuditLogDetails;
