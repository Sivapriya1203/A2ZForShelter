import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const MapComponent = ({ selectedLocation }) => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    if (
      selectedLocation.state &&
      selectedLocation.district &&
      selectedLocation.city
    ) {
      const fetchData = async () => {
        const apiKey = "11984034d8257d016c8fee8719b0c898"; 
        const apiUrl = `https://api.gateway.attomdata.com/propertyapi/v4.0.0/property/basicprofile`;

        try {
          const response = await axios.get(apiUrl, {
            headers: {
              accept: "application/json",
              apikey: apiKey,
            },
            params: {
              state: selectedLocation.state,
              district: selectedLocation.district,
              city: selectedLocation.city,
            },
          });
          setLocationData(response.data.property);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [selectedLocation]);

  return (
    <MapContainer
      center={[37.7749, -122.4194]} 
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationData.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]} 
          icon={L.icon({ iconUrl: "path/to/marker-icon.png" })} 
        >
          <Popup>
            <div>
              <h4>{location.title}</h4>
              <img
                src={location.image}
                alt={location.title}
                style={{ width: "100px" }}
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
