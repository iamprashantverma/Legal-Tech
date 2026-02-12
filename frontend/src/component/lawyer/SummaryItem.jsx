import React from "react";
import { Link } from "react-router-dom";

const SummaryItem = ({ summary }) => {
  return (
    <tr className="summary-row">

      <td className="summary-cell summary-cell--id">
        #{summary.id}
      </td>

      <td className="summary-cell summary-cell--preview">
        {summary.output
          ? summary.output.substring(0, 80) + "..."
          : summary.text.substring(0, 80) + "..."}
      </td>

      <td className="summary-cell">
        <span className={`status status-${summary.status.toLowerCase()}`}>
          {summary.status}
        </span>
      </td>

      <td className="summary-cell">
        {summary.max_sentences}
      </td>

      <td className="summary-cell">
        {new Date(summary.created_at).toLocaleDateString()}
      </td>

      <td className="summary-cell summary-cell--action">
        <Link
          to={`/lawyer/summaries/${summary.id}`}
          className="view-btn"
        >
          Details
        </Link>
      </td>

    </tr>
  );
};

export default SummaryItem;
