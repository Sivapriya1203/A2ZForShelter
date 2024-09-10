import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';
import './productview.css';  
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const CateringView = () => {
  const { id } = useParams();
  const [catering, setCatering] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchCatering = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/cateringRoute/catering/${id}`);
        setCatering(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatering();
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
  if (!catering) return <p>Catering service not found</p>;

  return (
    <>
      <Navbar />
      <div className="product-view-container">
        <div className="product-card">
          <div className="product-images-section">
            {catering.images && catering.images.length > 0 ? (
              <div className="product-image-grid">
                {catering.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Catering Image ${index + 1}`}
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
            <h2 className="product-title">{catering.name || 'N/A'}</h2>
            <p><strong>Meals Offered:</strong> {catering.meals || 'N/A'}</p>
            <p><strong>Number of Consumer:</strong> {catering.numberOfPeople || 'N/A'}</p>
            <p><strong>Price:</strong> {catering.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {catering.description || 'N/A'}</p>
            <p><strong>Menu Catalogues:</strong> {catering.menuCatlogues || 'N/A'}</p>
            <p><strong>Address:</strong> {catering.shopAddress || 'N/A'}</p>

            {/* Button to toggle contact details */}
            <button className="contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>

            {/* Contact details section */}
            {showContact && (
              <div className="contact-details">
                <p><strong>Phone Number:</strong> {catering.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {catering.email || 'N/A'}</p>
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

export default CateringView;
