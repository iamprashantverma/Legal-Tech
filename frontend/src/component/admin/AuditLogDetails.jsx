import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { getAuditLogs } from "../../services/api/admin-service";
import AuditState from "./AuditState";

const AuditLogDetails = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { entityType, entityId } = useParams();
  console.log(entityType,entityId);
  const navigate = useNavigate();

  const [auditData, setAuditData] = useState(null);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchAudit = async () => {
      const resp = await getAuditLogs({
        entityType,
        entityId,
      });

      setAuditData(resp.data.data?.[0] || null);
    };

    fetchAudit();
  }, [isAuthenticated, entityType, entityId, navigate]);

  if (!auditData) return null;

  return (
    <div className="audit">

      <section className="audit__log">
        <h3 className="audit__title">Audit Log</h3>

        <div className="audit__row">
          <span className="label">Action</span>
          <span className="value">{auditData.action}</span>
        </div>

        <div className="audit__row">
          <span className="label">Timestamp</span>
          <span className="value">
            {new Date(auditData.timestamp).toLocaleString()}
          </span>
        </div>

        <div className="audit__row">
          <span className="label">Request ID</span>
          <span className="value">{auditData.requestId || "—"}</span>
        </div>
      </section>

      <section className="audit__entity">
        <h3 className="audit__title">Entity</h3>

        <div className="audit__row">
          <span className="label">Type</span>
          <span className="value">{auditData.entity?.type}</span>
        </div>

        <div className="audit__row">
          <span className="label">ID</span>
          <span className="value">{auditData.entity?.id}</span>
        </div>
      </section>

      <section className="audit__actor">
        <h3 className="audit__title">Actor</h3>

        <div className="audit__row">
          <span className="label">Type</span>
          <span className="value">{auditData.actor?.type}</span>
        </div>

        <div className="audit__row">
          <span className="label">Role</span>
          <span className="value">{auditData.actor?.role || "—"}</span>
        </div>

        <div className="audit__row">
          <span className="label">ID</span>
          <span className="value">{auditData.actor?.id || "—"}</span>
        </div>
      </section>

      <section className="audit__metadata">
        <h3 className="audit__title">Metadata</h3>

        <div className="audit__row">
          <span className="label">IP</span>
          <span className="value">{auditData.metadata?.ip}</span>
        </div>

        <div className="audit__row">
          <span className="label">User Agent</span>
          <span className="value">{auditData.metadata?.userAgent}</span>
        </div>
      </section>

      <section className="audit__state">
        <h3 className="audit__title">Before State</h3>
        {auditData?.beforeState && <AuditState data={auditData.beforeState} />}
      </section>

      <section className="audit__state">
        <h3 className="audit__title">After State</h3>
         {auditData?.afterState &&  <AuditState data={auditData.afterState} />}
      </section>

    </div>
  );
};

export default AuditLogDetails;
