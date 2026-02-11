import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (user.role === "CLIENT") {
      navigate("/client", { replace: true });
    } else if (user.role === "LAWYER") {
      navigate("/lawyer", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div>
      <h1>Home</h1>
      {!isAuthenticated && (
        <p>Welcome! Please log in to continue.</p>
      )}
    </div>
  );
};

export default Home;
