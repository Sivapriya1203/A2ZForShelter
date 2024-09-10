import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';
import './productview.css';  
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const StoneView = () => {
  const { id } = useParams();
  const [stone, setStone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchStone = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/stoneRoute/stone/${id}`);
        setStone(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStone();
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
  if (!stone) return <p>Stone post not found</p>;

  return (
    <>
      <Navbar />
      <div className="product-view-container">
        <div className="product-card">
          <div className="product-images-section">
            {stone.images && stone.images.length > 0 ? (
              <div className="product-image-grid">
                {stone.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Stone Image ${index + 1}`}
                    className="product-image-item"
                    onClick={() => handleImageClick(`${config.apiURL}/${image}`)}
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="product-details-section">
            <h2 className="product-title">{stone.stoneCategory || 'N/A'}</h2>
            <p><strong>Seller Name:</strong> {stone.name || 'N/A'}</p>
            <p><strong>Stone Type:</strong> {stone.stoneType || 'N/A'}</p>
            <p><strong>Quantity:</strong> {stone.quantity || '1 Tonne'}</p>
            <p><strong>Price:</strong> {stone.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {stone.description || 'N/A'}</p>
            <p><strong>Address:</strong> {stone.sellerAddress || 'N/A'}</p>

            {/* Button to toggle contact details */}
            <button className="contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {/* Contact details section */}
            {showContact && (
              <div className="contact-details">
                <p><strong>Phone Number:</strong> {stone.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {stone.email || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal for showing larger image */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content">
              <span className="close-button" onClick={handleCloseModal}>X</span>
              <img src={selectedImage} alt="Enlarged View" className="modal-image" />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StoneView;
