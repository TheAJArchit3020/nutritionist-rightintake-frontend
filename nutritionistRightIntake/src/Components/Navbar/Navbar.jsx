import React, { useState } from "react";
import "./Navbar.css";
import RightIntakeLogoSVG from "/rightintakelogo.svg";
import ClockSvg from "/clocksvg.svg";
import PencilSvg from "/pencilsvg.svg";
import ProfileSvg from "/profilesvg.svg";
const Navbar = ({ onTabChange }) => {
  // Define nav items with associated icons
  const navItems = [
    { name: "Meeting Schedule", icon: "/clocksvg.svg" },
    { name: "Create Plan", icon: "/pencilsvg.svg" },
    { name: "Profile", icon: "/profilesvg.svg" },
  ];

  // State to track active tab
  const [activeTab, setActiveTab] = useState(navItems[0].name);

  // Function to handle tab change
  const OnNavbarBtnClick = (item) => {
    setActiveTab(item.name);
    onTabChange(item.name);
  };
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <div className="nav-bar-logo">
            <img src={RightIntakeLogoSVG} alt="" />
          </div>
          <div className="navbar-buttons">
            {navItems.map((item) => (
              <div
                key={item.name}
                className={`navbar-btn ${
                  activeTab === item.name ? "navbar-btn-active" : ""
                }`}
                onClick={() => OnNavbarBtnClick(item)}
              >
                <img src={item.icon} alt="" />
                <span className="nav-text">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="navbar-logout-btn">
            <img src="/signoutsvg.svg" alt="" />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
