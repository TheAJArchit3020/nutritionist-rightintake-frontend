import React from "react";
import "./YourPlansCard.css";

const YourPlansCard = (meetingsArray) => {
  const ACTIVEPLAN = meetingsArray?.meetingsArray?.activePlans;
  console.log("active plans:", ACTIVEPLAN);
  return (
    <>
      {ACTIVEPLAN && (
        <div className="your-plans-container">
          <div className="your-plans-heading">
            <span>Your Plans</span>
          </div>
          <div className="plans-list">
            {ACTIVEPLAN &&
              ACTIVEPLAN?.map((item, index) => {
                return (
                  <div className="plan-item" key={index}>
                    <div className="plan-img"></div>
                    <div className="plan-short-details">
                      <div className="plan-name">
                        <span>{item?.name}</span>
                      </div>
                      <div className="plan-clients-no">
                        <span>
                          Active clients: {item?.activeClients} members
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {!ACTIVEPLAN && <img src="./noactiveplans.svg" alt="" />}
    </>
  );
};

export default YourPlansCard;
