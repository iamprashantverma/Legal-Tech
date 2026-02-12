import React from "react";

const EXCLUDED_KEYS = ["password", "__v"];

const isValidUrl = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const formatLabel = (key) =>
  key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase());

const AuditState = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div className="audit-state__empty">No data available</div>;
  }

  const openDoc = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="audit-state">
      {Object.entries(data)
        .filter(([key]) => !EXCLUDED_KEYS.includes(key))
        .map(([key, value]) => (
          <div className="audit-state__row" key={key}>
            <strong>{formatLabel(key)}:</strong>
            <span>
              {Array.isArray(value) && value.every(isValidUrl) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {value.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      className="btn-primary"
                      onClick={() => openDoc(url)}
                      style={{ fontSize: '12px', padding: '4px 12px' }}
                    >
                      View Document {i + 1}
                    </button>
                  ))}
                </div>
              ) : (
                String(value)
              )}
            </span>
          </div>
        ))}
    </div>
  );
};

export default AuditState;
