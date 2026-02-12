import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { FaFileAlt, FaUserTie, FaShieldAlt, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role === "CLIENT") {
      navigate("/client", { replace: true });
    } else if (user.role === "LAWYER") {
      navigate("/lawyer", { replace: true });
    } else if (user.role === "ADMIN") {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <h1>Welcome to LegalTech</h1>
          <p>
            Streamline your legal case management with our modern, secure platform.
            Connect clients with lawyers efficiently and transparently.
          </p>
          <div className="home__hero-actions">
            <Link to="/signup" className="btn-primary">
              Get Started <FaArrowRight />
            </Link>
            <Link to="/about" className="btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="home__features">
        <div className="home__feature">
          <div className="home__feature-icon">
            <FaFileAlt />
          </div>
          <h3>Easy Intake Management</h3>
          <p>Submit and track legal intake forms with real-time status updates.</p>
        </div>

        <div className="home__feature">
          <div className="home__feature-icon">
            <FaUserTie />
          </div>
          <h3>Lawyer Collaboration</h3>
          <p>Seamless communication between clients and legal professionals.</p>
        </div>

        <div className="home__feature">
          <div className="home__feature-icon">
            <FaShieldAlt />
          </div>
          <h3>Secure & Compliant</h3>
          <p>Enterprise-grade security with full audit trails and compliance.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
