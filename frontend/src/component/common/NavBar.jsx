import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext.js";
import { FaUserCircle, FaBell, FaBars, FaTimes } from "react-icons/fa";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.replace("/login");
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    redirectByRole(user);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        
        <NavLink to="/" className="navbar__logo">
          LegalTech
        </NavLink>

        <button 
          className="navbar__mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar__menu ${mobileMenuOpen ? 'navbar__menu--open' : ''}`}>
          
          {!isAuthenticated && (
            <>
              <li className="navbar__item">
                <NavLink to="/about" className="navbar__link" onClick={closeMobileMenu}>
                  About Us
                </NavLink>
              </li>

              <li className="navbar__item">
                <NavLink to="/login" className="navbar__link" onClick={closeMobileMenu}>
                  Login
                </NavLink>
              </li>

              <li className="navbar__item">
                <NavLink to="/signup" className="navbar__link navbar__link--primary" onClick={closeMobileMenu}>
                  Signup
                </NavLink>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              <li className="navbar__item navbar__notification">
                <FaBell className="navbar__icon" />
                <span className="navbar__badge">3</span>
              </li>

              <li className="navbar__item navbar__user">
                <FaUserCircle className="navbar__icon" />
                <span className="navbar__username">
                  {user?.name || "Guest"}
                </span>
              </li>

              <li className="navbar__item">
                <a
                  href="/dashboard"
                  onClick={(e) => {
                    handleDashboardClick(e);
                    closeMobileMenu();
                  }}
                  className="navbar__link"
                >
                  Dashboard
                </a>
              </li>

              <li className="navbar__item">
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
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
