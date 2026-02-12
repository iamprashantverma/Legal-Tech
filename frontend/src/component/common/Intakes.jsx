import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMyIntakes } from "../../services/api/client-service";
import { getPendingIntakes } from "../../services/api/lawyer-service";
import Pagination from "./Pagination";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";
import { FaFileAlt, FaPlus } from "react-icons/fa";

const Intakes = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [intakes, setIntakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);

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

    const load = async () => {
      setCurrentPage(pageFromUrl);
      await fetchIntakes(pageFromUrl);

      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    };

    load();
  }, [user, pageFromUrl]);

  useEffect(() => {
    if (user?.role === "CLIENT") {
      setCurrentPage(1);
      setSearchParams({ page: 1 });
      fetchIntakes(1, statusFilter);
    }
  }, [statusFilter]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setIsAnimating(true);

    setTimeout(() => {
      setSearchParams({ page });
    }, 200);
  };

  const handleViewDetails = (intakeId) => {
    const page = searchParams.get("page") || currentPage;

    user.role === "LAWYER"
      ? navigate(`/lawyer/intake-review/${intakeId}?returnPage=${page}`)
      : navigate(`/client/intakes/${intakeId}?returnPage=${page}`);
  };

  if (!user) return <Loading text="Loading user info..." />;

  if (loading && intakes.length === 0) {
    return <Loading text="Loading intakes..." />;
  }

  return (
    <div className="intakes-wrapper">
      <div className="intakes">

        <div className="intakes-filter">
          {user.role === "CLIENT" ? (
            <>
              <label className="intakes-filter__label">Status</label>
              <select
                className="intakes-filter__select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="ALL">All</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="IN_REVIEW">In Review</option>
              </select>
            </>
          ) : (
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Showing all pending intakes for review
            </span>
          )}
        </div>

        {intakes.length === 0 && !loading ? (
          <EmptyState
            icon={FaFileAlt}
            title="No intakes found"
            description={
              user.role === "CLIENT"
                ? "You haven't submitted any intakes yet. Create your first intake to get started."
                : "No pending intakes to review at the moment."
            }
            action={
              user.role === "CLIENT" && (
                <button
                  className="btn-primary"
                  onClick={() => navigate("/client/intake/create")}
                >
                  <FaPlus /> Create Intake
                </button>
              )
            }
          />
        ) : (
          <div className="intakes__table-container">
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

              <tbody className={`table-transition ${isAnimating ? "fade-out" : "fade-in"}`}>
                {intakes.map((intake) => (
                  <tr key={intake.id}>
                    <td data-label="Name">{intake.name}</td>
                    <td data-label="Case Type">{intake.caseType}</td>
                    <td data-label="Status">
                      <span className={`status-badge status-${intake.status.toLowerCase()}`}>
                        {intake.status}
                      </span>
                    </td>
                    <td data-label="Priority">{intake.priority}</td>
                    <td data-label="Actions">
                      <button
                        className="intakes__btn"
                        onClick={() => handleViewDetails(intake.id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {intakes.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          disabled={loading}
        />
      )}
    </div>
  );
};

export default Intakes;
