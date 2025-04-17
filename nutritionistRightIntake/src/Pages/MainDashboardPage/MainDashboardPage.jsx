import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import MeetingSchedule from "../MeetingSchedulePage/MeetingSchedule";
import "./MainDashboardPage.css";
import CreatePlanPage from "../CreatePlanPage/CreatePlanPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import AllMeetings from "../AllMeetings/AllMeetings";

const MainDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("Meeting Schedule");
  const onTabChange = (item) => {
    setActiveTab(item);
  };

  const usertoken = localStorage.getItem("userData");
  const parseusertoken = JSON.parse(usertoken);

  
  return (
    <>
      <div className="main-dashboard-container">
        <Navbar onTabChange={onTabChange} />

        {activeTab === "Meeting Schedule" && (
          <MeetingSchedule parseusertoken={parseusertoken} />
        )}
        {activeTab === "Create Plan" && (
          <CreatePlanPage parseusertoken={parseusertoken} />
        )}
        {activeTab === "Profile" && (
          <ProfilePage parseusertoken={parseusertoken} />
        )}
        {activeTab === "All Meeting" && (
          <AllMeetings parseusertoken={parseusertoken} />
        )}
      </div>
    </>
  );
};

export default MainDashboardPage;
