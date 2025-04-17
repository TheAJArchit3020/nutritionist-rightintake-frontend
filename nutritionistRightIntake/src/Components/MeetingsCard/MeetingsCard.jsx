import React, { useState } from "react";
import "./MeetingsCard.css";
import { useNavigate } from "react-router";


const MeetingsCard = (meetingsArray) => {
  const navigate = useNavigate();
  const MEETINGS = meetingsArray?.meetingsArray?.meetings;

  console.log("meetingsArray in meeting card : ", meetingsArray?.meetingsArray);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserDetailsClick = (user) => {
    console.log({ user });
    setSelectedUser(user);
    navigate(`/userdetailspage`, {
      state: {
        id: user?.userId,
      },
    });
  };

  
  return (
    <>
      <div className="meeting-card-container meeting-card-container-mobile">
        <div className="meeting-card-heading">
          <span>Today's On Boarding Calls</span>
          {/* <button type="button" className="meeting-card-allmeetingbutton"  >See all meetings</button> */}
        </div>
        {MEETINGS?.length > 0 && (
          <div className="meeting-content">
            {MEETINGS &&
              MEETINGS?.map((item, index) => {
                return (
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
                      <img src="/camsvg.svg" alt="Meeting Icon" />
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {item.meetLink}
                      </span>
                    </div>

                    <div className="plan-name">
                      <span>{item.planName}</span>
                    </div>

                    <div className="plan-duration">
                      <span>{item.planTimeRemaining}</span>
                    </div>

                    <div
                      className="user-details"
                      onClick={() => handleUserDetailsClick(item)}
                    >
                      <span>User details</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {MEETINGS?.length === 0 && <img src="./nomeetingschedule.png" alt="" />}
      </div>

     
    </>
  );
};
export default MeetingsCard;
