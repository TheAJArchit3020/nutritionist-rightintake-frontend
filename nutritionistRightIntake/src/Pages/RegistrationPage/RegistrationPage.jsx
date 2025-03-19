import React, { useState } from "react";
import "./RegistrationPage.css";
import axios from "axios";
import { registerapi } from "../../Apis/Apis";
import { useNavigate } from "react-router";

const Registration = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChangeHandler = (label, value) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [label]: value };

      // Check if passwords match
      if (label === "confirmPassword" || label === "password") {
        if (updatedFormData.password !== updatedFormData.confirmPassword) {
          setError("Passwords do not match!");
        } else {
          setError(""); // Clear error if they match
        }
      }

      return updatedFormData;
    });
  };

  const RegistrationHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const registerResponse = await axios.post(registerapi, {
        email: formData.email,
        password: formData.password,
      });

      if (registerResponse.status === 201) {
        alert("Registration Successful!");
        
        navigate("/");
      } else {
        alert(registerResponse.message);
      }
      // Reset form fields after successful registration
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration Error:", error);
      setError("Registration failed! Please try again.");
    }
  };

  return (
    <div className="registration-page-container">
      <img
        src="./registrationimage.svg"
        alt="registration"
        className="image1"
      />
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
          <form
            onSubmit={RegistrationHandler}
            className="registration-page-section3"
          >
            {/* Email Input */}
            <div className="form-group">
              <input
                className={`registration-page-form-input ${
                  error ? "input-error" : ""
                }`}
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
                  className={`registration-page-form-input ${
                    error ? "input-error" : ""
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
            </div>

            {/* Confirm Password Input with Toggle */}
            <div className="form-group">
              <div className="input-container">
                <input
                  className={`registration-page-form-input ${
                    error ? "registration-input-error" : ""
                  }`}
                  type={toggleConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    inputChangeHandler("confirmPassword", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() =>
                    setToggleConfirmPassword(!toggleConfirmPassword)
                  }
                >
                  <img
                    src={
                      toggleConfirmPassword ? "./crossedeyes.svg" : "./eyes.svg"
                    }
                    alt="toggle visibility"
                  />
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="registration-error-text">{error}</p>}

            <button
              type="submit"
              className="registration-page-signup-button"
              disabled={!!error} // Disable button if there is an error
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
