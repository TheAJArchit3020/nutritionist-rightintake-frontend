import React, { useState } from "react";
import "./Navbar.css";
import RightIntakeLogoSVG from "/rightintakefilllogo.svg";
import RightIntakelabelLogo from "/rightintakelabel.svg";
import ClockSvg from "/clocksvg.svg";
import PencilSvg from "/pencilsvg.svg";
import ProfileSvg from "/profilesvg.svg";
import { Link } from "react-router";
const Navbar = ({ onTabChange }) => {
  // Define nav items with associated icons
  const navItems = [
    { name: "Meeting Schedule", icon: "/clocksvg.svg" },
    { name: "All Meeting", icon: "/clocksvg.svg" },
    { name: "Create Plan", icon: "/pencilsvg.svg" },
    { name: "Profile", icon: "/profilesvg.svg" },
  ];

  // State to track active tab
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const [showNavbar, setShowNavbar] = useState(true);

  // Function to handle tab change
  const OnNavbarBtnClick = (item) => {
    setActiveTab(item.name);
    onTabChange(item.name);
  };

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <>
      {showNavbar && (
        <div className="navbar-container">
          <div className="navbar-wrapper">
            <div className="nav-bar-logo">
              <img src={RightIntakeLogoSVG} alt="" />
              <img src={RightIntakelabelLogo} alt="" />
              <img
                src="./righticon.png"
                alt=""
                style={{ marginLeft: "1rem" }}
                onClick={toggleNavbar}
              />
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
            <Link to={"/"}>
              <div className="navbar-logout-btn">
                <img src="/signoutsvg.svg" alt="" />
                <span>Log out</span>
              </div>
            </Link>
          </div>
        </div>
      )}
      {/* <img
        src="./barssolid.svg"
        alt=""
        style={{ marginLeft: "1rem" }}
        onClick={toggleNavbar}
      /> */}
    </>
  );
};

export default Navbar;
