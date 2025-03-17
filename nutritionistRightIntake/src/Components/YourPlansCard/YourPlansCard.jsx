import React from "react";
import "./YourPlansCard.css";
const YourPlansCard = () => {
  return (
    <>
      <div className="your-plans-container">
        <div className="your-plans-heading">
          <span>Your Plans</span>
        </div>
        <div className="plans-list">
          <div className="plan-item">
            <div className="plan-img"></div>
            <div className="plan-short-details">
              <div className="plan-name">
                <span>Program name</span>
              </div>
              <div className="plan-clients-no">
                <span>Active clients: 6 members</span>
              </div>
            </div>
          </div>
          <div className="plan-item">
            <div className="plan-img"></div>
            <div className="plan-short-details">
              <div className="plan-name">
                <span>Program name</span>
              </div>
              <div className="plan-clients-no">
                <span>Active clients: 6 members</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourPlansCard;
