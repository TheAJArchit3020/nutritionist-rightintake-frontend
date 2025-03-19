import React from "react";
import Login from "../Pages/LoginPage/LoginPage";
import Registration from "../Pages/RegistrationPage/RegistrationPage";
import MainDashboardPage from "../Pages/MainDashboardPage/MainDashboardPage";
import { BrowserRouter, Route, Routes } from "react-router";

const RoutingPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route index path="/registrationpage" element={<Registration />} />
        <Route
          index
          path="/maindashboardpage"
          element={<MainDashboardPage />}
        />

        {/* Admin role */}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingPage;
