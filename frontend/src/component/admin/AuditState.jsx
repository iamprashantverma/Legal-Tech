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
    return <p className="audit-state__empty">__</p>;
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
            <span className="audit-state__label">
              {formatLabel(key)}
            </span>

            <div className="audit-state__value">
              {Array.isArray(value) && value.every(isValidUrl) ? (
                value.map((url, i) => (
                  <button
                    key={i}
                    type="button"
                    className="audit-state__doc-btn"
                    onClick={() => openDoc(url)}
                  >
                    View Document {i + 1}
                  </button>
                ))
              ) : (
                <span>{String(value)}</span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AuditState;
