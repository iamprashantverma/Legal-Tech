import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/authContext";

const SideBar = () => {
  const { user } = useContext(AuthContext);

  // if user is not found 
  if (!user) return null; 

  return (
    <aside className="sidebar">
      
      <ul className="sidebar__menu">
        {/* CLIENT MENU */}
        {user.role === "CLIENT" && (
          <>
            <li>
              <NavLink
                to="/client/intakes"
                className={({ isActive }) =>
                  isActive ? "sidebar__link active" : "sidebar__link"
                }
              >
                Intakes
              </NavLink>
            </li>

            

            <li>
              <NavLink
                to="/client/intake/create"
                className={({ isActive }) =>
                  isActive ? "sidebar__link active" : "sidebar__link"
                }
              >
                Create Intake
              </NavLink>
            </li>
          </>
        )}

        {/* LAWYER MENU */}
        {user.role === "LAWYER" && (
          <>
            <li>
              <NavLink
                to="/lawyer/cases"
                className={({ isActive }) =>
                  isActive ? "sidebar__link active" : "sidebar__link"
                }
              >
                Cases
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/lawyer/summary"
                className={({ isActive }) =>
                  isActive ? "sidebar__link active" : "sidebar__link"
                }
              >
                Summary
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/lawyer/create-summary"
                className={({ isActive }) =>
                  isActive ? "sidebar__link active" : "sidebar__link"
                }
              >
                Create Summary
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/lawyer/intake-review"
                className={({ isActive }) =>
                  isActive ? "sidebar__link active" : "sidebar__link"
                }
              >
                Intake Review
              </NavLink>
            </li>
          </>
        )}
        { user?.role === "ADMIN" &&
          <li>
              <NavLink
                to="/admin/audit-logs"
                className={({ isActive }) =>
                  isActive ? "sidebar__link active" : "sidebar__link"
                }
              >
              Auditlogs
              </NavLink>
            </li>

        }
      </ul>
    </aside>
  );
};

export default SideBar;
