import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import config from '../../config';
import './CategoryHouse.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const CategorySteelall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const steelRoute = `${config.apiURL}/steelRoute/steel`; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(steelRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCardClick = (steelId) => {
    navigate(`/steelview/${steelId}`);
  };

  const handleViewDetailsClick = (steelId) => {
    navigate(`/steelview/${steelId}`);
  };

  const handleAddToFavourites = (steelId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(steelId)) {
        return prevFavourites.filter((id) => id !== steelId);
      } else {
        return [...prevFavourites, steelId];
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
        <h2>Steel Products</h2>
      </div>

      <div className="card-container">
        {data.map((steel, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(steel._id)}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {steel.images.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`Steel ${steel.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={() => handleAddToFavourites(steel._id)} 
                className="favourite-button"
              >
                {favourites.includes(steel._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{steel.brand}</h3>
              <p><strong>Seller Name:</strong> {steel.name}</p>
              <p><strong>Category:</strong> {steel.steelCategory}</p>
              <p><strong>Type:</strong> {steel.steelType}</p>
              <p><strong>Thickness:</strong> {steel.steelThickness}</p>
              <p><strong>Length:</strong> {steel.meter}</p>
              <p><strong>Price:</strong> {steel.price} RPS</p>
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(steel._id)} className="view-details-button">
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

export default CategorySteelall;
