import React, { useState } from "react";
import "./MeetingsCard.css";

const UserDetailsPopup = ({ selectedUser, closePopup }) => {
  console.log(selectedUser);
  return (
   
    <div className="overlay" onClick={closePopup}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closePopup}>
          &times;
        </button>
        <p>
          <strong>Name:</strong> {selectedUser?.fullName || "Sumit Solapurkar"}
        </p>
        <p>
          <strong>Height:</strong> {selectedUser?.height || "165"} cm
        </p>
        <p>
          <strong>Weight:</strong> {selectedUser?.weight || "72"} kg
        </p>
      </div>
    </div>
  );
};
const MeetingsCard = (meetingsArray) => {
  const MEETINGS = meetingsArray?.meetingsArray?.meetings;

  console.log("meetingsArray in meeting card : ", meetingsArray?.meetingsArray);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserDetailsClick = (user) => {
    console.log({ user });
    setSelectedUser(user);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
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

      {showPopup && (
        <div className="meetings-card-popup-overlay">
          <UserDetailsPopup
            selectedUser={selectedUser}
            closePopup={closePopup}
          />
        </div>
      )}
    </>
  );
};
export default MeetingsCard;
