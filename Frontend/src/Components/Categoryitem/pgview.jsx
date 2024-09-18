import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../../config';
import './productview.css'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer';

const ProductViewpg = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${config.apiURL}/pgHostelRoute/pgHostel/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
  if (!product) return <p>Product not found</p>;

  return (
    <>
      <Navbar />
      <div className="product-view-container">
        <div className="product-card">
          <div className="product-images-section">
            {product.photos && product.photos.length > 0 ? (
              <div className="product-image-grid">
                {product.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${photo}`}
                    alt={`Product Image ${index + 1}`}
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
            <h2 className="product-title">{product.pgHostelName || 'N/A'}</h2>
            <p><strong>Location:</strong> {`${product.cityName || 'N/A'}, ${product.districtName || 'N/A'}, ${product.stateName || 'N/A'}`}</p>
            <p><strong>Total Floors:</strong> {product.totalFloors || 'N/A'}</p>
            <p><strong>Room Type:</strong> {product.acRoom || 'N/A'}</p>
            <p><strong>Food Included:</strong> {product.food || 'N/A'}</p>
            <p><strong>Car Parking:</strong> {product.carParking || 'N/A'}</p>
            <p><strong>Monthly Maintenance:</strong> {product.maintenance || 'N/A'}</p>
            <p><strong>Price:</strong> {product.price || 'N/A'} RPS</p>
            <p><strong>Description:</strong> {product.description || 'N/A'}</p>
            
            {/* Contact Details Button */}
            <button className="contact-details-button" onClick={handleToggleContact}>
              {showContact ? 'Hide Contact Details' : 'Show Contact Details'}
            </button>
            
            {/* Conditional Rendering of Contact Details */}
            {showContact && (
              <div className="contact-details">
                <p><strong>Phone Number:</strong> {product.phoneNumber || 'N/A'}</p>
                <p><strong>Email ID:</strong> {product.email || 'N/A'}</p>
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

export default ProductViewpg;
