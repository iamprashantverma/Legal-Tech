import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  getIntakeById as getLawyerIntake,
  addReview,
} from "../../services/api/lawyer-service";
import { getIntakeById as getClientIntake } from "../../services/api/client-service";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";

const IntakeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const { user } = useContext(AuthContext);

  const [intake, setIntake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchIntake = async () => {
    try {
      setLoading(true);
      let res;

      if (user.role === "LAWYER") {
        res = await getLawyerIntake(id);
      } else {
        res = await getClientIntake(id);
      }

      setIntake(res.data.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to fetch intake details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || !user) return;
    fetchIntake();
  }, [id, user]);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      await addReview(id, { comment });
      toast.success("Comment added successfully");

      await fetchIntake();
      setComment("");
      setShowCommentEditor(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="intake-details__state intake-details__loading">
        Loading intake…
      </div>
    );
  }

  if (error) {
    return (
      <div className="intake-details__state intake-details__error">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>← Back</button>
      </div>
    );
  }

  if (!intake) {
    return (
      <div className="intake-details__state intake-details__empty">
        No intake found
      </div>
    );
  }

  return (
    <div className="intake-details" id="intake-details">
      <div className="intake-details__header">
        <h2>Intake Details</h2>

        <div className="intake-details__header-actions">
          <span
            className={`intake-details__status ${intake.status
              .toLowerCase()
              .replace("_", "-")}`}
          >
            {intake.status}
          </span>

          {user.role === "LAWYER" && intake.status === "PENDING" && (
            <button
              className="intake-details__comment-btn"
              onClick={() => setShowCommentEditor((prev) => !prev)}
            >
              {showCommentEditor ? "Cancel" : "Add Comment"}
            </button>
          )}

          {/* ✅ ONLY REAL FIX — NO WHITE SCREEN */}
          <button
            className="intake-details__back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="intake-details__section">
        <h3>Client Information</h3>
        <div className="intake-details__grid">
          <p><strong>Name:</strong> {intake.name}</p>
          <p><strong>Email:</strong> {intake.email}</p>
          <p><strong>Phone:</strong> {intake.phoneNumber}</p>
          <p><strong>Date of Birth:</strong> {intake.dob}</p>
          <p><strong>Address:</strong> {intake.address}</p>
        </div>
      </div>

      <div className="intake-details__section">
        <h4>Case Details</h4>
        <div className="intake-details__grid">
          <p><strong>Case Type:</strong> {intake.caseType}</p>
          <p><strong>Priority:</strong> {intake.priority}</p>
          <p>
            <strong>Submitted On:</strong>{" "}
            {new Date(intake.created_at).toLocaleString()}
          </p>
          {intake.rejectedAt && (
            <p>
              <strong>Rejected On:</strong>{" "}
              {new Date(intake.rejectedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <div className="intake-details__section">
        <h3>Description</h3>
        <p className="intake-details__description">
          {intake.description}
        </p>
      </div>

      {user.role === "LAWYER" && showCommentEditor && (
        <div className="intake-details__section">
          <h3>Add Review</h3>

          <textarea
            className="intake-details__textarea"
            placeholder="Write your professional review or notes..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
          />

          <div className="intake-details__comment-actions">
            <button
              className="intake-details__submit-btn"
              disabled={submitting}
              onClick={handleSubmitComment}
            >
              {submitting ? "Submitting..." : "Submit Comment"}
            </button>
          </div>
        </div>
      )}

      <div className="intake-details__section">
        <h3>Uploaded Documents</h3>

        <div className="intake-details__files">
          <div>
            <h4>ID Proof</h4>
            {intake.uploadId?.length ? (
              <ul className="intake-details__file-list">
                {intake.uploadId.map((file, index) => (
                  <li key={index} className="intake-details__file-item">
                    <span>{index + 1}</span>
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="intake-details__view-btn"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <span>—</span>
            )}
          </div>

          <div>
            <h4>Supporting Documents</h4>
            {intake.uploadDocs?.length ? (
              <ul className="intake-details__file-list">
                {intake.uploadDocs.map((file, index) => (
                  <li key={index} className="intake-details__file-item">
                    <span>{index + 1}</span>
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="intake-details__view-btn"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <span>—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeDetails;
