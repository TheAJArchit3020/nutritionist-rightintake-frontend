import React, { useState } from "react";
import "./Navbar.css";
import RightIntakeLogoSVG from "/rightintakefilllogo.svg";
import RightIntakelabelLogo from "/rightintakelabel.svg";
import { Link } from "react-router";

const Navbar = ({ onTabChange }) => {
  // Define nav items with associated icons
  const navItems = [
    { name: "Meeting Schedule", icon: "/clock.svg", icon2: "/clocksolid.svg" },
    {
      name: "All Meeting",
      icon: "/rectanglelist.svg",
      icon2: "/rectanglelistsolid.svg",
    },
    { name: "Create Plan", icon: "/pen.svg", icon2: "/pensolid.svg" },
    { name: "Profile", icon: "/profile.svg", icon2: "/profilesolid.svg" },
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
              <img src={RightIntakeLogoSVG} alt="Right Intake Logo" />
              <img src={RightIntakelabelLogo} alt="Right Intake Label" />
              <img
                src="./righticon.png"
                alt="Toggle Navbar"
                style={{ marginLeft: "1rem", cursor: "pointer" }}
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
                  <img src={activeTab === item.name ? item.icon2 : item.icon} alt={item.name} />
                  <span className="nav-text">{item.name}</span>
                </div>
              ))}
            </div>
            <Link to={"/"}>
              <div className="navbar-logout-btn">
                <img src="/signoutsvg.svg" alt="Sign Out" />
                <span>Log out</span>
              </div>
            </Link>
          </div>
        </div>
      )}
      {!showNavbar && (
        <img
          src="./barssolid.svg"
          alt="Expand Navbar"
          style={{
            width: "30px",
            position: "absolute",
            left: "0",
            margin: "1rem",
            cursor: "pointer",
          }}
          onClick={toggleNavbar}
        />
      )}
    </>
  );
};

export default Navbar;
