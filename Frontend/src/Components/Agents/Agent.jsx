import React, { useState } from "react";
import "./Agent.css";
import axios from "axios";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import config from "../../config"; // Assuming you have a config file for API URL

const Agent = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    userId,
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    productInterest: "",
    images: [],
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message for Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Snackbar type
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Converting FileList to an array
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  // Remove an image from the preview
  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const newImages = prevData.images.filter((_, i) => i !== index);
      return {
        ...prevData,
        images: newImages,
      };
    });
  };

  // Validate phone number (basic validation)
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if phone number is valid
    if (!isValidPhoneNumber(formData.phoneNumber)) {
      setSnackbarMessage("Invalid phone number. Must be 10 digits.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formDataToSend = new FormData();

    // Append all form data fields except images
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData[key].forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      setLoading(true); // Set loading state

      const response = await axios.post(
        `${config.apiURL}/agentRoute/createAgent`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If successful, show success message in Snackbar
      setSnackbarMessage("Registration Successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset form fields after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        productInterest: "",
        images: [],
      });
    } catch (error) {
      // Show error message in Snackbar
      setSnackbarMessage("Registration Failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Marketing Agents Registration Form</h2>

        <label htmlFor="firstName">First Name *</label>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name *</label>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email *</label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="companyName">Company / Agency Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />

        <label htmlFor="phoneNumber">Phone Number *</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="productInterest">Describe Product Interested In?</label>
        <textarea
          name="productInterest"
          value={formData.productInterest}
          onChange={handleChange}
        ></textarea>

        {/* Image upload */}
        <div className="form-group">
          <label>
            Upload Images: <span className="required">*</span>
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </div>

        {/* Image preview */}
        <div className="image-preview">
          {formData.images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="image-preview-item"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="remove-image-button"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </button>
      </form>

      {/* Snackbar for displaying success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Agent;
