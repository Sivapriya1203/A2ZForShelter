import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';
import './productview.css'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const HouseView = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/houseRoute/house/${id}`);
        setHouse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  const handleToggleContact = () => {
    setShowContact(!showContact);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);  
    setIsModalOpen(true);        
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);     
    setSelectedImage(null);      
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!house) return <p>House not found</p>;

  return (
    <>
      <Navbar />
      <div className="product-view-container">
        <div className="product-card">
          <div className="product-images-section">
            {house.photos && house.photos.length > 0 ? (
              <div className="product-image-grid">
                {house.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${photo}`}
                    alt={`House Image ${index + 1}`}
                    className="product-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${photo}`)} 
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="product-details-section">
            <h2 className="product-title">{house.adTitle || 'N/A'}</h2>
            <p><strong>Project Name:</strong> {house.projectName || 'N/A'}</p>
            <p><strong>Type:</strong> {house.type || 'N/A'}</p>
            <p><strong>Location:</strong> {`${house.location || 'N/A'}, ${house.cityName || 'N/A'}, ${house.districtName || 'N/A'}, ${house.stateName || 'N/A'}`}</p>
            <p><strong>House:</strong> {house.bedrooms || 'N/A'} BHK</p>
            <p><strong>Bathrooms:</strong> {house.bathrooms || 'N/A'}</p>
            <p><strong>Furnishing:</strong> {house.furnishing || 'N/A'}</p>
            <p><strong>Construction Status:</strong> {house.constructionStatus || 'N/A'}</p>
            <p><strong>Listed By:</strong> {house.listedBy || 'N/A'}</p>
            <p><strong>Super Built-up Area:</strong> {house.superBuiltupArea || 'N/A'} sqft</p>
            <p><strong>Carpet Area:</strong> {house.carpetArea || 'N/A'} sqft</p>
            <p><strong>Total Floors:</strong> {house.totalFloors || 'N/A'}</p>
            <p><strong>Floor No:</strong> {house.floorNo || 'N/A'}</p>
            <p><strong>Car Parking:</strong> {house.carParking || 'N/A'}</p>
            <p><strong>Facing:</strong> {house.facing || 'N/A'}</p>
            <p><strong>Price:</strong> {house.price || 'N/A'} RPS</p>
            <p><strong>Maintenance:</strong> {house.maintenance || 'N/A'} RPS</p>
            <p><strong>Purpose:</strong> {house.purpose || 'N/A'}</p>
            <p><strong>Description:</strong> {house.description || 'N/A'}</p>

            {/* Contact Details Button */}
            <button className="contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {/* Conditional Rendering of Contact Details */}
            {showContact && (
              <div className="contact-details">
                <p><strong>Name:</strong> {house.name || 'N/A'}</p>
                <p><strong>Phone Number:</strong> {house.phoneNumber || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Image Popup */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>X</span>
            <img src={selectedImage} alt="Enlarged View" className="modal-image" />
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default HouseView;
