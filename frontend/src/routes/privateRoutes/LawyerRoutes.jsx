import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../context/authContext";


const ClientRoutes = () => {
  const { user } = useContext(AuthContext);

  if (user?.role !== "LAWYER") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ClientRoutes;
