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

const CategoryStoneall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const stoneRoute = `${config.apiURL}/stoneRoute/stone`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(stoneRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCardClick = (stoneId) => {
    navigate(`/stoneview/${stoneId}`);
  };

  const handleViewDetailsClick = (stoneId) => {
    navigate(`/stoneview/${stoneId}`);
  };

  const handleAddToFavourites = (stoneId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(stoneId)) {
        return prevFavourites.filter((id) => id !== stoneId);
      } else {
        return [...prevFavourites, stoneId];
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
        <h2>Stone Products</h2>
      </div>
      
      <div className="card-container">
        {data.map((stone, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(stone._id)}>
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
                  <img src={`${config.apiURL}/${photo}`} alt={`Stone ${stone.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToFavourites(stone._id);
                }} 
                className="favourite-button"
              >
                {favourites.includes(stone._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{stone.stoneCategory}</h3>
              <p><strong>Seller Name:</strong> {stone.name}</p>
              <p><strong>Type:</strong> {stone.stoneType}</p>
              <p><strong>Quantity:</strong> {stone.quantity}</p>
              <p><strong>Price:</strong> {stone.price} RPS</p>
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(stone._id)} className="view-details-button">
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

export default CategoryStoneall;
