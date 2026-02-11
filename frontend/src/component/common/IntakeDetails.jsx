import React, { useEffect, useState, useContext } from "react";
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
  const { user } = useContext(AuthContext);

  const [intake, setIntake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchIntake = async () => {
    try {
      setLoading(true);

      const res =
        user.role === "LAWYER"
          ? await getLawyerIntake(id)
          : await getClientIntake(id);

      setIntake(res.data.data);
    } catch (err) {
      setError("Unable to fetch intake details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && user) fetchIntake();
  }, [id, user]);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      await addReview(id, { comment });
      toast.success("Comment added successfully");
      setComment("");
      setShowComment(false);
      fetchIntake();
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="state">Loading...</div>;
  if (error) return <div className="state error">{error}</div>;
  if (!intake) return <div className="state">No intake found</div>;

  return (
    <div className="intake-wrapper">
      {/* HEADER */}
      <div className="intake-header">
        <div>
          <h2>Intake Details</h2>
          <p>
            Submitted on{" "}
            {new Date(intake.created_at).toLocaleString()}
          </p>
        </div>

        <div className="header-actions">
          <span
            className={`status ${intake.status
              .toLowerCase()
              .replace(" ", "_")}`}
          >
            {intake.status}
          </span>

          {/* ✅ LAWYER + PENDING ONLY */}
          {user.role === "LAWYER" &&
            intake.status === "PENDING" && (
              <button
                className="btn-primary"
                onClick={() => setShowComment(!showComment)}
              >
                {showComment ? "Cancel" : "Add Comment"}
              </button>
            )}

          <button
            className="btn-light"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      {/* COMMENT BOX */}
      {showComment && (
        <div className="card comment-card">
          <h3>Add Review</h3>
          <textarea
            placeholder="Write your professional notes..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="comment-actions">
            <button
              className="btn-primary"
              disabled={submitting}
              onClick={handleSubmitComment}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="main-grid">
        {/* LEFT */}
        <div className="column">
          <div className="card">
            <h3>Client Information</h3>

            <div className="info-row"><label>Name</label><span>{intake.name}</span></div>
            <div className="info-row"><label>Email</label><span>{intake.email}</span></div>
            <div className="info-row"><label>Phone</label><span>{intake.phoneNumber}</span></div>
            <div className="info-row"><label>Date of Birth</label><span>{intake.dob}</span></div>
            <div className="info-row"><label>Address</label><span>{intake.address}</span></div>
          </div>

          <div className="card">
            <h3>Case Details</h3>

            <div className="info-row">
              <label>Case Type</label>
              <span>{intake.caseType}</span>
            </div>

            <div className="info-row">
              <label>Priority</label>
              <span
                className={`priority ${intake.priority.toLowerCase()}`}
              >
                {intake.priority}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="column">
          <div className="card">
            <h3>Description</h3>
            <p className="description">{intake.description}</p>
          </div>

          <div className="card">
            <h3>Uploaded Documents</h3>

            {[...(intake.uploadId || []), ...(intake.uploadDocs || [])].map(
              (file, index) => (
                <div key={index} className="file-item">
                  <span>Document {index + 1}</span>
                  <a href={file} target="_blank" rel="noreferrer">
                    View
                  </a>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeDetails;
