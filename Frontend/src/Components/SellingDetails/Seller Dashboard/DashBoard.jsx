import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import CategoryHouse from "./House";
import CategoryPgHostel from "./PGHostel";
import CategoryCatering from "./Catering";
import CategoryCement from "./Cement";
import CategoryInterior from "./Interior";
import CategoryPipeWires from "./Pipewires";
import CategorySand from "./Sand";
import CategorySteel from "./Steel";
import CategoryStone from "./Stone";
import CategoryWood from "./Wood";
import { Snackbar, Alert } from "@mui/material";
import axios from "axios";
import config from "../../../config";
import "./Style.css";

function SellerDashboard() {
  const [tokenValid, setTokenValid] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [categoriesData, setCategoriesData] = useState({
    house: [],
    pgHostel: [],
    catering: [],
    cement: [],
    interior: [],
    pipeWires: [],
    sand: [],
    steel: [],
    stone: [],
    wood: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setTokenValid(false);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      try {
        const response = await axios.post(
          `${config.apiURL}/api/validateToken`,
          {
            token: token,
          }
        );

        if (response.data.valid) {
          setTokenValid(true);
          fetchCategoriesData(token);
        } else {
          setTokenValid(false);
          setOpenSnackbar(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setTokenValid(false);
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    const fetchCategoriesData = async (token) => {
      try {
        const [
          house,
          pgHostel,
          catering,
          cement,
          interior,
          pipeWires,
          sand,
          steel,
          stone,
          wood,
        ] = await Promise.all([
          axios.get(`${config.apiURL}/houseRoute/GetUserHouse`, {
            headers: { Authorization: `Bearer ${token} ` },
          }),
          axios.get(`${config.apiURL}/pgHostelRoute/GetUserPG`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.apiURL}/cateringRoute/GetUserCatering`, {
            headers: { Authorization: `Bearer ${token} ` },
          }),
          axios.get(`${config.apiURL}/cementRoutes/GetUserCement`, {
            headers: { Authorization: `Bearer ${token} ` },
          }),
          axios.get(`${config.apiURL}/interiorRoute/GetUserInterior`, {
            headers: { Authorization: `Bearer ${token} ` },
          }),
          axios.get(`${config.apiURL}/pipeWiresRoute/GetUserPipeWire`, {
            headers: { Authorization: `Bearer ${token} ` },
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
        ]);

        setCategoriesData({
          house: house.data,
          pgHostel: pgHostel.data,
          catering: catering.data,
          cement: cement.data,
          interior: interior.data,
          pipeWires: pipeWires.data,
          sand: sand.data,
          steel: steel.data,
          stone: stone.data,
          wood: wood.data,
        });
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const hasData = Object.values(categoriesData).some(
    (category) => category.length > 0
  );

  if (!tokenValid) {
    return (
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Please login.
          </Alert>
        </Snackbar>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {hasData ? (
        <>
          {categoriesData.house.length > 0 && (
            <CategoryHouse data={categoriesData.house} />
          )}
          {categoriesData.pgHostel.length > 0 && (
            <CategoryPgHostel data={categoriesData.pgHostel} />
          )}
          {categoriesData.catering.length > 0 && (
            <CategoryCatering data={categoriesData.catering} />
          )}
          {categoriesData.cement.length > 0 && (
            <CategoryCement data={categoriesData.cement} />
          )}
          {categoriesData.interior.length > 0 && (
            <CategoryInterior data={categoriesData.interior} />
          )}
          {categoriesData.pipeWires.length > 0 && (
            <CategoryPipeWires data={categoriesData.pipeWires} />
          )}
          {categoriesData.sand.length > 0 && (
            <CategorySand data={categoriesData.sand} />
          )}
          {categoriesData.steel.length > 0 && (
            <CategorySteel data={categoriesData.steel} />
          )}
          {categoriesData.stone.length > 0 && (
            <CategoryStone data={categoriesData.stone} />
          )}
          {categoriesData.wood.length > 0 && (
            <CategoryWood data={categoriesData.wood} />
          )}
        </>
      ) : (
        <div
          className="no-products-available"
          style={{
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "16px" }}>
            No Products Available
          </h2>
          <a
            href="/post"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 123, 255, 0.5)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Add Products
          </a>
        </div>
      )}
      <Footer />
    </>
  );
}

export default SellerDashboard;
