import React, { useRef, useState } from "react";
import "./CreatePlanPage.css";
import axios from "axios";
import { createplanapi } from "../../Apis/Apis";

const CreatePlanPage = ({ parseusertoken }) => {
  const token = parseusertoken?.token;

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

  // Pricing State
  const [prices, setPrices] = useState({});

  // File state for the uploaded cover photo
  const [file, setFile] = useState(null);

  // Available Options
  const durations = ["1 Month", "3 Months", "6 Months", "1 Year"];
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
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const callLimits = ["30 mins", "60 mins", "90 mins"];

  // Toggle selection for multi-select
  const toggleSelection = (item, setState, state) => {
    if (state.includes(item)) {
      setState(state.filter((i) => i !== item));
    } else {
      setState([...state, item]);
    }
  };

  // Handle price input changes
  const handlePriceChange = (duration, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [duration]: value ? parseInt(value) : 0,
    }));
  };

  // Handle file selection (either through file input or drag-and-drop)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle drag and drop events
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Create plan handler
  const CreatePlanHandler = async () => {
    try {
      if (token) {
        const payload = {
          name: planName,
          description,
          benefits,
          features,
          duration: selectedDurations,
          callDuration: callTimeLimit,
          availableDays: selectedDays,
          availableTimes: selectedTimeSlots,
          prices,
          file, // Include the file in the payload if you need it to be uploaded
        };

        const response = await axios.post(createplanapi, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          alert(response.data.message);
          // Reset form values
          setPlanName("");
          setBenefits("");
          setFeatures("");
          setDescription("");
          setCallTimeLimit("30 mins");
          setSelectedDurations([]);
          setSelectedTimeSlots([]);
          setSelectedDays([]);
          setPrices({});
          setFile(null); // Reset the file after submission
        }

        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create a ref for the file input element
  const fileInputRef = useRef(null);

  return (
    <div className="create-plan-page-container">
      <div className="create-plan-form-wrapper">
        {/* section1 */}
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

          {/* Description */}
          <div className="create-plan-form-group create-plan-description">
            <label>Description</label>
            <textarea
              type="text"
              rows="20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          {/* Plan Duration */}
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
                    selectedTimeSlots.includes(slot)
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
        </div>

        {/* section2 */}
        <div className="create-plan-section2">
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

          {/* Available Days (Multi-Select) */}
          <div className="create-plan-form-group">
            <label>Available days</label>
            <div className="create-plan-multi-select">
              {days.map((day) => (
                <div
                  key={day}
                  className={`create-plan-selection-btn ${
                    selectedDays.includes(day)
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

          {/* File Upload Section */}
          <div className="create-plan-form-group">
            <label>Add a cover for your plan</label>
            <div
              className="create-plan-upload-coverphoto-container"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {/* Display file preview or placeholder */}
              {file ? (
                <div className="image-preview-container">
                  <img
                    src={URL.createObjectURL(file)} // Display the selected file as an image
                    alt="Uploaded Cover"
                    className="uploaded-image-preview"
                  />
                </div>
              ) : (
                <>
                  <p>Drag & drop file here</p>
                  <p>or</p>
                </>
              )}
              <button
                className="create-plan-uploadimage-button"
                onClick={() => fileInputRef.current.click()} // Trigger the file input click
              >
                <p>Choose a file</p>
                <img src="./uploadphotoimage.svg" alt="uploadphotoimage" />
              </button>
              <input
                ref={fileInputRef} // Attach the file input to the ref
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }} // Keep it hidden
              />
            </div>
          </div>
        </div>
      </div>
      <div className="create-plan-pricing-inputs-group">
        {selectedDurations.length > 0 && (
          <div className="create-plan-form-group pricing-div">
            {selectedDurations.map((duration, index) => (
              <div className="pricing-div-inputes" key={index}>
                <label>Plan Price ({duration})</label>
                <div key={duration} className="create-plan-pricing-input">
                  <input
                    type="number"
                    placeholder={`Enter price for ${duration}`}
                    onChange={(e) =>
                      handlePriceChange(duration, e.target.value)
                    }
                  />
                  {/* <p className="create-plan-pricing-inputtext"><i>INR</i></p> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="submit-plan-creation-btn" onClick={CreatePlanHandler}>
        <span>Create Plan</span>
      </div>
    </div>
  );
};

export default CreatePlanPage;
