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

  const passwordToggleHandler = (field) => {
    if (field === "password") {
      setTogglePassword(!togglePassword);
    } else if (field === "confirmPassword") {
      setToggleConfirmPassword(!toggleConfirmPassword);
    }
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
            <div className="form-group">
              <input
                className="registration-page-form-input"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => inputChangeHandler("email", e.target.value)}
              />
            </div>
            <div className="form-group pass-toggle">
              <input
                className="registration-page-form-input"
                type={togglePassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => inputChangeHandler("password", e.target.value)}
              />
              {/* <button
                  type="button"
                  onClick={() => passwordToggleHandler("password")}
                >
                  {togglePassword ? "Hide" : "Show"}
                </button> */}
            </div>
            <div className="form-group pass-toggle">
              <input
                className="registration-page-form-input"
                type={toggleConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  inputChangeHandler("confirmPassword", e.target.value)
                }
              />
              {/* <button
                  type="button"
                  onClick={() => passwordToggleHandler("confirmPassword")}
                >
                  {toggleConfirmPassword ? "Hide" : "Show"}
                </button> */}
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
