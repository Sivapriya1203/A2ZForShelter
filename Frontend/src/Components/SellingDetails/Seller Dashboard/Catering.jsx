import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../../config";
import { CircularProgress, Snackbar, Button } from "@mui/material";
import { Alert } from "@mui/material";

const CategoryCatering = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setSnackbarMessage("Please log in");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${config.apiURL}/cateringRoute/GetUserCatering`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetailsClick = (cateringId) => {
    navigate(`/SellerCateringView/${cateringId}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;

  if (error)
    return (
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Error: {error}
        </Alert>
      </Snackbar>
    );

  return (
    <div className="category-container">
      <div className="header-container">
        <h2>Catering Services</h2>
      </div>

      <div className="card-container">
        {data.map((catering, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleViewDetailsClick(catering._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {catering.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Catering ${catering.name}`}
                  />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{catering.name}</h3>
              <p>
                <strong>Meals:</strong> {catering.meals}
              </p>
              <p>
                <strong>Menu:</strong> {catering.menuCatlogues}
              </p>
              <p>
                <strong>Number of Peoples:</strong> {catering.numberOfPeople}
              </p>
              <p>
                <strong>Price:</strong> {catering.price} RPS
              </p>
              <div className="card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(catering._id)}
                  className="view-details-button"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryCatering;
