import React, { useState, useRef } from "react";
import "./OtpPage.css";

const OtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Convert array to string
    console.log("Entered OTP:", enteredOtp);
  };

  return (
    <div className="otp-page-container">
      <img src="./loginimage.svg" alt="otp" />
      <div className="otp-page-container-wrapper">
        <div className="otp-page-container-content">
          <div className="otp-page-section1">
            <img src="./rightintakefilllogo.svg" alt="logo" />
            <img src="./rightintakelabel.svg" alt="logo" />
          </div>
          <div className="otp-page-section2">
            <p className="otp-page-section2-para1">Forget your password?</p>
            <p className="otp-page-section2-para2">
              No worries, we will send you reset instructions
            </p>
          </div>
          <form className="otp-page-section3" onSubmit={handleSubmit}>
            <div className="otp-input-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="otp-input"
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
            <button type="submit" className="otp-page-signup-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
