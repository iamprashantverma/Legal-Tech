import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext.js";

// Helper function to redirect based on role
const redirectByRole = (user) => {
  if (!user?.role) return;

  let path = "/";
  switch (user.role) {
    case "CLIENT":
      path = "/client";
      break;
    case "LAWYER":
      path = "/lawyer";
      break;
    case "ADMIN":
      path = "/admin";
      break;
    case "LEGAL_MANAGER":
      path = "/legal";
      break;
    default:
      path = "/";
  }

  // Completely clears history for security
  window.location.replace(path);
};

const NavBar = () => {
 
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Clears history after logout
    window.location.replace("/login");
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    redirectByRole(user);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__brand">
          <h1 to="/" className="navbar__logo">
            LegalTech
          </h1>
        </div>

        <ul className="navbar__menu">
          <li className="navbar__item">
            <NavLink
              to="/#"
              className={({ isActive }) =>
                isActive ? "navbar__link active" : "navbar__link"
              }
            >
              About Us
            </NavLink>
          </li>

          {!isAuthenticated && (
            <>
              <li className="navbar__item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "navbar__link active" : "navbar__link"
                  }
                >
                  Login
                </NavLink>
              </li>

              <li className="navbar__item">
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "navbar__link active" : "navbar__link"
                  }
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li className="navbar__item">
                <a
                  href="/dashboard"
                  onClick={handleDashboardClick}
                  className="navbar__link"
                >
                  Dashboard
                </a>
              </li>

              <li className="navbar__item navbar__user">
                <span className="navbar__username">
                  Hi, {user?.name || "..."}
                </span>
              </li>

              <li className="navbar__item">
                <button
                  onClick={handleLogout}
                  className="navbar__link navbar__link--danger"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
