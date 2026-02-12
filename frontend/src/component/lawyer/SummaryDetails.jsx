import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getSummaryById } from "../../services/api/summary.service";
import Loading from "../common/Loading";

const SummaryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        setLoading(true);
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

  const handleBack = () => {
    navigate("/lawyer/summary");
  };

  if (loading) return <Loading text="Loading summary..." />;
  if (error || !summary)
    return <div className="state error">Unable to load summary</div>;

  return (
    <div className="summary-details">
      <div className="summary-details__header">
        <div>
          <h1>Summary #{summary.id}</h1>
          <div className="summary-details__meta">
            <span className={`status-badge status-${summary.status?.toLowerCase() || 'pending'}`}>
              {summary.status || 'PENDING'}
            </span>
            <span>Max Sentences: {summary.max_sentences}</span>
            <span>Created: {new Date(summary.created_at).toLocaleString()}</span>
          </div>
        </div>
        <button className="btn-light" onClick={handleBack}>
          Back to List
        </button>
      </div>

      <div className="summary-details__content">
        <h2>Original Text</h2>
        <p>{summary.text}</p>
      </div>

      {summary.status === "COMPLETED" && summary.output && (
        <div className="summary-details__content">
          <h2>Generated Summary</h2>
          <p>{summary.output}</p>
        </div>
      )}

      {summary.status === "FAILED" && (
        <div className="card" style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem' }}>
          <p style={{ color: '#b91c1c' }}>⚠️ Summary generation failed. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default SummaryDetails;
