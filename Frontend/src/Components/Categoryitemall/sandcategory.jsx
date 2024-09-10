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

const CategorySandall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const sandRoute = `${config.apiURL}/sandRoute/sand`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(sandRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCardClick = (sandId) => {
    navigate(`/sandview/${sandId}`);
  };

  const handleViewDetailsClick = (sandId) => {
    navigate(`/sandview/${sandId}`);
  };

  const handleAddToFavourites = (sandId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(sandId)) {
        return prevFavourites.filter((id) => id !== sandId);
      } else {
        return [...prevFavourites, sandId];
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
        <h2>Sand Products</h2>
      </div>
      
      <div className="card-container">
        {data.map((sand, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(sand._id)}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {sand.images.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`Sand ${sand.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToFavourites(sand._id);
                }} 
                className="favourite-button"
              >
                {favourites.includes(sand._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{sand.sandType}</h3>
              <p><strong>Seller Name:</strong> {sand.name}</p>
              <p><strong>Quantity:</strong> {sand.quantity}</p>
              <p><strong>Price:</strong> {sand.price} RPS</p>
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(sand._id)} className="view-details-button">
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

export default CategorySandall;
