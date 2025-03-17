import React from "react";
import "./ProfilePage.css";
const ProfilePage = () => {
  return (
    <>
      <div className="profile-page-wrapper">
        <div className="profile-name-card">
          <div className="profile-photo-image"></div>
          <div className="profile-name-item">
            <span>Profile Name</span>
          </div>
        </div>
        <div className="profile-other-details-card">
          <div className="profile-mobile-no-item other-details-item">
            <span>Mobile No :</span>
            <span>9876543210</span>
          </div>
          <div className="profile-mobile-email-item other-details-item">
            <span>Email ID :</span>
            <span>xx@gmail.com</span>
          </div>
          <div className="profile-reset-pass-item other-details-item">
            <span>Reset Password</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
