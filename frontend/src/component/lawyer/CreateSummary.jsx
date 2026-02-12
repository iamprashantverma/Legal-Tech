import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSummary } from "../../services/api/summary.service";

const CreateSummary = () => {
  const [text, setText] = useState("");
  const [maxSentences, setMaxSentences] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Please enter text to summarize");
      return;
    }

    try {
      setLoading(true);

      const response = await createSummary({
        text,
        max_sentences: maxSentences,
      });

      const summaryId = response?.data?.id;
      setText("");

      toast.success("Summary created successfully!");

      setTimeout(() => {
        navigate(`/lawyer/summaries/${summaryId}`);
      }, 1000);

    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create summary");
      toast.error("Failed to create summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-summary">
      <div className="create-summary__header">
        <h1>Create Case Summary</h1>
        <p>Generate concise summaries from your case notes and documents</p>
      </div>

      {error && (
        <div className="create-summary__error">{error}</div>
      )}

      <form className="create-summary__form" onSubmit={handleSubmit}>
        <div className="create-summary__field">
          <label>Text to Summarize</label>
          <textarea
            placeholder="Paste an article, notes, or long text here to summarize..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            required
          />
        </div>

        <div className="create-summary__field">
          <label>Maximum Sentences</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              className="btn"
              onClick={() => setMaxSentences(Math.max(1, maxSentences - 1))}
              style={{ width: '40px', height: '40px' }}
            >
              −
            </button>

            <input
              type="number"
              min="1"
              max="10"
              value={maxSentences}
              onChange={(e) => setMaxSentences(Number(e.target.value))}
              style={{ width: '80px', textAlign: 'center' }}
            />

            <button
              type="button"
              className="btn"
              onClick={() => setMaxSentences(Math.min(10, maxSentences + 1))}
              style={{ width: '40px', height: '40px' }}
            >
              +
            </button>

            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Typical: 3–5 sentences
            </span>
          </div>
        </div>

        <div className="create-summary__actions">
          <button
            type="button"
            className="btn-light"
            onClick={() => navigate("/lawyer/summary")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSummary;
