import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext.js";
import { FaUserCircle, FaBell } from "react-icons/fa";

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

  window.location.replace(path);
};

const NavBar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.replace("/login");
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    redirectByRole(user);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        {/* Logo */}
        <NavLink to="/" className="navbar__logo">
          LegalTech
        </NavLink>

        <ul className="navbar__menu">
          
          {!isAuthenticated && (
            <>
              <li className="navbar__item">
                <NavLink to="/about" className="navbar__link">
                  About Us
                </NavLink>
              </li>

              <li className="navbar__item">
                <NavLink to="/login" className="navbar__link">
                  Login
                </NavLink>
              </li>

              <li className="navbar__item">
                <NavLink to="/signup" className="navbar__link navbar__link--primary">
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              {/* Notification */}
              <li className="navbar__item navbar__notification">
                <FaBell className="navbar__icon" />
                <span className="navbar__badge">3</span>
              </li>

              {/* User */}
              <li className="navbar__item navbar__user">
                <FaUserCircle className="navbar__icon" />
                <span className="navbar__username">
                  {user?.name || "Guest"}
                </span>
              </li>

              <li className="navbar__item">
                <a
                  href="/dashboard"
                  onClick={handleDashboardClick}
                  className="navbar__link"
                >
                  Dashboard
                </a>
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
