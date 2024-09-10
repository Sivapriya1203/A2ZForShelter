// import React, { useState } from "react";
// import "./navbar.css";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState("");

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleMouseEnter = (dropdown) => {
//     setActiveDropdown(dropdown);
//   };

//   const handleMouseLeave = () => {
//     setActiveDropdown("");
//   };

//   const toggleDropdown = (dropdown) => {
//     setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <img
//           src="https://a2zservicesnc.com/wp-content/uploads/2019/01/A2Z-Logo.png"
//           alt="Logo"
//           style={{ display: "flex", height: "40px" }}
//         />
//         <a href="/home">A2Z for Shelter</a>
//       </div>

//       <button className="navbar-toggle" onClick={toggleMenu}>
//         {isOpen ? "✖" : "☰"}
//       </button>

//       <div className={`navbar-links ${isOpen ? "open" : ""}`}>
//         <div
//           className={`navbar-dropdown ${
//             activeDropdown === "land" ? "active" : ""
//           }`}
//           onMouseEnter={() => handleMouseEnter("land")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <span onClick={() => toggleDropdown("land")}>
//             Land
//             <span
//               className={`dropdown-arrow ${
//                 activeDropdown === "land" ? "rotate" : ""
//               }`}
//             >
//               ▼
//             </span>
//           </span>
//           <div className="dropdown-menu">
//             <a href="#">Land Option 1</a>
//             <a href="#">Land Option 2</a>
//           </div>
//         </div>

//         <div
//           className={`navbar-dropdown ${
//             activeDropdown === "interiors" ? "active" : ""
//           }`}
//           onMouseEnter={() => handleMouseEnter("interiors")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <span onClick={() => toggleDropdown("interiors")}>
//             Interiors
//             <span
//               className={`dropdown-arrow ${
//                 activeDropdown === "interiors" ? "rotate" : ""
//               }`}
//             >
//               ▼
//             </span>
//           </span>
//           <div className="dropdown-menu">
//             <a href="#">Wall & Table Decor</a>
//             <a href="#">Soft Furnishings</a>
//             <a href="#">Furniture</a>
//             <a href="#">Storage & Organization</a>
//             <a href="#">Lighting</a>
//             <a href="#">Plants & Natural Elements</a>
//             <a href="#">Textiles & Accessories</a>
//             <a href="#">Tiles</a>
//             <a href="#">Paints</a>
//             <a href="#">False Ceiling (Parceiling) Products</a>
//             <a href="#">Bathroom Products</a>
//             <a href="#">Kitchen Products</a>
//           </div>
//         </div>

//         <div
//           className={`navbar-dropdown ${
//             activeDropdown === "buy" ? "active" : ""
//           }`}
//           onMouseEnter={() => handleMouseEnter("buy")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <span onClick={() => toggleDropdown("buy")}>
//             Buy
//             <span
//               className={`dropdown-arrow ${
//                 activeDropdown === "buy" ? "rotate" : ""
//               }`}
//             >
//               ▼
//             </span>
//           </span>
//           <div className="dropdown-menu">
//             <a href="#">Cement</a>
//             <a href="#">House</a>
//             <a href="#">Pipes & Wires</a>
//             <a href="#">Sand</a>
//             <a href="#">Steel</a>
//             <a href="#">Stone</a>
//             <a href="#">Wood</a>
//           </div>
//         </div>

//         <div
//           className={`navbar-dropdown ${
//             activeDropdown === "sell" ? "active" : ""
//           }`}
//           onMouseEnter={() => handleMouseEnter("sell")}
//           onMouseLeave={handleMouseLeave}
//         >
//           <span onClick={() => toggleDropdown("sell")}>
//             Sell
//             <span
//               className={`dropdown-arrow ${
//                 activeDropdown === "sell" ? "rotate" : ""
//               }`}
//             >
//               ▼
//             </span>
//           </span>
//           <div className="dropdown-menu">
//             <a href="/sellDashBoard">Seller DashBoard</a>
//             <a href="#">Cement</a>
//             <a href="#">House</a>
//             <a href="#">Pipes & Wires</a>
//             <a href="#">Sand</a>
//             <a href="#">Steel</a>
//             <a href="#">Stone</a>
//             <a href="#">Wood</a>
//           </div>
//         </div>

//         <a href="/post" className="navbar-link">
//           Post Properties
//         </a>
//         <a href="#footer" className="navbar-link">
//           Contact Us
//         </a>
//         <a href="/help" className="navbar-link">
//           Help
//         </a>
//       </div>

//       <div className="navbar-auth">
//         <a href="/login" className="navbar-button">
//           Login
//         </a>
//         <a href="/register" className="navbar-button">
//           Register
//         </a>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// =============================================================================
import React, { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Set isLoggedIn based on token presence
  }, []);

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
      </button>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
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

        <div
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
        </div>

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
            <a href="#">Cement</a>
            <a href="#">House</a>
            <a href="#">Pipes & Wires</a>
            <a href="#">Sand</a>
            <a href="#">Steel</a>
            <a href="#">Stone</a>
            <a href="#">Wood</a>
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
            <a href="#">Cement</a>
            <a href="#">House</a>
            <a href="#">Pipes & Wires</a>
            <a href="#">Sand</a>
            <a href="#">Steel</a>
            <a href="#">Stone</a>
            <a href="#">Wood</a>
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
      </div>

      <div className="navbar-auth">
        {isLoggedIn ? (
          // Show profile image if logged in
          <div className="navbar-profileimage">
            <a href="/profile">
              <img
                src="https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg"
                alt="Profile"
                className="navbar-profile-image"
                style={{ borderRadius: "50%" }}
              />
            </a>
          </div>
        ) : (
          // Show login and register if not logged in
          <>
            <a href="/login" className="navbar-button">
              Login
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
