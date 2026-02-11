import React from "react";

const EXCLUDED_KEYS = [
  "password",
  "__v"
];

const formatValue = (value) => {
  if (value === null || value === undefined) return "__";

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  // ISO date handling
  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    return new Date(value).toLocaleString();
  }

  if (typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return value.toString();
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

  return (
    <div className="audit-state">
      {Object.entries(data)
        .filter(([key]) => !EXCLUDED_KEYS.includes(key))
        .map(([key, value]) => (
          <div className="audit-state__row" key={key}>
            <span className="audit-state__label">
              {formatLabel(key)}
            </span>
            <span className="audit-state__value">
              {formatValue(value)}
            </span>
          </div>
        ))}
    </div>
  );
};

export default AuditState;
