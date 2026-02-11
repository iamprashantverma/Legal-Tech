import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMyIntakes } from "../../services/api/client-service";
import { getPendingIntakes } from "../../services/api/lawyer-service";
import Pagination from "./Pagination";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";

const Intakes = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [intakes, setIntakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);

  // CLIENT filter
  const [statusFilter, setStatusFilter] = useState("ALL");


  const fetchIntakes = async (page, status = statusFilter) => {
    if (!user) return;
    setLoading(true);

    try {
      let res;

      if (user.role === "LAWYER") {
        res = await getPendingIntakes(page);
      } else {
        res = await getMyIntakes({
          page,
          status: status !== "ALL" ? status : undefined,
        });
      }

      const data = res.data.data;
      setIntakes(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      toast.error(err?.message || "Failed to fetch intakes");
      setIntakes([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!user) return;
    setCurrentPage(pageFromUrl);
    fetchIntakes(pageFromUrl);

  }, [user, pageFromUrl]);


  useEffect(() => {
    if (user?.role === "CLIENT") {
      setSearchParams({ page: 1 });
      fetchIntakes(1, statusFilter);
    }

  }, [statusFilter]);


  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page });
  };


  const handleViewDetails = (intakeId) => {
    const page = searchParams.get("page") || 1;

    if (user.role === "LAWYER") {
      navigate(`/lawyer/intake-review/${intakeId}?page=${page}`);
    } else {
      navigate(`/client/intakes/${intakeId}?page=${page}`);
    }
  };

  if (!user) return <p>Loading user info...</p>;

  return (
    <div className="intakes">
      {/* CLIENT FILTER */}
      {user.role === "CLIENT" && (
        <div className="intakes__filter">
          <label>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      )}

      {/* TABLE */}
      <table className="intakes__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Case Type</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Loading…
              </td>
            </tr>
          ) : intakes.length > 0 ? (
            intakes.map((intake) => (
              <tr key={intake.id}>
                <td>{intake.name}</td>
                <td>{intake.caseType}</td>
                <td>
                  <span className={`status-badge status-${intake.status.toLowerCase()}`}>
                    {intake.status}
                  </span>
                </td>

                <td>{intake.priority}</td>
                <td>
                  <button
                    className="intakes__btn intakes__btn--view"
                    onClick={() => handleViewDetails(intake.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No intakes found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        disabled={loading}
      />
    </div>
  );
};

export default Intakes;
