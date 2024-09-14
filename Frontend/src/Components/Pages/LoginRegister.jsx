import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import config from "../../config";

const LoginRegister = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (e) => setProfileImage(e.target.files[0]);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    gender: "",
    about: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${config.apiURL}/api/login`, loginData);
        if (response.status === 200) {
            const { token, msg, id } = response.data;

            // Set expiration time for 1 day (24 hours in milliseconds)
            const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day
            const expiryTime = new Date().getTime() + oneDayInMilliseconds;

            // Store token, user ID, and expiration time in localStorage
            localStorage.setItem("authToken", token);
            localStorage.setItem("userId", id);
            localStorage.setItem("expiryTime", expiryTime);
            console.log(token);

            setSnackbarMessage(msg || "Login successful!");
            setSnackbarSeverity("success");

            // Redirect to the home page
            navigate("/");
        } else {
            // Handle login failure
            setSnackbarMessage(response.data.msg || "Login failed. Please check your credentials.");
            setSnackbarSeverity("error");
        }
    } catch (error) {
        // Handle error
        setSnackbarMessage(error.response?.data?.msg || "An error occurred. Please try again.");
        setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
};



  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(registerData).forEach(key => formData.append(key, registerData[key]));
    if (profileImage) formData.append('profileImage', profileImage);

    try {
      const response = await axios.post(`${config.apiURL}/api/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        setSnackbarMessage("Registration successful!");
        setSnackbarSeverity("success");
        setRegisterData({
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          age: "",
          gender: "",
          about: "",
        });
        setProfileImage(null); 
        setIsRegistering(false);
      } else {
        setSnackbarMessage(response.data.msg || "Registration failed. Please try again.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage(error.response?.data?.msg || "An error occurred. Please try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="full-container">
      <h1 className="heading">A2Z for Shelter</h1>
      {!isRegistering ? (
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-group">
              {/* <i className="fas fa-envelope"></i> */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="input-group">
              {/* <i className="fas fa-lock"></i> */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit">Login</button>
            <div className="switch-link">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={() => setIsRegistering(true)}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="register-form">
          <span className="close-button" onClick={() => setIsRegistering(false)}>X</span>
          <h2>Register</h2>
          <div className="form-group profile-image-container">
            <input
              type="file"
              id="profileImage"
              onChange={handleProfileImageChange}
              className="profile-image-input"
              accept="image/*"
            />
            <label htmlFor="profileImage" className="profile-image-label">
              <img
                src={profileImage ? URL.createObjectURL(profileImage) : '/media/profile.webp'}
                alt="Profile"
                className="profile-image"
              />
            </label>
          </div>
          <form onSubmit={handleRegisterSubmit}>
            <div className="input-row">
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-group">
                {/* <i className="fas fa-envelope"></i> */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                {/* <i className="fas fa-lock"></i> */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-group">
                {/* <i className="fas fa-phone"></i> */}
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={registerData.phoneNumber}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={registerData.age}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-genderless"></i>
                <select
                  name="gender"
                  value={registerData.gender}
                  onChange={handleRegisterChange}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="input-group">
              <textarea
                name="about"
                placeholder="Tell us about yourself (optional)"
                value={registerData.about}
                onChange={handleRegisterChange}
              />
            </div>
            <button type="submit">Register</button>
            <div className="switch-link">
              <p>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsRegistering(false)}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginRegister;
