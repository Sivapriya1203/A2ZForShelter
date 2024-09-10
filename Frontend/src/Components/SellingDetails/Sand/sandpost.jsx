import React, { useState } from "react";
import axios from "axios";
import "../SalePost.css";
import config from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SandpostForm = () => {
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const [formData, setFormData] = useState({
    userId,
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    sandType: "Gravel",
    quantity: "1 Unit",
    price: "",
    images: [],
    description: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const newImages = prevData.images.filter((_, i) => i !== index);
      return {
        ...prevData,
        images: newImages,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData[key].forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${config.apiURL}/sandRoute/sand`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setFormData({
        name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    sandType: "Gravel",
    quantity: "1 Unit",
    price: "",
    images: [],
    description: "",
      })
      console.log("Form Data Submitted: ", response.data);
     
    } catch (error) {
      setSnackbarMessage("Error submitting form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error submitting form: ", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <h2>Sand Seller</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Email ID: <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Phone Number: <span className="required">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Seller Address: <span className="required">*</span>
          </label>
          <textarea
            name="sellerAddress"
            value={formData.sellerAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Sand Type: <span className="required">*</span>
          </label>
          <select
            name="sandType"
            value={formData.sandType}
            onChange={handleChange}
            required
          >
            {[
              "Gravel",
              "Fine Sand",
              "Coarse Sand",
              "Utility Sand",
              "Fill Sand",
              "River Sand",
              "M-Sand",
              "P-Sand",
              "Concrete Sand",
              "Pit Sand",
              "Artificial Sand",
              "Granite Sand",
            ].map((sandType) => (
              <option key={sandType} value={sandType}>
                {sandType}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>
            Price: <span className="required">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label>
            Description: <span className="required">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SandpostForm;
