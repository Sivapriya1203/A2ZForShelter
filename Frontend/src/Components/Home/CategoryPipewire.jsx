import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import config from "../../config";
import './CategoryHouse.css';

const CategoryPipeWire = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const pipeWireRoute = `${config.apiURL}/pipeWiresRoute/pipewires`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(pipeWireRoute);
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
    navigate('/pipewireall');
  };

  const handleCardClick = (itemId) => {
    navigate(`/pipe&wireview/${itemId}`);
  };

  const handleViewDetailsClick = (itemId) => {
    navigate(`/pipe&wireview/${itemId}`);
  };

  const handleAddToFavourites = (itemId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(itemId)) {
        return prevFavourites.filter((id) => id !== itemId);
      } else {
        return [...prevFavourites, itemId];
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-container">
      <div className="header-container">
        <h2>Pipe & Wire Products</h2>
        <div className="arrow-container" onClick={handleArrowClick}>
          ➡️
        </div>
      </div>
      
      <div className="card-container">
        {data.slice(0, 4).map((item, index) => (
          <div key={index} className="card" onClick={() => handleCardClick(item._id)}>
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              stopOnHover
              dynamicHeight
              className="carousel"
            >
              {item.images.map((photo, idx) => (
                <div key={idx}>
                  <img src={`${config.apiURL}/${photo}`} alt={`${item.Type} ${item.name}`} />
                </div>
              ))}
            </Carousel>
            <div className="card-content">
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleAddToFavourites(item._id);
                }} 
                className="favourite-button"
              >
                {favourites.includes(item._id) ? (
                  <FaHeart className="favourite-icon filled" />
                ) : (
                  <FaRegHeart className="favourite-icon" />
                )}
              </button>

              {/* Conditionally Render Based on Type */}
              
              {item.Type === "Pipes" ? (
                <>
                <h3>{item.pipeBrand}</h3>
                <p><strong>Seller Name:</strong> {item.name}</p>
                  <p><strong>Pipe Type:</strong> {item.pipeType}</p>
                  <p><strong>Diameter:</strong> {item.pipeDiameter}</p>
                  <p><strong>Length:</strong> {item.pipeLength}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> {item.price} RPS</p>
                </>
              ) : item.Type === "Wires" ? (
                <>
                <h3>{item.wireBrand}</h3>
                <p><strong>Seller Name:</strong> {item.name}</p>
                  <p><strong>Wire Type:</strong> {item.wireType}</p>
                  <p><strong>Diameter:</strong> {item.wireDiameter}</p>
                  <p><strong>Length:</strong> {item.wireLength}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> {item.price} RPS</p>
                </>
              ) : null}
              
              <div className="card-buttons">
                <button onClick={() => handleViewDetailsClick(item._id)} className="view-details-button">
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

export default CategoryPipeWire;
