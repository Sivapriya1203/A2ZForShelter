import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import {
  TextField,
  MenuItem,
  Grid,
  Snackbar,
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

function LandForm() {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    userId,
    status: "",
    listedBy: "",
    landArea: "",
    facing: "",
    projectName: "",
    description: "",
    price: "",
    location: "",
    name: "Harish",
    phoneNumber: "+916382318872",
    purpose: "",
    facilities: [], // New field for facilities
  });

  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle option change (e.g., for purpose, status, listedBy)
  const handleOptionChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photos.length > 20) {
      setSnackbarMessage("You can only upload up to 20 photos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    setPhotos([...photos, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...previews]);
  };

  // Handle remove image
  const handleRemoveImage = (index) => {
    const newPhotos = [...photos];
    const newPreviews = [...photoPreviews];
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    setPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  // Handle checkbox change for facilities
  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, facilities: [...formData.facilities, value] });
    } else {
      setFormData({
        ...formData,
        facilities: formData.facilities.filter(
          (facility) => facility !== value
        ),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedStateName = states.find(
      (state) => state.id === selectedState
    )?.name;
    const selectedDistrictName = districts.find(
      (district) => district.id === selectedDistrict
    )?.name;
    const selectedCityName = cities.find(
      (city) => city.id === selectedCity
    )?.name;

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append("stateName", selectedStateName || "");
    data.append("districtName", selectedDistrictName || "");
    data.append("cityName", selectedCityName || "");

    photos.forEach((photo) => {
      data.append("photos", photo);
    });

    try {
      await axios.post(`${config.apiURL}/landRoute/land`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSnackbarMessage("Land Ad posted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setFormData({
        status: "",
        listedBy: "",
        landArea: "",
        facing: "",
        projectName: "",
        description: "",
        price: "",
        location: "",
        name: "Harish",
        phoneNumber: "+916382318872",
        purpose: "",
        facilities: [],
      });
      setPhotos([]);
      setPhotoPreviews([]);
    } catch (error) {
      setSnackbarMessage("Failed to post the ad. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        LAND & PLOTS SALE
      </Typography>

      <form className="ad-form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Purpose */}
          <Grid item xs={12}>
            <Typography variant="h6">For *</Typography>
            <Grid container spacing={2}>
              {["Sell"].map((option) => (
                <Grid item key={option}>
                  <Button
                    variant={
                      formData.purpose === option ? "contained" : "outlined"
                    }
                    onClick={() => handleOptionChange("purpose", option)}
                  >
                    {option}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Typography variant="h6">Status *</Typography>
            <Grid container spacing={2}>
              {["New Launch", "Ready to Sale", "Urgent Sale"].map((option) => (
                <Grid item key={option}>
                  <Button
                    variant={
                      formData.status === option ? "contained" : "outlined"
                    }
                    onClick={() => handleOptionChange("status", option)}
                  >
                    {option}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Listed By */}
          <Grid item xs={12}>
            <Typography variant="h6">Listed By *</Typography>
            <Grid container spacing={2}>
              {["Dealer", "Owner"].map((option) => (
                <Grid item key={option}>
                  <Button
                    variant={
                      formData.listedBy === option ? "contained" : "outlined"
                    }
                    onClick={() => handleOptionChange("listedBy", option)}
                  >
                    {option}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Land Area */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Land Area (Sqft) *"
              type="number"
              name="landArea"
              value={formData.landArea}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Facing */}
          <Grid item xs={12}>
            <Typography variant="h6">Facing *</Typography>
            <Grid container spacing={2}>
              {["East", "West", "North", "South"].map((option) => (
                <Grid item key={option}>
                  <Button
                    variant={
                      formData.facing === option ? "contained" : "outlined"
                    }
                    onClick={() => handleOptionChange("facing", option)}
                  >
                    {option}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Project Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Project/Villa Name *"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Facilities */}
          <Grid item xs={12}>
            <Typography variant="h6">Facilities Available</Typography>
            {[
              "Parking",
              "Swimming Pool",
              "Gym",
              "Water Tank",
              "Playground",
            ].map((facility) => (
              <FormControlLabel
                key={facility}
                control={
                  <Checkbox
                    checked={formData.facilities.includes(facility)}
                    onChange={handleFacilityChange}
                    value={facility}
                  />
                }
                label={facility}
              />
            ))}
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description *"
              multiline
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price *"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location *"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* State, District, and City dropdowns */}
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="State *"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              required
            >
              {states.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="District *"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              required
            >
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="City *"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Photos */}
          <Grid item xs={12}>
            <Typography variant="h6">Upload Photos (Max 20)</Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            <Box display="flex" flexWrap="wrap" mt={2}>
              {photoPreviews.map((preview, index) => (
                <Box key={index} position="relative" m={1}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    variant="contained"
                    color="secondary"
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post Ad"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LandForm;
