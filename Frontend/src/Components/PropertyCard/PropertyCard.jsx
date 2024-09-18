import React from "react";
import "./PropertyCard.css";

const PropertyCard = ({ title, image, description }) => {
  return (
    <div className="property-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default PropertyCard;
