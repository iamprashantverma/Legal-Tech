import { useEffect, useState } from "react";
import { getMyIntakes, getMyProfile } from "../../services/api/client-service";
import Loading from "../../component/common/Loading";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [client, setClient] = useState(null);
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
    inReview: 0,
    
  });
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        profile,
        pending,
        approved,
        rejected,
        inReview,
      ] = await Promise.all([
        getMyProfile(),
        getMyIntakes({ status: "PENDING", limit: 1 }),
        getMyIntakes({ status: "APPROVED", limit: 1 }),
        getMyIntakes({ status: "REJECTED", limit: 1 }),
        getMyIntakes({ status: "IN_REVIEW", limit: 1 }),
      ]);

      setClient(profile.data.data);
      setStats({
        pending: pending.data.data.pagination.total,
        approved: approved.data.data.pagination.total,
        rejected: rejected.data.data.pagination.total,
        inReview: inReview.data.data.pagination.total,
      });
    } catch (error) {
      console.error(error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !client) {
    return <Loading text="Loading dashboard..." />;
  }

  return (
    <div className="client__dashboard">
      <div className="client__info">
        <div className="client__left">
          <img
            src={client?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"}
            alt="Client"
          />
          <div>
            <h2>{client?.name}</h2>
            <p>{client?.address}</p>
            <span>
              Last login:{" "}
              {client?.lastLogin
                ? new Date(client.lastLogin).toLocaleString()
                : "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="stats__grid">
        <div className="stat__card success">
          <h4>Approved</h4>
          <p>{loading ? "—" : stats.approved}</p>
        </div>

        <div className="stat__card warning">
          <h4>Pending</h4>
          <p>{loading ? "—" : stats.pending}</p>
        </div>

        <div className="stat__card review">
          <h4>In Review</h4>
          <p>{loading ? "—" : stats.inReview}</p>
        </div>

        <div className="stat__card danger">
          <h4>Rejected</h4>
          <p>{loading ? "—" : stats.rejected}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
