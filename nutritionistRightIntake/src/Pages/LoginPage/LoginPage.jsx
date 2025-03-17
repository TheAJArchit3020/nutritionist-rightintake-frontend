import React, { useState } from "react";
import "./LoginPage.css";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));

    // Clear the error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [label]: value.trim() ? "" : prev[label],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted:", formData);
      // Proceed with login logic (API call, etc.)
    }
  };

  return (
    <div className="login-page-container">
      <img src="./loginimage.svg" alt="login" />
      <div className="login-page-container-wrapper">
        <div className="login-page-container-content">
          <div className="login-page-section1">
            <img src="./rightintakefilllogo.svg" alt="logo" />
            <img src="./rightintakelabel.svg" alt="logo" />
          </div>
          <div className="login-page-section2">
            <p className="login-page-section2-para1">Hello Nutritionist</p>
            <p className="login-page-section2-para2">
              Welcome back to Right Intake
            </p>
          </div>
          <form className="login-page-section3" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <input
                className={`login-page-form-input ${
                  errors.email ? "login-input-error" : ""
                }`}
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => inputChangeHandler("email", e.target.value)}
              />
              {errors.email && <p className="login-error-text">{errors.email}</p>}
            </div>

            {/* Password Field with Toggle Icon Inside */}
            <div className="form-group">
              <div className="input-container">
                <input
                  className={`login-page-form-input ${
                    errors.password ? "login-input-error" : ""
                  }`}
                  type={togglePassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    inputChangeHandler("password", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setTogglePassword(!togglePassword)}
                >
                  <img
                    src={togglePassword ? "./crossedeyes.svg" : "./eyes.svg"}
                    alt="toggle visibility"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="login-error-text">{errors.password}</p>
              )}
            </div>

            <p className="login-page-forgotpass">Forget password?</p>

            <button type="submit" className="login-page-signup-button">
              Sign In
            </button>
            <p className="login-page-haveaccount">
              Don’t have an account? <b>Sign up</b>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
