import React, { useState } from "react";
import axios from "axios";
import "./steelPost.css";
import config from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SteelpostForm = () => {
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const [formData, setFormData] = useState({
    userId,
    name: "",
    email: "",
    phoneNumber: "",
    shopAddress: "",
    brand: "Tata Steel",
    steelCategory: "Steel",
    steelType: "Sheet",
    steelThickness: "6 mm",
    meter: "1 Meter",
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
    
    // Create FormData to include images
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'images') {
        formData[key].forEach((file) => {
          formDataToSend.append('images', file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(`${config.apiURL}/steelRoute/steel`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        shopAddress: "",
        brand: "Tata Steel",
        steelCategory: "Steel",
        steelType: "Sheet",
        steelThickness: "",
        meter: "1 Meter",
        price: "",
        images: [],
        description: "",
      })
      console.log('Form Data Submitted Successfully: ', response.data);
  
    } catch (error) {
      setSnackbarMessage("Error submitting form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error('Error submitting form: ', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <h2>Steel Seller</h2>
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
            Shop Address:<span className="required">*</span>
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
            Brand:<span className="required">*</span>
          </label>
          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          >
            {[
              "Kiscol",
              "Tirumalai Steels",
              "Inframat Alloys",
              "Meenakshi Group",
              "JSW Steel",
              "SAIL",
              "Essar Steel",
              "Jindal Steel",
              "RINL Steel",
              "VISA Steel",
              "MESCO Steel",
              "Ratnamani Metals",
              "Prime Gold International Limited",
              "Bhushan Power and Steel",
              "ESL Steel",
            ].map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Steel Category:<span className="required">*</span>
            </label>
            <select
              name="steelCategory"
              value={formData.steelCategory}
              onChange={handleChange}
              required
            >
              {[
                "Steel",
                "Stainless Steel",
                "Aluminium",
                "Tool Steel",
                "Alloy",
                "Nickel",
                "Brass, Copper, & Bronze",
              ].map((steelCategory) => (
                <option key={steelCategory} value={steelCategory}>
                  {steelCategory}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>
              Steel Type:<span className="required">*</span>
            </label>
            <select
              name="steelType"
              value={formData.steelType}
              onChange={handleChange}
              required
            >
              {[
                "Sheet",
                "Plate",
                "Coil",
                "Flat Bar",
                "Hexagon Bar",
                "Round Bar",
                "Square Bar",
                "Reinforcing Bar",
                "Bar Grating",
                "Flattened Expanded Metal",
                "Medium Pattern Thread Plate",
              ].map((steelType) => (
                <option key={steelType} value={steelType}>
                  {steelType}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Steel Thickness / Dia:<span className="required">*</span>
            </label>
            <select
              name="steelThickness"
              value={formData.steelThickness}
              onChange={handleChange}
              required
            >
              {[
                "6 mm",
                "8 mm",
                "10 mm",
                "12 mm",
                "16 mm",
                "20 mm",
                "25 mm",
                "28 mm",
                "32 mm",
                "36 mm",
                "and More",
              ].map((steelThickness) => (
                <option key={steelThickness} value={steelThickness}>
                  {steelThickness}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Meter:</label>
            <input type="text" name="meter" value={formData.meter} readOnly />
          </div>
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

      {/* Snackbar for success/error messages */}
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

export default SteelpostForm;
