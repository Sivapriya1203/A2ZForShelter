import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../../config";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CategoryHouse = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Please login");
          setSnackbarOpen(true);
          setLoading(false);
          return;
        }

        setLoading(true);
        const response = await axios.get(
          `${config.apiURL}/houseRoute/GetUserHouse`,
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

  const handleViewDetailsClick = (houseId) => {
    navigate(`/Sellerhouseview/${houseId}`);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <p>Error: {error}</p>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <div className="category-container">
      <div className="header-container">
        <h2>House Rent & Sale</h2>
      </div>

      <div className="card-container">
        {data.map((house, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleViewDetailsClick(house._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {house.photos.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`House ${house.adTitle}`}
                  />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <h3>{house.adTitle}</h3>
              <p>{house.projectName}</p>
              <p>
                <strong>Location:</strong> {house.location}, {house.cityName}
              </p>
              <p>
                <strong>House:</strong> {house.bedrooms} BHK
              </p>
              <p>
                <strong>Bathrooms:</strong> {house.bathrooms}
              </p>
              <p>
                <strong>Price:</strong> {house.price} RPS
              </p>
              <div className="card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(house._id)}
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
        <Alert onClose={handleCloseSnackbar} severity="error">
          Please login to view houses.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryHouse;
