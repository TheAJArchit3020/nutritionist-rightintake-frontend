import React, { useState } from "react";
import "./MeetingsCard.css";

const UserDetailsPopup = ({ togglePopup }) => {
  return (
    <>
      <div
        className="meetings-card-popup-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="meetings-card-close-popup" onClick={togglePopup}>
          <img src="/cross-black.svg" alt="" />
        </div>
        <div className="u-d-popup-name">
          <div className="popup-label">
            <span>Name</span>
          </div>
          <div className="u-d-name">
            <span>Archit Janugade</span>
          </div>
        </div>
        <div className="u-d-popup-name">
          <div className="popup-label">
            <span>Height</span>
          </div>
          <div className="u-d-name">
            <span>177cm</span>
          </div>
        </div>
        <div className="u-d-popup-name">
          <div className="popup-label">
            <span>Weight</span>
          </div>
          <div className="u-d-name">
            <span>77 KG</span>
          </div>
        </div>
      </div>
    </>
  );
};
const MeetingsCard = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      <div className="meeting-card-container">
        <div className="meeting-card-heading">
          <span>Today's On Boarding Calls</span>
        </div>
        <div className="meeting-content">
          <div className="meeting-item">
            <div className="meeting-time">
              <span>1:00pm</span>
            </div>
            <div className="meeting-link">
              <img src="/camsvg.svg" alt="" />
              <span>https://meet.google.com/XXXX-YZZZ-YYYY</span>
            </div>
            <div className="plan-name">
              <span>Plan Name</span>
            </div>

            <div className="plan-duration">
              <span>3 months</span>
            </div>

            <div className="user-details">
              <span>User details</span>
            </div>
          </div>
          <div className="meeting-item">
            <div className="meeting-time">
              <span>1:00pm</span>
            </div>
            <div className="meeting-link">
              <img src="/camsvg.svg" alt="" />
              <span>https://meet.google.com/XXXX-YZZZ-YYYY</span>
            </div>
            <div className="plan-name">
              <span>Plan Name</span>
            </div>

            <div className="plan-duration">
              <span>3 months</span>
            </div>

            <div className="user-details" onClick={togglePopup}>
              <span>User details</span>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="meetings-card-popup-overlay">
          <UserDetailsPopup togglePopup={togglePopup} />
        </div>
      )}
    </>
  );
};
export default MeetingsCard;
