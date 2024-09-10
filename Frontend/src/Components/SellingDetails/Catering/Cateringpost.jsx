import React, { useState } from "react";
import axios from "axios";
import config from "../../../config";
import { Snackbar, Alert } from "@mui/material";

const CateringpostForm = () => {
  const userId = localStorage.getItem('userId');
  const [formData, setFormData] = useState({
    userId,
    name: "",
    email: "",
    phoneNumber: "",
    shopAddress: "",
    meals: "Break-Fast",
    menuCatlogues: "",
    numberOfPeople: "",
    price: "",
    images: [],
    description: "",
  });

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
        formData[key].forEach((file) => {
          formDataToSend.append("images", file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(`${config.apiURL}/cateringRoute/catering`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // On success, show success message in Snackbar
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset form after successful submission
      setFormData({
        userId,
        name: "",
        email: "",
        phoneNumber: "",
        shopAddress: "",
        meals: "Break-Fast",
        menuCatlogues: "",
        numberOfPeople: "",
        price: "",
        images: [],
        description: "",
      });
     
    } catch (error) {
      // On error, show error message in Snackbar
      setSnackbarMessage("Error submitting form. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="container">
      <h2>Catering Service</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:<span className="required">*</span>
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
            Email ID:<span className="required">*</span>
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
            Phone Number:<span className="required">*</span>
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
            Address:<span className="required">*</span>
          </label>
          <textarea
            name="shopAddress"
            value={formData.shopAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Meals:<span className="required">*</span>
          </label>
          <select
            name="meals"
            value={formData.meals}
            onChange={handleChange}
            required
          >
            {["Break-Fast", "Lunch", "Dinner"].map((meal) => (
              <option key={meal} value={meal}>
                {meal}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            Menu Catalogues:<span className="required">*</span>
          </label>
          <input
            type="text"
            name="menuCatlogues"
            value={formData.menuCatlogues}
            onChange={handleChange}
            placeholder="Enter the menu items"
            required
          />
        </div>

        <div className="form-group">
          <label>
            Number of Members:<span className="required">*</span>
          </label>
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
            placeholder="Enter the number of people"
            required
          />
           <p color="green">
            <i>How many members can eat</i>
          </p>
        </div>

        <div className="form-group">
          <label>
            Price:<span className="required">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <p color="green">
            <i>The Price depends upon Meals</i>
          </p>
        </div>

        <div className="form-group">
          <label>
            Upload Images:<span className="required">*</span>
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
            Description:<span className="required">*</span>
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
        {/* Snackbar for status messages */}
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CateringpostForm;