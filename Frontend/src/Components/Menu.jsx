// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Menu.css";

// function Menu() {
//   const navigate = useNavigate();
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     if (authToken) {
//       // Optionally, you can add additional token validation here (e.g., token expiration check)
//       setIsAuthorized(true);
//     } else {
//       setIsAuthorized(false);
//     }
//   }, []);

//   if (!isAuthorized) {
//     return (
//       <div className="unauthorized">
//         <h3>Unauthorized Access</h3>
//         <p>You must be logged in to view this page.</p>
//         <button onClick={() => navigate("/login")} className="btn btn-primary">
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="App">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <div className="container">
//           <a className="navbar-brand" href="#">
//             <img
//               src="https://www.shutterstock.com/image-vector/z-logo-real-estate-branding-260nw-2183467921.jpg"
//               style={{ height: "100px" }}
//               alt="logo"
//             />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               {/* Buy Dropdown */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   id="buyDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                 >
//                   Buy
//                 </a>
//                 <ul className="dropdown-menu" aria-labelledby="buyDropdown">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Residential
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Commercial
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Plots
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="login">
//                       Login
//                     </a>
//                   </li>
//                 </ul>
//               </li>

//               {/* Rent Dropdown */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   id="rentDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                 >
//                   Rent
//                 </a>
//                 <ul className="dropdown-menu" aria-labelledby="rentDropdown">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Apartments
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Villas
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Commercial Spaces
//                     </a>
//                   </li>
//                 </ul>
//               </li>

//               {/* Sell Dropdown */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   id="sellDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                 >
//                   Sell
//                 </a>
//                 <ul className="dropdown-menu" aria-labelledby="sellDropdown">
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Residential
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Commercial
//                     </a>
//                   </li>
//                   <li>
//                     <a className="dropdown-item" href="#">
//                       Plots
//                     </a>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Home Loans
//                 </a>
//               </li>

//               <li className="nav-item">
//                 <a className="nav-link btn btn-warning text-white" href="#">
//                   Post Property
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Welcome Section */}
//       <div className="container mt-4">
//         <div className="d-flex justify-content-center mt-4">
//           <button className="btn btn-primary">Buy</button>
//           <button className="btn btn-secondary ms-2">Rent</button>
//           <button className="btn btn-secondary ms-2">New Projects</button>
//           <button className="btn btn-secondary ms-2">PG</button>
//           <button className="btn btn-secondary ms-2">Plot</button>
//           <button className="btn btn-secondary ms-2">Commercial</button>
//         </div>

//         {/* Search Bar */}
//         <div className="mt-4">
//           <div className="input-group">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Coimbatore"
//             />
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Add more..."
//             />
//             <input type="text" className="form-control" placeholder="Flat +2" />
//             <input type="text" className="form-control" placeholder="Budget" />
//             <div className="input-group-append">
//               <button className="btn btn-danger">Search</button>
//             </div>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="mt-5">
//           <h5>Because you searched New Delhi</h5>
//           <div className="row">
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <h6>106K+ Properties listed for you</h6>
//                 <a href="#">Continue last search</a>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <h6>Top Handpicked Projects recommended for you</h6>
//                 <a href="#">See all</a>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <h6>100+ bigger homes & Villas in your budget</h6>
//                 <a href="#">See all</a>
//               </div>
//             </div>
//             <div className="col-md-3">
//               <div className="card p-3">
//                 <h6>5 Nearby localities matching your criteria</h6>
//                 <a href="#">See all</a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Featured Projects Section */}
//         <div className="mt-5">
//           <h5>Featured Projects</h5>
//           <div className="row">
//             <div className="col-md-4">
//               <div className="card">
//                 <img
//                   src="https://via.placeholder.com/300x200"
//                   className="card-img-top"
//                   alt="Project 1"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">JRD Vistara Green Villas</h5>
//                   <p className="card-text">2, 3, 4 BHK Villa</p>
//                   <p className="card-text">₹ 58 Lac onwards</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card">
//                 <img
//                   src="https://via.placeholder.com/300x200"
//                   className="card-img-top"
//                   alt="Project 2"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">JRD Harmony Villas</h5>
//                   <p className="card-text">2, 3, 4 BHK Houses</p>
//                   <p className="card-text">₹ 65 Lac onwards</p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card">
//                 <img
//                   src="https://via.placeholder.com/300x200"
//                   className="card-img-top"
//                   alt="Project 3"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">The Oak Tree</h5>
//                   <p className="card-text">Residential Plots</p>
//                   <p className="card-text">₹ 7.3 Lac onwards</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Menu;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const MapmyIndiaComponent = () => {
//   const [country, setCountry] = useState('India');
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');
//   const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to center of India

//   useEffect(() => {

//     fetchStates();
//   }, []);

//   const fetchStates = async () => {
//     try {
//       const response = await axios.get(`https://atlas.mapmyindia.com/api/places/geocode?region=state`, {
//         headers: {
//           'Authorization': `c3774501d4cd28dd274007465622ac24`,  // Replace with your actual token
//         }
//       });
//       setStates(response.data.states);
//     } catch (error) {
//       console.error('Error fetching states:', error);
//     }
//   };

//   const fetchDistricts = async (state) => {
//     try {
//       const response = await axios.get(`https://atlas.mapmyindia.com/api/places/geocode?region=district&state=${state}`, {
//         headers: {
//           'Authorization': `c3774501d4cd28dd274007465622ac24`,
//         }
//       });
//       setDistricts(response.data.districts);
//     } catch (error) {
//       console.error('Error fetching districts:', error);
//     }
//   };

//   const fetchCities = async (district) => {
//     try {
//       const response = await axios.get(`https://atlas.mapmyindia.com/api/places/geocode?region=city&district=${district}`, {
//         headers: {
//           'Authorization': `c3774501d4cd28dd274007465622ac24`,
//         }
//       });
//       setCities(response.data.cities);
//     } catch (error) {
//       console.error('Error fetching cities:', error);
//     }
//   };

//   const handleStateChange = (event) => {
//     const selectedState = event.target.value;
//     setSelectedState(selectedState);
//     fetchDistricts(selectedState);
//   };

//   const handleDistrictChange = (event) => {
//     const selectedDistrict = event.target.value;
//     setSelectedDistrict(selectedDistrict);
//     fetchCities(selectedDistrict);
//   };

//   const handleCityChange = (event) => {
//     const selectedCity = event.target.value;
//     setSelectedCity(selectedCity);
//     // Set the map center to the selected city (you would get lat/lng from the city object)
//     setMapCenter({ lat: selectedCity.lat, lng: selectedCity.lng });
//   };

//   return (
//     <div>
//       <h1>MapmyIndia Location Selector</h1>

//       <label>Country:</label>
//       <select value={country} disabled>
//         <option value="India">India</option>
//       </select>

//       <label>State:</label>
//       <select value={selectedState} onChange={handleStateChange}>
//         <option value="">Select State</option>
//         {states.map((state, index) => (
//           <option key={index} value={state}>{state}</option>
//         ))}
//       </select>

//       <label>District:</label>
//       <select value={selectedDistrict} onChange={handleDistrictChange}>
//         <option value="">Select District</option>
//         {districts.map((district, index) => (
//           <option key={index} value={district}>{district}</option>
//         ))}
//       </select>

//       <label>City:</label>
//       <select value={selectedCity} onChange={handleCityChange}>
//         <option value="">Select City</option>
//         {cities.map((city, index) => (
//           <option key={index} value={city}>{city}</option>
//         ))}
//       </select>

//       <div>
//         <h2>Map will be centered at: {mapCenter.lat}, {mapCenter.lng}</h2>
//         {/* Here, you can integrate a map component centered on mapCenter */}
//       </div>
//     </div>
//   );
// };

// export default MapmyIndiaComponent;
