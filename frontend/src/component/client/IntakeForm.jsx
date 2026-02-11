import { useState, useEffect } from "react";
import { createIntake } from "../../services/api/client-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const IntakeForm = () => {
  const navigate = useNavigate();

  const initialFormState = {
    name: "",
    dob: "",
    email: "",
    phoneNumber: "",
    address: "",
    priority: "MEDIUM",
    caseType: "",
    description: "",
    uploadDocs: [],
    uploadId: [],
    consent: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (success && requestId) {
      toast.success("Intake submitted successfully ");
      navigate("/client/form-success", {
        state: { requestId },
      });
    }
  }, [success, requestId, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [name]: Array.from(files),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      setError("Please confirm the information is correct.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = new FormData();

      // Append normal fields
      data.append("name", formData.name);
      data.append("dob", formData.dob);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("address", formData.address);
      data.append("priority", formData.priority);
      data.append("caseType", formData.caseType);
      data.append("description", formData.description);
      data.append("consent", formData.consent);

      // Append files
      formData.uploadId.forEach((file) => {
        data.append("uploadId", file);
      });

      formData.uploadDocs.forEach((file) => {
        data.append("uploadDocs", file);
      });
      const resp = await createIntake(data);
      setRequestId(resp.data.id);
      setSuccess(true);
      toast.success("Intake submitted successfully ");
      // setFormData(initialFormState);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit intake. Please try again."
      );
      toast.error("Failed to submit intake");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="intake">
      {error && <div className="intake__error">{error}</div>}

      <form className="intake__form" onSubmit={handleSubmit}>
        {/* 1. Personal Information */}
        <section className="intake__section">
          <h3>1. Personal Information</h3>
          <div className="intake__grid">
            <div className="field">
              <label>Full Name</label>
              <input name="name" value={formData.name} required onChange={handleChange} />
            </div>
            <div className="field">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} required onChange={handleChange} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} required onChange={handleChange} />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input name="phoneNumber" value={formData.phoneNumber} required onChange={handleChange} />
            </div>
            <div className="field full">
              <label>Full Address</label>
              <input name="address" value={formData.address} required onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* 2. Case Details */}
        <section className="intake__section">
          <h3>2. Case / Request Details</h3>
          <div className="intake__grid">
            <div className="field">
              <label>Case Type</label>
              <select name="caseType" value={formData.caseType} required onChange={handleChange}>
                <option value="">Select</option>
                <option>Immigration Law</option>
                <option>Family Law</option>
                <option>Criminal Law</option>
                <option>Civil Law</option>
              </select>
            </div>
            <div className="field">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
            <div className="field full">
              <label>Description</label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                required
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* 3. Documents */}
        <section className="intake__section">
          <h3>3. Documents</h3>
          <div className="intake__grid">
            <div className="field">
              <label>Upload ID</label>
              <input type="file" name="uploadId" multiple onChange={handleFileChange} />
            </div>
            <div className="field">
              <label>Supporting Documents</label>
              <input type="file" name="uploadDocs" multiple onChange={handleFileChange} />
            </div>
          </div>
        </section>

        {/* Consent */}
        <section className="intake__consent">
          <label className="intake__consent-label">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <span>I confirm the information provided is accurate</span>
          </label>
        </section>

        <button
          className="intake__submit"
          type="submit"
          disabled={loading || !formData.consent}
        >
          {loading ? "Submitting..." : "Submit Intake"}
        </button>
      </form>
    </div>
  );
};

export default IntakeForm;
