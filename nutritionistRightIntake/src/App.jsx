import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainDashboardPage from "./Pages/MainDashboardPage/MainDashboardPage";
import Registration from "./Pages/RegistrationPage/RegistrationPage";
import Login from "./Pages/LoginPage/LoginPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPasswordPage";
import OtpPage from "./Pages/OtpPage/OtpPage";
import CreateNewPassword from "./Pages/ForgotPassword/CreateNewPasswordPage";
import RoutingPage from "./Routes/Routing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RoutingPage />
      {/* <Registration /> */}
      {/* <Login /> */}
      {/* <ForgotPassword /> */}
      {/* <OtpPage /> */}
      {/* <CreateNewPassword /> */}
      {/* <MainDashboardPage /> */}
    </>
  );
}

export default App;
