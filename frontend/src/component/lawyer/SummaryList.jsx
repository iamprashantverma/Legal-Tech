import React, { useEffect, useState } from "react";
import SummaryItem from "./SummaryItem";
import Pagination from "../common/Pagination";
import { getAllSummaries } from "../../services/api/summary.service";


const ITEMS_PER_PAGE = 7;

const SummaryList = () => {
  const [summaries, setSummaries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummaries = async () => {
      try {
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

  const totalPages = Math.ceil(summaries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = summaries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) return <div className="summary-loader">Loading...</div>;

  return (
    <div className="summary-list-page">
      <div className="summary-table-wrapper">
        <table className="summary-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Preview</th>
              <th>Status</th>
              <th>Sentences</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item) => (
              <SummaryItem key={item.id} summary={item} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  );
};

export default SummaryList;
