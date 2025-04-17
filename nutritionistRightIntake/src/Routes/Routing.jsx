import React from "react";
import Login from "../Pages/LoginPage/LoginPage";
import Registration from "../Pages/RegistrationPage/RegistrationPage";
import MainDashboardPage from "../Pages/MainDashboardPage/MainDashboardPage";
import { BrowserRouter, Route, Routes } from "react-router";
import UserDetailsPage from "../Pages/UserDetails/UserDetailsPage";

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
        <Route index path="/userdetailspage" element={<UserDetailsPage />} />

        {/* Admin role */}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingPage;
