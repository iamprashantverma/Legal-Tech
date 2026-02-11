import React from "react";

const About = () => {
  return (
    <div className="about">

      {/* HERO */}
      <section className="about__hero">
        <h1>Modern Legal Tech Management System</h1>
        <p>
          A secure, intelligent platform designed to streamline legal case intake,
          client-lawyer collaboration, document handling, and case tracking — all in one place.
        </p>
      </section>

      {/* DESCRIPTION */}
      <section className="about__intro">
        <h2>Why Our Platform?</h2>
        <p>
          Our Legal Tech Management System empowers law firms and clients with
          smart automation, real-time tracking, and secure workflows to simplify
          legal operations while improving transparency and productivity.
        </p>
      </section>

      {/* FEATURES */}
      <section className="about__features">
        <h2>Key Features</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Client Intake Management</h3>
            <p>Structured intake forms with status tracking and prioritization.</p>
          </div>

          <div className="feature-card">
            <h3>Lawyer Review & Assignment</h3>
            <p>Quick review system with approvals, rejections, and case routing.</p>
          </div>

          <div className="feature-card">
            <h3>Secure Document Uploads</h3>
            <p>Cloud-based file storage with role-based access control.</p>
          </div>

          <div className="feature-card">
            <h3>Case Status Tracking</h3>
            <p>Real-time updates for clients and legal teams.</p>
          </div>

          <div className="feature-card">
            <h3>Role-Based Dashboards</h3>
            <p>Separate interfaces for clients, lawyers, and admins.</p>
          </div>

          <div className="feature-card">
            <h3>Audit Logs & Security</h3>
            <p>Full activity history for compliance and transparency.</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="about__benefits">
        <h2>How It Helps</h2>
        <ul>
          <li>✔ Faster case processing</li>
          <li>✔ Improved client communication</li>
          <li>✔ Reduced manual paperwork</li>
          <li>✔ Enhanced data security</li>
          <li>✔ Better legal workflow visibility</li>
        </ul>
      </section>

    </div>
  );
};

export default About;
