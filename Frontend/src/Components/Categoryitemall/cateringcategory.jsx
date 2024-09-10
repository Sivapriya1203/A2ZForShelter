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

const CategoryCateringall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const cateringRoute = `${config.apiURL}/cateringRoute/catering`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(cateringRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (cateringId) => {
    navigate(`/cateringview/${cateringId}`);
  };

  const handleViewDetailsClick = (cateringId) => {
    navigate(`/cateringview/${cateringId}`);
  };

  const handleAddToFavourites = (cateringId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(cateringId)) {
        return prevFavourites.filter((id) => id !== cateringId);
      } else {
        return [...prevFavourites, cateringId];
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
        <h2>Catering Services</h2>
      </div>

      <div className="card-container">
        {data.map((catering, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(catering._id)}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {catering.images.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`Catering ${catering.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); // To prevent card click when favourite is clicked
                  handleAddToFavourites(catering._id); 
                }} 
                className="favourite-button"
              >
                {favourites.includes(catering._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{catering.name}</h3>
              <p><strong>Meals:</strong> {catering.meals}</p>
              <p><strong>Menu:</strong> {catering.menuCatlogues}</p>
              <p><strong>Number of People:</strong> {catering.numberOfPeople}</p>
              <p><strong>Price:</strong> {catering.price} RPS</p>
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(catering._id)} className="view-details-button">
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

export default CategoryCateringall;
