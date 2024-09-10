import React, { useState } from "react";
import axios from "axios";
import "../SalePost.css";
import config from "../../../config";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Pipe_wires = () => {
  const userId = localStorage.getItem('userId');
  console.log(userId);

  const [formData, setFormData] = useState({
    userId,
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    Type: "Pipes",
    pipeType: "Metalic Pipe",
    pipeBrand: "",
    pipeDiameter: "",
    pipeLength: "",
    wireBrand: "",
    wireType: "Electrical Wire",
    wireDiameter: "",
    wireLength: "",
    quantity: "1 Piece",
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

    let updatedPipeDiameter = formData.pipeDiameter;
    let updatedPipeLength = formData.pipeLength;
    let updatedWireDiameter = formData.wireDiameter;
    let updatedWireLength = formData.wireLength;

    if (!updatedPipeDiameter.endsWith("Inch")) {
      formData.pipeDiameter = `${updatedPipeDiameter} Inch`;
    }
    if (!updatedPipeLength.endsWith("Meter")) {
      formData.pipeLength = `${updatedPipeLength} Meter`;
    }
    if (!updatedWireDiameter.endsWith("mm")) {
      formData.wireDiameter = `${updatedWireDiameter} mm`;
    }
    if (!updatedWireLength.endsWith("Meter")) {
      formData.wireLength = `${updatedWireLength} Meter`;
    }

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
      const response = await axios.post(`${config.apiURL}/pipeWiresRoute/pipewires`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        sellerAddress: "",
        Type: "Pipes",
        pipeType: "Metalic Pipe",
        pipeBrand: "",
        pipeDiameter: "",
        pipeLength: "",
        wireBrand: "",
        wireType: "Electrical Wire",
        wireDiameter: "",
        wireLength: "",
        quantity: "1 Piece",
        price: "",
        images: [],
        description: "",
      })
      console.log("Form submitted successfully", response.data);
      
    } catch (error) {
      setSnackbarMessage("Error submitting form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error submitting form:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <h2>Pipe & Wire Seller</h2>
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
            Type: <span className="required">*</span>
          </label>
          <select
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            required
          >
            {["Pipes", "Wires"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Section: Pipes */}
        {formData.Type === "Pipes" && (
          <>
            <div className="form-group">
              <label>
                Pipe Type: <span className="required">*</span>
              </label>
              <select
                name="pipeType"
                value={formData.pipeType}
                onChange={handleChange}
                required
              >
                {["Metalic Pipe", "Wiring Pipe", "Plumbing Pipe"].map(
                  (pipeType) => (
                    <option key={pipeType} value={pipeType}>
                      {pipeType}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="form-group">
              <label>
                Pipe Brand: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="pipeBrand"
                value={formData.pipeBrand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Pipe Diameter: /Inch <span className="required">*</span>
              </label>
              <input
                type="number"
                name="pipeDiameter"
                value={formData.pipeDiameter}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Pipe Length: /Meter <span className="required">*</span>
              </label>
              <input
                type="number"
                name="pipeLength"
                value={formData.pipeLength}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {/* Conditional Section: Wires */}
        {formData.Type === "Wires" && (
          <>
            <div className="form-group">
              <label>
                Wire Type: <span className="required">*</span>
              </label>
              <select
                name="wireType"
                value={formData.wireType}
                onChange={handleChange}
                required
              >
                {[
                  "Electrical Wire",
                  "NM Cable",
                  "UF Cable",
                  "THHN/THWN Wire",
                  "Low-Voltage Wire",
                  "Phone and Data Wire",
                  "Coaxial Cable",
                  "Speaker Wire",
                  "Armored Cable",
                ].map((wireType) => (
                  <option key={wireType} value={wireType}>
                    {wireType}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>
                Wire Brand: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="wireBrand"
                value={formData.wireBrand}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Wire Diameter: /mm <span className="required">*</span>
              </label>
              <input
                type="number"
                name="wireDiameter"
                value={formData.wireDiameter}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                Wire Length: /Meter <span className="required">*</span>
              </label>
              <input
                type="number"
                name="wireLength"
                value={formData.wireLength}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

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

export default Pipe_wires;
