import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import FormInput from "../../component/form/FormInput";
import { redirectByRole } from "../../utils/redirectByRole";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      redirectByRole(user, navigate);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    try {
      const loggedInUser = await login(formData);
      redirectByRole(loggedInUser, navigate);
    } catch (err) {
      setErrors({
        general: err?.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="auth__wrapper">
      <h2 className="auth__title">Welcome Back</h2>
      <p className="auth__subtitle">Sign in to your account to continue</p>

      <form onSubmit={handleSubmit} className="auth__form">
        {errors.general && (
          <div className="form__error">{errors.general}</div>
        )}

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        <FormInput
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          showPasswordToggle
          onTogglePassword={() => setShowPassword((p) => !p)}
          isPasswordVisible={showPassword}
        />

        <button
          type="submit"
          className="auth__submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="auth__link">
          Don't have an account?{" "}
          <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
