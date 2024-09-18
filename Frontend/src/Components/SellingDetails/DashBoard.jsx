import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Box,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Modal,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import { Close as CloseIcon } from "@mui/icons-material";

const SellerDashboard = () => {
  const [houses, setHouses] = useState([]);
  const [catering, setCatering] = useState([]);
  const [cement, setCement] = useState([]);
  const [interior, setInterior] = useState([]);
  const [pipeWire, setPipeWire] = useState([]);
  const [sand, setSand] = useState([]);
  const [steel, setSteel] = useState([]);
  const [stone, setStone] = useState([]);
  const [wood, setWood] = useState([]);
  const [pgHostel, setPgHostel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tabValue, setTabValue] = useState(0); // Tab state for navigation
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [selectedImage, setSelectedImage] = useState(""); // Selected image URL
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar for token expiration

  const navigate = useNavigate(); // hook for navigation

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // Treat "No token found" as session expiration
        if (!token) {
          throw new Error("Session expired");
        }
        // Fetch data for all categories
        const [
          houseResponse,
          cateringResponse,
          cementResponse,
          interiorResponse,
          pipeWireResponse,
          sandResponse,
          steelResponse,
          stoneResponse,
          woodResponse,
          pgHostelResponse,
        ] = await Promise.all([
          axios.get(`${config.apiURL}/houseRoute/GetUserHouse`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/cateringRoute/GetUserCatering`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/cementRoutes/GetUserCement`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/interiorRoute/GetUserInterior`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/pipeWiresRoute/GetUserPipeWire`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/sandRoute/GetUserSand`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/steelRoute/GetUserSteel`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/stoneRoute/GetUserStone`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/woodRoute/GetUserWood`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/pgHostelRoute/GetUserPG`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Set fetched data to their respective states
        setHouses(houseResponse.data);
        setCatering(cateringResponse.data);
        setCement(cementResponse.data);
        setInterior(interiorResponse.data);
        setPipeWire(pipeWireResponse.data);
        setSand(sandResponse.data);
        setSteel(steelResponse.data);
        setStone(stoneResponse.data);
        setWood(woodResponse.data);
        setPgHostel(pgHostelResponse.data);
      } catch (err) {
        if (
          err.message === "Session expired" ||
          (err.response && err.response.status === 401)
        ) {
          setError("Session expired, please log in again.");
          setOpenSnackbar(true);

          // Clear the token and redirect to login
          localStorage.removeItem("authToken");
          setTimeout(() => {
            setOpenSnackbar(false);
            navigate("/login");
          }, 5000); // Redirect after 5 seconds
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          flexDirection="column"
          backgroundColor="#000"
        >
          <Typography color="error">{error}</Typography>
        </Box>

        {/* Snackbar for session expired */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            Session expired, redirecting to login...
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          backgroundColor: "burlywood",
        }}
      >
        {/* Box for the centered "Seller Dashboard" title */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Dashboard
          </Typography>
        </Box>

        {/* Box for the "Sell Property" button aligned to the right */}
        <Box>
          <Link to="/post" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: "35px" }}
            >
              +Sell Property
            </Button>
          </Link>
        </Box>
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
        style={{
          backgroundColor: "#2E3B55", // Darker background
          padding: "0.5rem 1rem", // Extra padding for spacing
        }}
        TabIndicatorProps={{
          style: {
            height: "4px",
            backgroundColor: "#f0fff0", // Indicator color
          },
        }}
      >
        <Tab label="Houses" sx={tabStyles} />
        <Tab label="Catering" sx={tabStyles} />
        <Tab label="Cement" sx={tabStyles} />
        <Tab label="Interior" sx={tabStyles} />
        <Tab label="Pipe & Wire" sx={tabStyles} />
        <Tab label="Sand" sx={tabStyles} />
        <Tab label="Steel" sx={tabStyles} />
        <Tab label="Stone" sx={tabStyles} />
        <Tab label="Wood" sx={tabStyles} />
        <Tab label="PG Hostels" sx={tabStyles} />
      </Tabs>
      <Container maxWidth="false" sx={{ mt: 4 }}>
        {/* Render content based on selected tab */}
        {tabValue === 0 && (
          <HouseSection
            houses={houses}
            config={config}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 1 && (
          <Section
            title="Catering"
            data={catering}
            config={config}
            renderDetails={renderCateringDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 2 && (
          <Section
            title="Cement"
            data={cement}
            config={config}
            renderDetails={renderCementDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 3 && (
          <Section
            title="Interior"
            data={interior}
            config={config}
            renderDetails={renderInteriorDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 4 && (
          <Section
            title="Pipe & Wire"
            data={pipeWire}
            config={config}
            renderDetails={renderPipeWireDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 5 && (
          <Section
            title="Sand"
            data={sand}
            config={config}
            renderDetails={renderSandDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 6 && (
          <Section
            title="Steel"
            data={steel}
            config={config}
            renderDetails={renderSteelDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 7 && (
          <Section
            title="Stone"
            data={stone}
            config={config}
            renderDetails={renderStoneDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 8 && (
          <Section
            title="Wood"
            data={wood}
            config={config}
            renderDetails={renderWoodDetails}
            onImageClick={handleImageClick}
          />
        )}
        {tabValue === 9 && (
          <PgSection
            pgHostel={pgHostel}
            config={config}
            onImageClick={handleImageClick}
          />
        )}

        {/* Image Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="image-modal-title"
          aria-describedby="image-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "600px",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <CardMedia
              component="img"
              height="auto"
              image={selectedImage}
              alt="Large view"
              sx={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
          </Box>
        </Modal>
      </Container>
    </>
  );
};

const HouseSection = ({ houses, config, onImageClick }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h5" gutterBottom>
      Houses
    </Typography>
    <Grid container spacing={4}>
      {houses.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <Card sx={{ maxWidth: 345 }}>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                p: 1, // Optional padding around images
              }}
            >
              {item.photos && item.photos.length > 0 ? (
                item.photos.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      flexShrink: 0, // Ensure items don't shrink when scrolling
                      width: "150px", // Set width for images
                      mr: 2, // Space between images
                      cursor: "pointer", // Add cursor pointer for clickable images
                    }}
                    onClick={() => onImageClick(`${config.apiURL}/${image}`)}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={`${config.apiURL}/${image}`}
                      alt={`Image ${index + 1}`}
                      sx={{ objectFit: "cover", borderRadius: 2 }}
                    />
                  </Box>
                ))
              ) : (
                <CardMedia
                  component="img"
                  height="200"
                  image="defaultImage.jpg"
                  alt="No photo available"
                  sx={{ objectFit: "cover", borderRadius: 2 }}
                />
              )}
            </Box>

            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.name} - {item.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {item.phoneNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Address: {item.location} ,{item.cityName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.districtName} {item.stateName}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                sx={{ fontWeight: "bold", my: 1 }}
              >
                ₹ {item.price?.toLocaleString() || "N/A"}
              </Typography>
              {/* Additional house-related fields */}
              <Typography variant="body2" color="textSecondary">
                BedRooms: {item.bedrooms}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                BathRooms: {item.bathrooms}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Facing: {item.facing}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const PgSection = ({ pgHostel, config, onImageClick }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h5" gutterBottom>
      Houses
    </Typography>
    <Grid container spacing={4}>
      {pgHostel.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <Card sx={{ maxWidth: 345 }}>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                p: 1, // Optional padding around images
              }}
            >
              {item.photos && item.photos.length > 0 ? (
                item.photos.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      flexShrink: 0, // Ensure items don't shrink when scrolling
                      width: "150px", // Set width for images
                      mr: 2, // Space between images
                      cursor: "pointer", // Add cursor pointer for clickable images
                    }}
                    onClick={() => onImageClick(`${config.apiURL}/${image}`)}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={`${config.apiURL}/${image}`}
                      alt={`Image ${index + 1}`}
                      sx={{ objectFit: "cover", borderRadius: 2 }}
                    />
                  </Box>
                ))
              ) : (
                <CardMedia
                  component="img"
                  height="200"
                  image="defaultImage.jpg"
                  alt="No photo available"
                  sx={{ objectFit: "cover", borderRadius: 2 }}
                />
              )}
            </Box>

            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.name} - {item.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {item.phoneNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Address: {item.location} ,{item.cityName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.districtName} {item.stateName}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                sx={{ fontWeight: "bold", my: 1 }}
              >
                ₹ {item.price?.toLocaleString() || "N/A"}
              </Typography>
              {/* Additional house-related fields */}
              <Typography variant="body2" color="textSecondary">
                BedRooms: {item.bedrooms}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                BathRooms: {item.bathrooms}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Facing: {item.facing}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const Section = ({ title, data, config, renderDetails, onImageClick }) => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={4}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <Card sx={{ maxWidth: 345 }}>
            <Grid container spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  p: 1, // Optional padding around images
                }}
              >
                {item.images && item.images.length > 0 ? (
                  item.images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        flexShrink: 0, // Ensure items don't shrink when scrolling
                        width: "150px", // Set width for images
                        mr: 2, // Space between images
                        cursor: "pointer", // Add cursor pointer for clickable images
                      }}
                      onClick={() => onImageClick(`${config.apiURL}/${image}`)}
                    >
                      <CardMedia
                        component="img"
                        height="150"
                        image={`${config.apiURL}/${image}`}
                        alt={`Image ${index + 1}`}
                        sx={{ objectFit: "cover", borderRadius: 2 }}
                      />
                    </Box>
                  ))
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image="defaultImage.jpg"
                    alt="No photo available"
                    sx={{ objectFit: "cover", borderRadius: 2 }}
                  />
                )}
              </Box>
            </Grid>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {item.phoneNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Address: {item.shopAddress || item.sellerAddress}
              </Typography>
              <Typography
                variant="body1"
                color="textPrimary"
                sx={{ fontWeight: "bold", my: 1 }}
              >
                ₹ {item.price?.toLocaleString() || "N/A"}
              </Typography>
              {renderDetails(item)}

              <Typography>{item.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const renderCateringDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Meals: {item.meals}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Menu: {item.menuCatlogues}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Serves: {item.numberOfPeople} people
    </Typography>
  </>
);

const renderCementDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Brand: {item.brand}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Type: {item.cementType}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Quantity: {item.quantity}
    </Typography>
  </>
);

const renderInteriorDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Category: {item.category}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Product: {item.products}
    </Typography>
  </>
);

const renderPipeWireDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Category: {item.category}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Product: {item.products}
    </Typography>
  </>
);

const renderSandDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Category: {item.category}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Product: {item.products}
    </Typography>
  </>
);

const renderSteelDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Category: {item.category}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Product: {item.products}
    </Typography>
  </>
);

const renderStoneDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Category: {item.category}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Product: {item.products}
    </Typography>
  </>
);

const renderWoodDetails = (item) => (
  <>
    <Typography variant="body2" color="textSecondary">
      Category: {item.category}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      Product: {item.products}
    </Typography>
  </>
);
const tabStyles = {
  color: "#FFFFFF", // Default white text
  fontWeight: 600, // Slightly bolder text
  padding: "12px 24px", // Add padding to increase clickable area
  textTransform: "none", // Disable uppercase transformation
  borderRadius: "15px", // Rounded edges for a modern look
  transition: "background-color 0.3s ease-in-out", // Smooth transition effect
  "&:hover": {
    backgroundColor: "#3C4858", // Background color on hover
  },
  "&.Mui-selected": {
    color: "#ffe4b5", // Active tab text color
    fontWeight: 900,
    backgroundColor: "#1F2736", // Background color for active tab
  },
};

export default SellerDashboard;
