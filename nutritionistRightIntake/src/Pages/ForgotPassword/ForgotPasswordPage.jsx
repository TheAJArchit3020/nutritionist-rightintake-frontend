import React, { useState } from "react";
import "./ForgotPasswordPage.css";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
  });

  const inputChangeHandler = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  return (
    <div className="forgotpassword-page-container">
      <img src="./loginimage.svg" alt="forgotpassword" />
      <div className="forgotpassword-page-container-wrapper">
        <div className="forgotpassword-page-container-content">
          <div className="forgotpassword-page-section1">
            <img src="./rightintakefilllogo.svg" alt="logo" />
            <img src="./rightintakelabel.svg" alt="logo" />
          </div>
          <div className="forgotpassword-page-section2">
            <p className="forgotpassword-page-section2-para1">
              Forget your password?
            </p>
            <p className="forgotpassword-page-section2-para2">
              No worries we will send you reset instructions
            </p>
          </div>
          <form className="forgotpassword-page-section3">
            <div className="form-group">
              <input
                className="forgotpassword-page-form-input"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => inputChangeHandler("email", e.target.value)}
              />
            </div>
            <button type="submit" className="forgotpassword-page-signup-button">
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
