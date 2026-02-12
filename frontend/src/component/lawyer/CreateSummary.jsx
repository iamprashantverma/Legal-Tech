import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSummary } from "../../services/api/summary.service";
import "react-toastify/dist/ReactToastify.css";

const CreateSummary = () => {
  const [text, setText] = useState("");
  const [maxSentences, setMaxSentences] = useState(2);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Please enter text to summarize");
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
      }, 1200);

    } catch (error) {
      toast.error("Failed to create summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-summary">
      <ToastContainer position="top-right" />

      {/* Main Heading */}
      <h1 className="create-summary__title">
        Turn long text into <span>clear, important summaries</span> in seconds
      </h1>


      {/* Subtitle */}
      <p className="create-summary__subtitle">
        Create a new summary
      </p>

      <form onSubmit={handleSubmit}>

        <textarea
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
        />

        <div className="sentence-control">
          <label>Number of sentences</label>
          <input
            type="number"
            min="1"
            max="10"
            value={maxSentences}
            onChange={(e) => setMaxSentences(Number(e.target.value))}
          />
        </div>

        <button disabled={loading}>
          {loading ? "Summarizing..." : "Create Summary"}
        </button>

      </form>
    </div>
  );

};

export default CreateSummary;
