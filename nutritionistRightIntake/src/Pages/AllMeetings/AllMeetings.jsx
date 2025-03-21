import React, { useEffect, useRef, useState } from "react";
import "./AllMeetings.css";
import axios from "axios";
import { getallmeetings } from "../../Apis/Apis";

const AllMeetings = ({ parseusertoken }) => {
  const token = parseusertoken?.token;
  const fetched = useRef(false);
  const [allmeetingArray, setAllmeetingArray] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (token && !fetched.current) {
      fetched.current = true;
      GetAllMeetings(token);
    }
  }, [token]);

  const GetAllMeetings = async (token) => {
    try {
      const allmeetingsResponse = await axios.get(getallmeetings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (allmeetingsResponse.status === 200) {
        setAllmeetingArray(allmeetingsResponse.data.meetings);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDetailsClick = (user) => {
    console.log(user);
    setSelectedUser(user);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="allmeeting-container">
        <div className="allmeeting-header-wrapper">
          <h2>All Meetings</h2>
        </div>
        {allmeetingArray && (
          <>
            <div className="allmeeting-card">
              <div className="meeting-content">
                {allmeetingArray.map((item, index) => (
                  <div className="meeting-item" key={index}>
                    <div className="meeting-time">
                      <span>{item.time}</span>
                    </div>
                    <div
                      className="meeting-link"
                      onClick={() =>
                        window.open(
                          item.meetLink,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                    >
                      <img src="/camsvg.svg" alt="" />
                      <span>{item.meetLink}</span>
                    </div>
                    <div className="plan-name">
                      <span>{item.planName}</span>
                    </div>
                    <div className="plan-duration">
                      <span>{item.planTimeRemaining}</span>
                    </div>
                    <div
                      className="user-details"
                      onClick={() => handleUserDetailsClick(item.user)}
                    >
                      <span>User details</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {showPopup && (
              <div className="overlay" onClick={closePopup}>
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                  <button className="close-btn" onClick={closePopup}>
                    &times;
                  </button>
                  <p>
                    <strong>Name:</strong> {selectedUser?.fullName}
                  </p>
                  <p>
                    <strong>Height:</strong> {selectedUser?.height} cm
                  </p>
                  <p>
                    <strong>Weight:</strong> {selectedUser?.weight} kg
                  </p>
                </div>
              </div>
            )}
          </>
        )}
        {!allmeetingArray && <img src="./noactiveplans.svg" alt="" />}
      </div>
    </>
  );
};

export default AllMeetings;
