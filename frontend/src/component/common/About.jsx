import React from "react";
import { Link } from "react-router-dom";
import { FaFileAlt, FaUserTie, FaShieldAlt, FaChartLine, FaUsers, FaLock } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: FaFileAlt,
      title: "Client Intake Management",
      description: "Structured intake forms with status tracking and prioritization."
    },
    {
      icon: FaUserTie,
      title: "Lawyer Review & Assignment",
      description: "Quick review system with approvals, rejections, and case routing."
    },
    {
      icon: FaLock,
      title: "Secure Document Uploads",
      description: "Cloud-based file storage with role-based access control."
    },
    {
      icon: FaChartLine,
      title: "Case Status Tracking",
      description: "Real-time updates for clients and legal teams."
    },
    {
      icon: FaUsers,
      title: "Role-Based Dashboards",
      description: "Separate interfaces for clients, lawyers, and admins."
    },
    {
      icon: FaShieldAlt,
      title: "Audit Logs & Security",
      description: "Full activity history for compliance and transparency."
    }
  ];

  return (
    <div className="about">
      <section className="about__hero">
        <h1>Modern Legal Tech Management System</h1>
        <p>
          A secure, intelligent platform designed to streamline legal case intake,
          client-lawyer collaboration, document handling, and case tracking — all in one place.
        </p>
      </section>

      <section className="about__features">
        {features.map((feature, index) => (
          <div key={index} className="about__feature">
            <div className="about__feature-icon">
              <feature.icon />
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="about__cta">
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of legal professionals who trust our platform to manage their cases efficiently and securely.
        </p>
        <div className="cta-buttons">
          <Link to="/signup" className="primary">Get Started</Link>
          <Link to="/login" className="secondary">Sign In</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
