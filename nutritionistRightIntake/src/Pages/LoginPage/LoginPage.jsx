import React, { useState } from "react";
import "./LoginPage.css";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const passwordToggleHandler = () => {
    setTogglePassword(!togglePassword);
  };

  console.log(formData);

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
              Welcome back to right intake
            </p>
          </div>
          <form className="login-page-section3">
            <div className="form-group">
              <input
                className="login-page-form-input"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => inputChangeHandler("email", e.target.value)}
              />
            </div>
            <div className="form-group pass-toggle">
              <input
                className="login-page-form-input"
                type={togglePassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => inputChangeHandler("password", e.target.value)}
              />
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
