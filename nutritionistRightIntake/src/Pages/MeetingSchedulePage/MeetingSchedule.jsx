import React, { useEffect, useRef, useState } from "react";
import MeetingsCard from "../../Components/MeetingsCard/MeetingsCard";
import "./MeetingSchedule.css";
import YourPlansCard from "../../Components/YourPlansCard/YourPlansCard";
import AnalyticsCard from "../../Components/AnalyticsCard/AnalyticsCard";
import axios from "axios";
import { gettodaysmeetingapi } from "../../Apis/Apis";

const MeetingSchedule = ({ parseusertoken }) => {
  const token = parseusertoken?.token;
  const fetched = useRef(false);

  const [meetingsArray, setMeetingsArray] = useState([]);

  useEffect(() => {
    if (token && !fetched.current) {
      fetched.current = true;
      GetTodaysMeetingHandler(token);
    }
  }, [token]);

  const GetTodaysMeetingHandler = async () => {
    try {
      const todaysmeetingResponse = await axios.get(gettodaysmeetingapi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (todaysmeetingResponse.status === 200) {
        setMeetingsArray(todaysmeetingResponse.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="meetingschedule-container">
        <MeetingsCard meetingsArray={meetingsArray} />
        <div className="meeting-schedule-card-wrapper">
          <AnalyticsCard meetingsArray={meetingsArray} />
          <YourPlansCard meetingsArray={meetingsArray} />
        </div>
      </div>
    </>
  );
};
export default MeetingSchedule;
