import React, { useState } from "react";
import "./CreatePlanPage.css";

const CreatePlanPage = () => {
  // Form States
  const [planName, setPlanName] = useState("");
  const [benefits, setBenefits] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [callTimeLimit, setCallTimeLimit] = useState("30 mins");

  // Multi-select states
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  // Available Options
  const durations = [
    "1 Day",
    "1 Week",
    "1 Month",
    "3 Months",
    "6 Months",
    "1 Year",
  ];
  const timeSlots = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];
  const days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const callLimits = ["30 mins", "60 mins", "90 mins"];

  // Handle multi-select buttons
  const toggleSelection = (item, setState, state) => {
    if (state.includes(item)) {
      setState(state.filter((i) => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  return (
    <div className="create-plan-page-container">
      <div className="create-plan-heading">
        <span>Create your plan</span>
      </div>
      <div className="create-plan-form-wrapper">
        <div className="create-plan-text-input-group">
          <div className="create-plan-form-group">
            <label>Plan Name</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Enter plan name"
            />
          </div>

          {/* Benefits */}
          <div className="create-plan-form-group create-plan-benefits">
            <label>Benefits</label>
            <textarea
              type="text"
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              placeholder="Enter benefits"
            />
          </div>

          {/* Features */}
          <div className="create-plan-form-group create-plan-features">
            <label>Features</label>
            <textarea
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Enter features"
            />
          </div>

          {/* Description */}
          <div className="create-plan-form-group create-plan-description">
            <label>Description</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
        </div>

        <div className="create-plan-multiselect-group">
          {/* Plan Duration (Multi-Select) */}
          <div className="create-plan-form-group">
            <label>Plan Duration</label>
            <div className="create-plan-multi-select">
              {durations.map((duration) => (
                <div
                  key={duration}
                  className={`create-plan-selection-btn ${
                    selectedDurations.includes(duration)
                      ? "create-plan-selection-btn-active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleSelection(
                      duration,
                      setSelectedDurations,
                      selectedDurations
                    )
                  }
                >
                  {duration}
                </div>
              ))}
            </div>
          </div>

          {/* Available Time Slots (Multi-Select) */}
          <div className="create-plan-form-group">
            <label>Available Time Slots</label>
            <div className="create-plan-multi-select">
              {timeSlots.map((slot) => (
                <div
                  key={slot}
                  className={`create-plan-selection-btn ${
                    selectedDurations.includes(slot)
                      ? "create-plan-selection-btn-active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleSelection(
                      slot,
                      setSelectedTimeSlots,
                      selectedTimeSlots
                    )
                  }
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
          <div className="create-plan-form-group">
            <label>Available days</label>
            <div className="create-plan-multi-select">
              {days.map((day) => (
                <div
                  key={day}
                  className={`create-plan-selection-btn ${
                    selectedDurations.includes(day)
                      ? "create-plan-selection-btn-active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleSelection(day, setSelectedDays, selectedDays)
                  }
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="create-plan-callduration-wrapper">
          {/* Call Time Limit (Dropdown) */}
          <div className="create-plan-form-group">
            <label>On Boarding Call Duration</label>
            <select
              value={callTimeLimit}
              onChange={(e) => setCallTimeLimit(e.target.value)}
            >
              {callLimits.map((limit) => (
                <option key={limit} value={limit}>
                  {limit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="create-plan-pricing-inputs-group">
          {/* Dynamic Plan Pricing */}
          {selectedDurations.length > 0 && (
            <div className="create-plan-form-group">
              <label>Plan Pricing</label>
              {selectedDurations.map((duration) => (
                <div key={duration} className="create-plan-pricing-input">
                  <label>{duration} Price</label>
                  <input
                    type="number"
                    placeholder={`Enter price for ${duration}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="submit-plan-creation-btn">
          <span>Create Plan</span>
        </div>
        {/* Submit Button */}
      </div>
      {/* Plan Name */}
    </div>
  );
};

export default CreatePlanPage;
