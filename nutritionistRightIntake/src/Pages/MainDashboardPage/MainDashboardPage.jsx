import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import MeetingSchedule from "../MeetingSchedulePage/MeetingSchedule";
import "./MainDashboardPage.css";
import CreatePlanPage from "../CreatePlanPage/CreatePlanPage";
import ProfilePage from "../ProfilePage/ProfilePage";
const MainDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("Meeting Schedule");
  const onTabChange = (item) => {
    setActiveTab(item);
  };
  return (
    <>
      <div className="main-dashboard-container">
        <Navbar onTabChange={onTabChange} />
        {activeTab === "Meeting Schedule" && <MeetingSchedule />}
        {activeTab === "Create Plan" && <CreatePlanPage />}
        {activeTab === "Profile" && <ProfilePage />}
      </div>
    </>
  );
};

export default MainDashboardPage;
