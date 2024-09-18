import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert, IconButton } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";

const CategoryStone = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
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
          `${config.apiURL}/stoneRoute/GetUserStone`,
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

  const handleViewDetailsClick = (stoneId) => {
    navigate(`/Sellerstoneview/${stoneId}`);
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
        <h2>Stone Products</h2>
      </div>

      <div className="card-container">
        {data.map((stone, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleViewDetailsClick(stone._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {stone.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Stone ${stone.name}`}
                  />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{stone.stoneCategory}</h3>
              <p>
                <strong>Seller Name:</strong> {stone.name}
              </p>
              <p>
                <strong>Type:</strong> {stone.stoneType}
              </p>
              <p>
                <strong>Quantity:</strong> {stone.quantity}
              </p>
              <p>
                <strong>Price:</strong> {stone.price} RPS
              </p>
              <div className="card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(stone._id)}
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

export default CategoryStone;
