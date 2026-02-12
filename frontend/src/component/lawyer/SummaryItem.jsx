import React from "react";
import { FaClock, FaFileAlt } from "react-icons/fa";

const SummaryItem = ({ summary, onView }) => {
  return (
    <div className="summary-item" onClick={onView}>
      <h3 className="summary-item__title">
        <FaFileAlt /> Summary #{summary.id}
      </h3>
      
      <div className="summary-item__meta">
        <p className="summary-item__preview">
          {summary.output
            ? summary.output.substring(0, 120) + "..."
            : summary.text?.substring(0, 120) + "..."}
        </p>
        
        <div className="summary-item__info">
          <span className={`status-badge status-${summary.status?.toLowerCase() || 'pending'}`}>
            {summary.status || 'PENDING'}
          </span>
          <span>Max Sentences: {summary.max_sentences}</span>
        </div>
      </div>

      <div className="summary-item__date">
        <FaClock /> {new Date(summary.created_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default SummaryItem;
