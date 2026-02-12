import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryItem from "./SummaryItem";
import Loading from "../common/Loading";
import EmptyState from "../common/EmptyState";
import { getAllSummaries } from "../../services/api/summary.service";
import { FaFileAlt, FaPlus } from "react-icons/fa";

const SummaryList = () => {
  const navigate = useNavigate();

  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummaries = async () => {
      try {
        setLoading(true);
        const res = await getAllSummaries();
        setSummaries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSummaries();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/lawyer/summaries/${id}`);
  };

  if (loading) return <Loading text="Loading summaries..." />;

  return (
    <div className="summary-list">
      <div className="summary-list__header">
        <h1>Case Summaries</h1>
        <button className="btn-primary" onClick={() => navigate("/lawyer/create-summary")}>
          <FaPlus /> Create Summary
        </button>
      </div>

      {summaries.length === 0 ? (
        <EmptyState
          icon={FaFileAlt}
          title="No summaries found"
          description="You haven't created any case summaries yet. Create your first summary to get started."
          action={
            <button className="btn-primary" onClick={() => navigate("/lawyer/create-summary")}>
              <FaPlus /> Create Summary
            </button>
          }
        />
      ) : (
        <div className="summary-list__grid">
          {summaries.map((item) => (
            <SummaryItem 
              key={item.id} 
              summary={item} 
              onView={() => handleViewDetails(item.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryList;
