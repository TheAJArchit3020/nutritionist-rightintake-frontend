import React from "react";
import MeetingsCard from "../../Components/MeetingsCard/MeetingsCard";
import "./MeetingSchedule.css";
import YourPlansCard from "../../Components/YourPlansCard/YourPlansCard";
import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";
const MeetingSchedule = () => {
  return (
    <>
      <div className="meetingschedule-container">
        <MeetingsCard />
        <div className="meeting-schedule-card-wrapper">
          <AnalyticsCard />
          <YourPlansCard />
        </div>
      </div>
    </>
  );
};
export default MeetingSchedule;
