import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customIcon from "./images/location.png";
import config from "../../config";
import image1 from "./images/image1.webp";
import image2 from "./images/image2.webp";
import image3 from "./images/image3.jpg";
import image4 from "./images/image4.webp";
import image5 from "./images/image5.jpg";
import "./HeroSection.css";

const customMarkerIcon = new L.Icon({
  iconUrl: customIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const bannerImages = [image1, image2, image3, image4, image5];

function MapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  return null;
}

function HeroSection() {
  const [mapCenter, setMapCenter] = useState([11.0168, 76.9558]);
  const [markerPosition, setMarkerPosition] = useState([11.0168, 76.9558]);
  const [mapZoom, setMapZoom] = useState(13);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    customPaging: i => (
      <div className="slick-dot" />
    )
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${config.apiURL}/api/states`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setStates(
            data.map((state) => ({
              id: state.geonameId,
              name: state.name,
              lat: state.lat,
              lon: state.lng,
            }))
          );
        } else {
          console.error("Expected an array but got:", data);
          setStates([]);
        }
      } catch (error) {
        console.error("Failed to fetch states:", error);
        setStates([]);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchDistricts = async () => {
        try {
          const response = await fetch(
            `${config.apiURL}/api/districts?stateGeonameId=${selectedState}`
          );
          const data = await response.json();
          setDistricts(
            data.map((district) => ({
              id: district.geonameId,
              name: district.name,
              lat: district.lat,
              lon: district.lng,
            }))
          );
          setCities([]);
          setSelectedDistrict("");
          setSelectedCity("");

          const state = states.find((state) => state.id === selectedState);
          if (state) {
            const newCenter = [state.lat, state.lon];
            setMapCenter(newCenter);
            setMarkerPosition(newCenter);
            setMapZoom(10);
          }
        } catch (error) {
          console.error("Failed to fetch districts:", error);
          setDistricts([]);
        }
      };
      fetchDistricts();
    }
  }, [selectedState, states]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `${config.apiURL}/api/cities?districtGeonameId=${selectedDistrict}`
          );
          const data = await response.json();
          setCities(
            data.map((city) => ({
              id: city.geonameId,
              name: city.name,
              lat: city.lat,
              lon: city.lng,
            }))
          );
          setSelectedCity("");

          const district = districts.find(
            (district) => district.id === selectedDistrict
          );
          if (district) {
            const newCenter = [district.lat, district.lon];
            setMapCenter(newCenter);
            setMarkerPosition(newCenter);
            setMapZoom(12);
          }
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          setCities([]);
        }
      };
      fetchCities();
    }
  }, [selectedDistrict, districts]);

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((city) => city.id === selectedCity);
      if (city) {
        const newCenter = [city.lat, city.lon];
        setMapCenter(newCenter);
        setMarkerPosition(newCenter);
        setMapZoom(13);
      }
    }
  }, [selectedCity, cities]);

  const handleLocationSearch = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`
    );
    const data = await response.json();
    if (data.length > 0) {
      const newPosition = [data[0].lat, data[0].lon];
      setMapCenter(newPosition);
      setMarkerPosition(newPosition);
      setMapZoom(13);
    }
  };

  return (
    <React.Fragment>
      <Box className="hero-container">
        <Slider {...settings}>
          {bannerImages.map((image, index) => (
            <Box
              key={index}
              style={{
                position: "relative",
                height: "100vh",
              }}
            >
              <img src={image} alt={`Banner ${index}`} />
              <Box className="hero-overlay" />
              <Container
                maxWidth="lg"
                style={{
                  position: "relative",
                  zIndex: 3,
                  color: "white",
                  paddingTop: "100px",
                }}
              >
                <Typography variant="h3" gutterBottom>
                  Your Property, Our Priority.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  From as low as $10 per day with limited time offer discounts.
                </Typography>

                <Paper elevation={3} className="search-box">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        select
                        label="State"
                        variant="outlined"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        {states.map((state) => (
                          <MenuItem key={state.id} value={state.id}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        select
                        label="District"
                        variant="outlined"
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        disabled={!selectedState}
                      >
                        {districts.map((district) => (
                          <MenuItem key={district.id} value={district.id}>
                            {district.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        select
                        label="City"
                        variant="outlined"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        disabled={!selectedDistrict}
                      >
                        {cities.map((city) => (
                          <MenuItem key={city.id} value={city.id}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={10} md={3}>
                      <TextField
                        className="search-location"
                        fullWidth
                        variant="outlined"
                        label="Search Location"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleLocationSearch();
                          }
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Search Item"
                      style={{ maxWidth: '500px' }} 
                    />
                  </Grid>

                </Paper>
              </Container>
            </Box>
          ))}
        </Slider>

        <Box className="map-container">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "400px", width: "100%", }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapView center={mapCenter} zoom={mapZoom} />
            <Marker position={markerPosition} icon={customMarkerIcon}>
              <Popup>A custom marker!</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default HeroSection;
