import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../config";
import './CategoryHouse.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const CategoryHouseall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const houseRoute = `${config.apiURL}/houseRoute/houses`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(houseRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCardClick = (houseId) => {
    navigate(`/houseview/${houseId}`);
  };

  const handleViewDetailsClick = (houseId) => {
    navigate(`/houseview/${houseId}`);
  };

  const handleAddToFavourites = (houseId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(houseId)) {
        return prevFavourites.filter((id) => id !== houseId);
      } else {
        return [...prevFavourites, houseId];
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
    <Navbar />
    <div className="category-container">
      <div className="header-container">
        <h2>House Rent & Sale</h2>
      </div>
      
      <div className="card-container">
        {data.map((house, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(house._id)}>
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
                  <img src={`${config.apiURL}/${photo}`} alt={`House ${house.adTitle}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToFavourites(house._id);
                }} 
                className="favourite-button"
              >
                {favourites.includes(house._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{house.adTitle}</h3>
              <p>{house.projectName}</p>
              <p><strong>Location:</strong> {house.location}, {house.cityName}</p>
              <p><strong>House:</strong> {house.bedrooms} BHK</p>
              <p><strong>Bathrooms:</strong> {house.bathrooms}</p>
              <p><strong>Price:</strong> {house.price} RPS</p>
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(house._id)} className="view-details-button">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CategoryHouseall;
