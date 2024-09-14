import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../config";
import "./CategoryHouse.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CategoryCement = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const cementRoute = `${config.apiURL}/cementRoutes/cement`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(cementRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleArrowClick = () => {
    navigate("/cementall");
  };

  const handleCardClick = (cementId) => {
    navigate(`/cementview/${cementId}`);
  };

  const handleViewDetailsClick = (cementId) => {
    navigate(`/cementview/${cementId}`);
  };

  const handleAddToFavourites = (cementId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(cementId)) {
        return prevFavourites.filter((id) => id !== cementId);
      } else {
        return [...prevFavourites, cementId];
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-container">
      <div className="header-container">
        <h2>Cement Products</h2>
        <div className="arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="card-container">
        {data.slice(0, 4).map((cement, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleCardClick(cement._id)}
          >
            <div key={index} className="card">
              <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                stopOnHover
                dynamicHeight
                className="carousel"
              >
                {cement.images.map((photo, idx) => (
                  <div key={idx}>
                    <img
                      src={`${config.apiURL}/${photo}`}
                      alt={`Cement ${cement.name}`}
                    />
                  </div>
                ))}
              </Carousel>
              <div className="card-content">
                <button
                  onClick={() => handleAddToFavourites(cement._id)}
                  className="favourite-button"
                >
                  {favourites.includes(cement._id) ? (
                    <FaHeart className="favourite-icon filled" />
                  ) : (
                    <FaRegHeart className="favourite-icon" />
                  )}
                </button>
                <h3>{cement.brand}</h3>
                <p>
                  <strong>Seller Name:</strong> {cement.name}
                </p>
                <p>
                  <strong>Type:</strong> {cement.cementType}
                </p>
                <p>
                  <strong>Quantity:</strong> {cement.quantity} <span>Kg</span>
                </p>
                <p>
                  <strong>Price:</strong> {cement.price} RPS
                </p>
                <div className="card-buttons">
                  <button
                    onClick={() => handleViewDetailsClick(cement._id)}
                    className="view-details-button"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCement;
