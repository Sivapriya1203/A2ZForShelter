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

const CategoryPgHostelall = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const pgHostelRoute = `${config.apiURL}/pgHostelRoute/pgHostel`; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(pgHostelRoute);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleCardClick = (pgHostelId) => {
    navigate(`/productviewpg/${pgHostelId}`);
  };

  const handleViewDetailsClick = (pgHostelId) => {
    navigate(`/productviewpg/${pgHostelId}`);
  };

  const handleAddToFavourites = (pgHostelId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(pgHostelId)) {
        return prevFavourites.filter((id) => id !== pgHostelId);
      } else {
        return [...prevFavourites, pgHostelId];
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
        <h2>PG Hostels</h2>
      </div>

      <div className="card-container">
        {data.map((pgHostel, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(pgHostel._id)}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {pgHostel.photos && pgHostel.photos.length > 0 ? (
                pgHostel.photos.map((photo, idx) => (
                  <div key={idx}>
                    <img src={`${config.apiURL}/${photo}`} alt={`PG Hostel ${pgHostel.pgHostelName}`} />
                  </div>
                ))
              ) : (
                <div>No images available</div>
              )}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={() => handleAddToFavourites(pgHostel._id)} 
                className="favourite-button"
              >
                {favourites.includes(pgHostel._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>
              <h3>{pgHostel.pgHostelName}</h3>
              <p><strong>Location:</strong> {pgHostel.location}</p>
              <p><strong>Total Floor:</strong> {pgHostel.totalFloors}</p>
              <p><strong>Room:</strong> {pgHostel.acRoom}</p>
              <p><strong>Food:</strong> {pgHostel.food}</p>
              <p><strong>Car Parking:</strong> {pgHostel.carParking}</p>
              <p><strong>Monthly Maintenance:</strong> {pgHostel.maintenance}</p>
              <p><strong>Price:</strong> {pgHostel.price} RPS</p>
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(pgHostel._id)} className="view-details-button">
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

export default CategoryPgHostelall;
