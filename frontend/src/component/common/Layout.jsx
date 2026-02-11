import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext";

import SideBar from "./SideBar";

const Layout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {/* SideBar */}
      <div className="app-layout">
        {isAuthenticated && <SideBar />}

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
