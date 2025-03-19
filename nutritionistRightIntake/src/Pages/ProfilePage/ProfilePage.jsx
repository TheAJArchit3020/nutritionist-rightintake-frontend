import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.css";
import axios from "axios";
import { userprofileapi } from "../../Apis/Apis";

const ProfilePage = ({ parseusertoken }) => {
  const token = parseusertoken?.token;
  const fetched = useRef(false);
  const [profileArray, setProfileArray] = useState([]);

  useEffect(() => {
    if (token && !fetched.current) {
      fetched.current = true;
      GetuserProfile(token);
    }
  }, [token]);

  const GetuserProfile = async (token) => {
    try {
      const profileresponse = await axios.get(userprofileapi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (profileresponse.status === 200) {
        console.log(profileresponse.data);
        setProfileArray(profileresponse.data);
      } else {
        console.error(profileresponse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(profileArray);

  return (
    <div className="profile-page-wrapper">
      <div className="profile-name-card">
        <div className="profile-photo-image"></div>
        <div className="profile-name-item">
          <span>{profileArray?.nutritionist?.name}</span>
        </div>
      </div>
      <div className="profile-other-details-card">
        <div className="profile-mobile-no-item other-details-item">
          <span>Mobile No :</span>
          <span>{profileArray?.nutritionist?.mobileNumber}</span>
        </div>
        <div className="profile-mobile-email-item other-details-item">
          <span>Email ID :</span>
          <span>{profileArray?.nutritionist?.email}</span>
        </div>
        <div className="profile-reset-pass-item other-details-item">
          <span>Reset Password</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
