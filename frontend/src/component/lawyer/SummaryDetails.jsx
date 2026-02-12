import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSummaryById } from "../../services/api/summary.service";

const SummaryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const res = await getSummaryById(id);
        setSummary(res.data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, [id]);

  if (loading) return <div className="summary-loader">Loading summary...</div>;
  if (error || !summary)
    return <div className="summary-error">Unable to load summary</div>;

  return (
    <div className="summary-page">
      <div className="summary-card">

        {/* Back button */}
        <button 
          className="summary-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="summary-header">
          <h2>Summary #{summary.id}</h2>
          <span className={`status status-${summary.status.toLowerCase()}`}>
            {summary.status}
          </span>
        </div>

        <div className="summary-section original">
          <h3>Original Text</h3>
          <p>{summary.text}</p>
        </div>

        {summary.status === "COMPLETED" && (
          <div className="summary-section output">
            <h3>Generated Summary</h3>
            <p>{summary.output}</p>
          </div>
        )}

        {summary.status === "FAILED" && (
          <div className="summary-failed-box">
            ⚠️ Summary generation failed. Please try again later.
          </div>
        )}

        <div className="summary-meta">
          <span>🗓 {summary.created_at}</span>
          <span>✂ {summary.max_sentences} sentences</span>
        </div>

      </div>
    </div>
  );
};

export default SummaryDetails;
