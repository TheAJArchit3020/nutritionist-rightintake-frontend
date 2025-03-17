import React, { useState } from "react";
import "./RegistrationPage.css";

const Registration = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  return (
    <div className="registration-page-container">
      <img src="./registrationimage.svg" alt="registration" />
      <div className="registration-page-container-wrapper">
        <div className="registration-page-container-content">
          <div className="registration-page-section1">
            <img src="./rightintakefilllogo.svg" alt="logo" />
            <img src="./rightintakelabel.svg" alt="logo" />
          </div>
          <div className="registration-page-section2">
            <p className="registration-page-section2-para1">
              Hello Nutritionist
            </p>
            <p className="registration-page-section2-para2">
              Welcome to Right Intake
            </p>
          </div>
          <form className="registration-page-section3">
            {/* Email Input */}
            <div className="form-group">
              <input
                className="registration-page-form-input"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => inputChangeHandler("email", e.target.value)}
              />
            </div>

            {/* Password Input with Toggle */}
            <div className="form-group">
              <div className="input-container">
                <input
                  className="registration-page-form-input"
                  type={togglePassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => inputChangeHandler("password", e.target.value)}
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
            </div>

            {/* Confirm Password Input with Toggle */}
            <div className="form-group">
              <div className="input-container">
                <input
                  className="registration-page-form-input"
                  type={toggleConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => inputChangeHandler("confirmPassword", e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
                >
                  <img
                    src={toggleConfirmPassword ? "./crossedeyes.svg" : "./eyes.svg"}
                    alt="toggle visibility"
                  />
                </button>
              </div>
            </div>

            <button type="submit" className="registration-page-signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
