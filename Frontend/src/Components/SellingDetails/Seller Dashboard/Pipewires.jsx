import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CircularProgress, Snackbar, Alert, IconButton } from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../../../config";

const CategoryPipeWires = () => {
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
          `${config.apiURL}/pipeWiresRoute/GetUserPipeWire`,
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

  const handleViewDetailsClick = (itemId) => {
    navigate(`/Sellerpipe&wireview/${itemId}`);
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
        <h2>Pipe & Wire Products</h2>
      </div>

      <div className="card-container">
        {data.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleViewDetailsClick(item._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {item.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`${item.Type} ${item.name}`}
                  />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              {item.Type === "Pipes" ? (
                <>
                  <h3>{item.pipeBrand}</h3>
                  <p>
                    <strong>Seller Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Pipe Type:</strong> {item.pipeType}
                  </p>
                  <p>
                    <strong>Diameter:</strong> {item.pipeDiameter}
                  </p>
                  <p>
                    <strong>Length:</strong> {item.pipeLength}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {item.price} RPS
                  </p>
                </>
              ) : item.Type === "Wires" ? (
                <>
                  <h3>{item.wireBrand}</h3>
                  <p>
                    <strong>Seller Name:</strong> {item.name}
                  </p>
                  <p>
                    <strong>Wire Type:</strong> {item.wireType}
                  </p>
                  <p>
                    <strong>Diameter:</strong> {item.wireDiameter}
                  </p>
                  <p>
                    <strong>Length:</strong> {item.wireLength}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Price:</strong> {item.price} RPS
                  </p>
                </>
              ) : null}

              <div className="card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(item._id)}
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

export default CategoryPipeWires;
