import React, { useState } from "react";
import "./CreateNewPasswordPage.css";

const CreateNewPassword = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const inputChangeHandler = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));

    // Check password match when confirmPassword changes
    if (label === "confirmPassword") {
      if (formData.password !== value) {
        setError("Passwords do not match!");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      console.log("Password successfully set:", formData.password);
    } else {
      setError("Passwords do not match!");
    }
  };

  return (
    <div className="create-new-password-page-container">
      <img src="./loginimage.svg" alt="create-new-password" />
      <div className="create-new-password-page-container-wrapper">
        <div className="create-new-password-page-container-content">
          <div className="create-new-password-page-section1">
            <img src="./rightintakefilllogo.svg" alt="logo" />
            <img src="./rightintakelabel.svg" alt="logo" />
          </div>
          <div className="create-new-password-page-section2">
            <p className="create-new-password-page-section2-para1">
              Enter new password
            </p>
          </div>
          <form
            className="create-new-password-page-section3"
            onSubmit={handleSubmit}
          >
            {/* Password Field */}
            <div className="form-group">
              <div className="input-container">
                <input
                  className="create-new-password-page-form-input"
                  type={togglePassword ? "text" : "password"}
                  placeholder="Enter password"
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

            {/* Confirm Password Field */}
            <div className="form-group">
              <div className="input-container">
                <input
                  className={`create-new-password-page-form-input ${
                    error ? "error-border" : ""
                  }`}
                  type={toggleConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    inputChangeHandler("confirmPassword", e.target.value)
                  }
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
                >
                  <img
                    src={
                      toggleConfirmPassword
                        ? "./crossedeyes.svg"
                        : "./eyes.svg"
                    }
                    alt="toggle visibility"
                  />
                </button>
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button
              type="submit"
              className="create-new-password-page-signup-button"
              disabled={
                !formData.password || !formData.confirmPassword || error
              }
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
