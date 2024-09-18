import React, { useState, useEffect } from "react";
import "./navbar.css";
import config from "../../config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    // Function to check token validity and handle expiration
    const checkTokenValidity = () => {
      const token = localStorage.getItem("authToken");
      const storedExpiryTime = localStorage.getItem("expiryTime");
      const now = new Date().getTime();

      if (token && storedExpiryTime) {
        if (now > storedExpiryTime) {
          // Token is expired, remove it and log out the user
          localStorage.removeItem("authToken");
          localStorage.removeItem("userId");
          localStorage.removeItem("expiryTime");
          setIsLoggedIn(false); // Token is expired, mark the user as logged out
          console.log("Token has expired.");
        } else {
          // Token is still valid
          setIsLoggedIn(true);
          fetchUserProfile(token); // Fetch the profile image if logged in
        }
      } else {
        setIsLoggedIn(false); // No valid token found
      }
    };

    // Run the token validity check
    checkTokenValidity();
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${config.apiURL}/api/getprofile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfileImage(`${config.apiURL}/${data.profileImage}`);
      } else {
        console.error("Failed to fetch profile", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown("");
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://a2zservicesnc.com/wp-content/uploads/2019/01/A2Z-Logo.png"
          alt="Logo"
          style={{ display: "flex", height: "40px" }}
        />
        <a href="/">A2Z for Shelter</a>
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
        {isLoggedIn && (
          <div className="navbar-profileimage">
            <a href="/profile">
              <img
                src={
                  profileImage ||
                  "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg"
                }
                alt="Profile"
                className="navbar-profile-image"
              />
            </a>
          </div>
        )}
      </button>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <a href="/" className="navbar-link">
          Home
        </a>
        <div
          className={`navbar-dropdown ${
            activeDropdown === "land" ? "active" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("land")}
          onMouseLeave={handleMouseLeave}
        >
          <span onClick={() => toggleDropdown("land")}>
            Land
            <span
              className={`dropdown-arrow ${
                activeDropdown === "land" ? "rotate" : ""
              }`}
            >
              ▼
            </span>
          </span>
          <div className="dropdown-menu">
            <a href="#">Land Option 1</a>
            <a href="#">Land Option 2</a>
          </div>
        </div>

        {/* <div
          className={`navbar-dropdown ${
            activeDropdown === "interiors" ? "active" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("interiors")}
          onMouseLeave={handleMouseLeave}
        >
          <span onClick={() => toggleDropdown("interiors")}>
            Interiors
            <span
              className={`dropdown-arrow ${
                activeDropdown === "interiors" ? "rotate" : ""
              }`}
            >
              ▼
            </span>
          </span>
          <div className="dropdown-menu">
            <a href="#">Wall & Table Decor</a>
            <a href="#">Soft Furnishings</a>
            <a href="#">Furniture</a>
            <a href="#">Storage & Organization</a>
            <a href="#">Lighting</a>
            <a href="#">Plants & Natural Elements</a>
            <a href="#">Textiles & Accessories</a>
            <a href="#">Tiles</a>
            <a href="#">Paints</a>
            <a href="#">False Ceiling (Parceiling) Products</a>
            <a href="#">Bathroom Products</a>
            <a href="#">Kitchen Products</a>
          </div>
        </div> */}

        <div
          className={`navbar-dropdown ${
            activeDropdown === "buy" ? "active" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("buy")}
          onMouseLeave={handleMouseLeave}
        >
          <span onClick={() => toggleDropdown("buy")}>
            Buy
            <span
              className={`dropdown-arrow ${
                activeDropdown === "buy" ? "rotate" : ""
              }`}
            >
              ▼
            </span>
          </span>
          <div className="dropdown-menu">
            <a href="/cementall">Cement</a>
            <a href="/houseall">House</a>
            <a href="/pgall">PG Hostel</a>
            <a href="/cateringall">Catering</a>
            <a href="/pipewireall">Pipes & Wires</a>
            <a href="/sandall">Sand</a>
            <a href="/steelall">Steel</a>
            <a href="/stoneall">Stone</a>
            <a href="/woodall">Wood</a>
          </div>
        </div>

        <div
          className={`navbar-dropdown ${
            activeDropdown === "sell" ? "active" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("sell")}
          onMouseLeave={handleMouseLeave}
        >
          <span onClick={() => toggleDropdown("sell")}>
            Sell
            <span
              className={`dropdown-arrow ${
                activeDropdown === "sell" ? "rotate" : ""
              }`}
            >
              ▼
            </span>
          </span>
          <div className="dropdown-menu">
            <a href="/sellDashBoard">Seller DashBoard</a>
            {/* <a href="#">Cement</a>
            <a href="#">House</a>
            <a href="#">Pipes & Wires</a>
            <a href="#">Sand</a>
            <a href="#">Steel</a>
            <a href="#">Stone</a>
            <a href="#">Wood</a> */}
          </div>
        </div>
        <div
          className={`navbar-dropdown ${
            activeDropdown === "design" ? "active" : ""
          }`}
          onMouseEnter={() => handleMouseEnter("design")}
          onMouseLeave={handleMouseLeave}
        >
          <span onClick={() => toggleDropdown("design")}>
            Design
            <span
              className={`dropdown-arrow ${
                activeDropdown === "design" ? "rotate" : ""
              }`}
            >
              ▼
            </span>
          </span>
          <div className="dropdown-menu">
            <a href="/2dplan">2D-Design</a>
            <a href="/house3d">3D-design</a>
          </div>
        </div>

        <a href="/agentsList" className="navbar-link">
          Agents
        </a>
        <a href="/post" className="navbar-link">
          Post Properties
        </a>
        <a href="#footer" className="navbar-link">
          Contact Us
        </a>
        <a href="/help" className="navbar-link">
          Help
        </a>

        <div className="navbar-auth">
          {isLoggedIn ? (
            <div className="navbar-profileimage">
              <a href="/profile">
                <img
                  src={
                    profileImage ||
                    "https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg"
                  } // Fallback to default image
                  alt="Profile"
                  className="navbar-profile-image"
                  style={{ borderRadius: "50%" }}
                />
              </a>
            </div>
          ) : (
            <>
              <a href="/login" className="navbar-button">
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
