import React, { useEffect, useState } from "react";
import "./UserDetailsPage.css";
import { getclientdetailsapi } from "../../Apis/Apis";
import { useLocation } from "react-router";
import axios from "axios";

const UserDetailsPage = () => {
  const [clientDetails, setClientDetails] = useState([]);
  const [clientTrackingDetails, setClientTrackingDetails] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { state } = useLocation();
  const usertoken = localStorage.getItem("userData");
  const parseusertoken = JSON.parse(usertoken);
  const token = parseusertoken?.token;

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(
          `${getclientdetailsapi}/${state?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log(response.data);
          setClientDetails(response.data.userDetails);
        } else {
          console.error("Error fetching client details");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchClientDetails();
  }, []);

  const fetchClientTrackingDetails = async () => {
    console.log(fromDate, toDate, currentPage);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.rightintake.com/api/app/nutri/clients/${state?.id}/tracking?from=${fromDate}&to=${toDate}&page=${currentPage}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setClientTrackingDetails(response.data.trackingData);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    // Only render pagination if we have more than 1 page
    if (!totalPages || totalPages <= 1) return null;

    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
      >
        &lt;
      </button>
    );

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="pagination-ellipsis">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
      >
        &gt;
      </button>
    );

    return buttons;
  };

  // Add useEffect to fetch data when page changes
  useEffect(() => {
    if (state?.id) {
      fetchClientTrackingDetails();
    }
  }, [currentPage]); // Add currentPage as dependency

  // Format date string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    });
  };

  // Format time string
  const formatTime = (dateString) => {
    return new Date(dateString)
      .toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/\s/g, "");
  };

  const groupMealsByDateAndType = (trackingData) => {
    const groupedData = [];

    trackingData?.forEach((dayData) => {
      const date = dayData.dayDate;
      const mealTypes = ["breakfast", "lunch", "snacks", "dinner"];

      mealTypes.forEach((mealType) => {
        const items = dayData.trackedItems[mealType] || [];
        if (items.length > 0) {
          items.forEach((item) => {
            groupedData.push({
              date,
              mealType: mealType.charAt(0).toUpperCase() + mealType.slice(1),
              timeLogged: item.trackedAt,
              mealName: item.dishId.description,
              protein: item.dishId.protein,
              carbs: item.dishId.carbohydrates,
              fats: item.dishId.fat,
              calories: item.dishId.calories,
              waterIntake: dayData.waterIntake,
              totalProtein: dayData.totalProtein,
              totalCarbs: dayData.totalCarbohydrates,
              totalFats: dayData.totalFats,
              totalCalories: dayData.totalDayCalories,
            });
          });
        }
      });
    });

    return groupedData;
  };

  const renderTableRows = (data) => {
    if (!data?.length) return null;

    let currentDate = "";
    let currentMealType = "";
    const rows = [];

    data.forEach((item, index) => {
      const isNewDate = currentDate !== item.date;
      const isNewMealType = currentMealType !== item.mealType;

      // Add meal type divider if it's a new meal type
      if (isNewMealType && !isNewDate && index > 0) {
        rows.push(
          <tr key={`divider-${index}`} className="meal-group-divider">
            <td colSpan="14"></td>
          </tr>
        );
      }

      // Add the meal row
      rows.push(
        <tr key={index} className="meal-group">
          <td>
            {isNewDate ? formatDate(item.date) : ""}
          </td>
          <td>
            {isNewMealType ? item.mealType : ""}
          </td>
          <td>{formatTime(item.timeLogged)}</td>
          <td>{item.mealName}</td>
          <td>{item.protein}</td>
          <td>{item.carbs}</td>
          <td>{item.fats}</td>
          <td>{item.calories}</td>
          <td>{isNewDate ? `${item.waterIntake}l` : ""}</td>
          <td>{isNewDate ? `${item.totalProtein?.toFixed(0)}g` : ""}</td>
          <td>{isNewDate ? `${item.totalCarbs?.toFixed(0)}g` : ""}</td>
          <td>{isNewDate ? `${item.totalFats?.toFixed(0)}g` : ""}</td>
          <td>{isNewDate ? `${item.totalCalories}kcal` : ""}</td>
          <td>
            <div className="view-button-container">
              <img
                src="/searchicon.svg"
                alt="view"
                className="view-button-img"
              />
              <span className="view-button">View</span>
            </div>
          </td>
        </tr>
      );

      currentDate = item.date;
      currentMealType = item.mealType;
    });

    return rows;
  };

  return (
    <div className="userdetail-container">
      {/* Header */}
      <div className="userdetail-header">
        <div className="userdetail-header-logo">
          <img
            src="/rightintakefilllogo.svg"
            alt="logo"
            className="userdetail-header-logo-img"
          />
          <img
            src="/rightintakelabel.svg"
            alt="logo-label"
            className="userdetail-header-logo-label"
          />
        </div>
      </div>

      {/* Body */}
      <div className="userdetail-body">
        {/* User Overview */}
        <div className="userdetail-body-container">
          <div className="userdetail-body-left">
            <div className="userdetail-body-left-title-container">
              <span className="userdetail-body-left-title-container-number">
                01
              </span>
              <span className="userdetail-body-left-title-container-title">
                User Overview
              </span>
            </div>
          </div>
          <div className="userdetail-body-right">
            <div className="userdetail-form-container">
              <div className="userdetail-formgroup">
                <label htmlFor="name" className="userdetail-formgroup-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="userdetail-formgroup-input userdetail-formgroup-input-long"
                  value={clientDetails?.fullName}
                  readOnly
                />
              </div>
              <div className="userdetail-formgroup">
                <label htmlFor="age" className="userdetail-formgroup-label">
                  Age
                </label>
                <input
                  type="text"
                  id="age"
                  className="userdetail-formgroup-input userdetail-formgroup-input-number"
                  value={clientDetails?.age}
                  readOnly
                />
              </div>
              <div className="userdetail-formgroup">
                <label
                  htmlFor="mobilenumber"
                  className="userdetail-formgroup-label"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobilenumber"
                  className="userdetail-formgroup-input"
                  value={clientDetails?.mobileNumber}
                  readOnly
                />
              </div>
            </div>
            <div className="userdetail-form-container">
              <div className="userdetail-formgroup">
                <label htmlFor="weight" className="userdetail-formgroup-label">
                  Weight
                </label>
                <input
                  type="text"
                  id="weight"
                  className="userdetail-formgroup-input userdetail-formgroup-input-number"
                  value={clientDetails?.weight}
                  readOnly
                />
              </div>
              <div className="userdetail-formgroup">
                <label htmlFor="height" className="userdetail-formgroup-label">
                  Height
                </label>
                <input
                  type="text"
                  id="height"
                  className="userdetail-formgroup-input userdetail-formgroup-input-number"
                  value={clientDetails?.height}
                  readOnly
                />
              </div>
              <div className="userdetail-formgroup">
                <label htmlFor="gender" className="userdetail-formgroup-label">
                  Gender
                </label>
                <input
                  type="text"
                  id="gender"
                  className="userdetail-formgroup-input"
                  value={clientDetails?.gender}
                  readOnly
                />
              </div>
            </div>
            <div className="userdetail-form-container">
              <div className="userdetail-formgroup">
                <label htmlFor="mailid" className="userdetail-formgroup-label">
                  Mail ID
                </label>
                <input
                  type="text"
                  id="mailid"
                  className="userdetail-formgroup-input userdetail-formgroup-input-long"
                  value={clientDetails?.email}
                  readOnly
                />
              </div>
              <div className="userdetail-formgroup">
                <label
                  htmlFor="healthcondition"
                  className="userdetail-formgroup-label"
                >
                  Health Condition
                </label>
                <input
                  type="text"
                  id="healthcondition"
                  className="userdetail-formgroup-input"
                  value={clientDetails?.healthConditions}
                  readOnly
                />
              </div>
            </div>
            <div className="userdetail-form-container">
              <div className="userdetail-formgroup">
                <label htmlFor="goal" className="userdetail-formgroup-label">
                  Goal
                </label>
                <input
                  type="text"
                  id="goal"
                  className="userdetail-formgroup-input userdetail-formgroup-input-long"
                  value={clientDetails?.primaryGoal}
                  readOnly
                />
              </div>
              <div className="userdetail-formgroup">
                <label
                  htmlFor="allergies"
                  className="userdetail-formgroup-label"
                >
                  Allergies
                </label>
                <input
                  type="text"
                  id="allergies"
                  className="userdetail-formgroup-input"
                  value={clientDetails?.allergies}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="userdetail-body-container-divider" />

        {/* Daily Tracking */}
        <div className="dailytracking-body-container">
          <div className="dailytracking-body-container-wrapper">
            <div className="dailytracking-body-left">
              <div className="dailytracking-body-left-title-container">
                <span className="dailytracking-body-left-title-container-number">
                  02
                </span>
                <span className="dailytracking-body-left-title-container-title">
                  Daily Tracking
                </span>
              </div>
            </div>
            <div className="dailytracking-body-right">
              <div className="dailytracking-body-right-container">
                <div className="dailytracking-body-right-container-filter-container">
                  <div className="dailytracking-body-right-container-filter-inputes">
                    <img
                      src="/filtericon.svg"
                      alt="filter"
                      className="dailytracking-body-right-container-filter-img"
                    />
                    <span className="dailytracking-body-right-container-filter-inputes-text">
                      Filter By:
                    </span>
                  </div>
                  <div className="dailytracking-body-right-container-filter-inputes">
                    <span className="dailytracking-body-right-container-filter-inputes-text">
                      From
                    </span>
                    <input
                      type="date"
                      className="dailytracking-body-right-container-filter-input"
                      pattern="\d{4}-\d{2}-\d{2}"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="dailytracking-body-right-container-filter-inputes">
                    <span className="dailytracking-body-right-container-filter-inputes-text">
                      To
                    </span>
                    <input
                      type="date"
                      className="dailytracking-body-right-container-filter-input"
                      pattern="\d{4}-\d{2}-\d{2}"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <div
                    className="dailytracking-body-right-container-filter-searchbutton"
                    onClick={fetchClientTrackingDetails}
                  >
                    <span className="dailytracking-body-right-container-filter-searchbutton-text">
                      Search
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {clientTrackingDetails && clientTrackingDetails.length > 0 ? (
            <>
            <div className="userdetail-table-container">
              <div className="table-wrapper">
                <table className="userdetail-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Meal Time</th>
                      <th>Time logged</th>
                      <th>Meal Name</th>
                      <th>Protein (g)</th>
                      <th>Carbs (g)</th>
                      <th>Fats (g)</th>
                      <th>Calories</th>
                      <th>Water Intake</th>
                      <th>Total Protein</th>
                      <th>Total Carbs</th>
                      <th>Total Fats</th>
                      <th>Total Calories</th>
                      <th>View Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableRows(
                      groupMealsByDateAndType(clientTrackingDetails)
                    )}
                  </tbody>
                </table>
              </div>
               
            </div>
             <div className="pagination-container">
             {renderPaginationButtons()}
           </div>
            </>
          ) : (
            <div className="no-data-container">
              <span className="no-data-text">
                No records found. Try adjusting your filters or check back later
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
