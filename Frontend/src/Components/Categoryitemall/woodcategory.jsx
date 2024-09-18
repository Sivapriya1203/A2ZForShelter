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

const CategoryWoodall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const woodRoute = `${config.apiURL}/woodRoute/wood`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(woodRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCardClick = (woodId) => {
    navigate(`/woodview/${woodId}`);
  };

  const handleViewDetailsClick = (woodId) => {
    navigate(`/woodview/${woodId}`);
  };

  const handleAddToFavourites = (woodId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(woodId)) {
        return prevFavourites.filter((id) => id !== woodId);
      } else {
        return [...prevFavourites, woodId];
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
        <h2>Wood Products</h2>
      </div>
      
      <div className="card-container">
        {data.map((wood, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(wood._id)}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {wood.images.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`Wood ${wood.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToFavourites(wood._id);
                }} 
                className="favourite-button"
              >
                {favourites.includes(wood._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{wood.wood}</h3>
              <p><strong>Seller Name:</strong> {wood.name}</p>
              <p><strong>Thickness:</strong> {wood.thickness}</p>
              <p><strong>Quantity:</strong> {wood.quantity}</p>
              <p><strong>Price:</strong> {wood.price} RPS</p>
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(wood._id)} className="view-details-button">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div><Footer /> </>
  );
};

export default CategoryWoodall;
