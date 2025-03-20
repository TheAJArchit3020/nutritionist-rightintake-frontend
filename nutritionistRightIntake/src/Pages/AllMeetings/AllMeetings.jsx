import React, { useEffect, useRef, useState } from "react";
import "./AllMeetings.css";
import { Link } from "react-router";
import axios from "axios";
import { getallmeetings } from "../../Apis/Apis";

const AllMeetings = (parseusertoken) => {


  const token = parseusertoken?.parseusertoken?.token;
  console.log("GetAllMeetings",{token})

  const fetched = useRef(false);
  const [allmeetingArray, setAllmeetingArray] = useState([]);

  useEffect(() => {
    if (token && !fetched.current) {
      fetched.current = true;
      GetAllMeetings(token);
    }
  }, [token]);

  const GetAllMeetings = async (token) => {

    try {
      const allmeetingsResponse = await axios.get(getallmeetings, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (allmeetingsResponse.status === 200) {
        console.log(allmeetingsResponse.data.meetings);
        setAllmeetingArray(allmeetingsResponse.data.meetings);
      } else {
        console.error(allmeetingsResponse);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="allmeeting-container">
      <div className="allmeeting-header-wrapper">
        <h2>All Meetings</h2>
        {/* <Link to={"./maindashboardpage"}>
          <button type="button" className="allmeeting-back-button">
            back
          </button>
        </Link> */}
      </div>
      <div className="allmeeting-card">
        <div className="meeting-content">
          {allmeetingArray &&
            allmeetingArray?.map((item, index) => {
              return (
                <div className="meeting-item" key={index}>
                  <div className="meeting-time">
                    <span>{item.time}</span>
                  </div>
                  <div className="meeting-link">
                    <img src="/camsvg.svg" alt="" />
                    <span>{item.meetLink}</span>
                  </div>
                  <div className="plan-name">
                    <span>{item.planName}</span>
                  </div>

                  <div className="plan-duration">
                    <span>{item.planTimeRemaining}</span>
                  </div>

                  <div className="user-details">
                    <span>User details</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllMeetings;
