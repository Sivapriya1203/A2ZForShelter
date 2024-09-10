import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import config from "../../config";
import "./CategoryHouse.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CategoryInterior = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const interiorRoute = `${config.apiURL}/interiorRoute/interior`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(interiorRoute);
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
    navigate("/interiorall");
  };

  const handleCardClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleViewDetailsClick = (interiorId) => {
    navigate(`/interiorview/${interiorId}`);
  };

  const handleAddToFavourites = (interiorId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(interiorId)) {
        return prevFavourites.filter((id) => id !== interiorId);
      } else {
        return [...prevFavourites, interiorId];
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-container">
      <div className="header-container">
        <h2>Interior Products</h2>
        <div className="arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>

      <div className="card-container">
        {data.slice(0, 4).map((interior, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleCardClick(interior._id)}
          >
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {interior.images.map((photo, idx) => (
                <div key={idx}>
                  <img
                    src={`${config.apiURL}/${photo}`}
                    alt={`Interior ${interior.name}`}
                  />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button
                onClick={() => handleAddToFavourites(interior._id)}
                className="favourite-button"
              >
                {favourites.includes(interior._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{interior.products}</h3>
              <p>
                <strong>Seller Name:</strong> {interior.name}
              </p>
              <p>
                <strong>Category:</strong> {interior.category}
              </p>
              <p>
                <strong>Description:</strong> {interior.description}
              </p>
              <p>
                <strong>Price:</strong> {interior.price} RPS
              </p>
              <div className="card-buttons">
                <button
                  onClick={() => handleViewDetailsClick(interior._id)}
                  className="view-details-button"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryInterior;
