import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Header.css";
import config from "../../../config";

const InteriorpostForm = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    userId,
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    category: "",
    products: "",
    price: "",
    images: [],
    description: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const categoryProductsMap = {
    "Wall & Table Decor": [
      "Wall prints", 
      "Clocks", 
      "Table lamps", 
      "Art", 
      "Mirrors", 
      "Photo frames", 
      "Books", 
      "Crystals", 
      "Glass sculptures", 
      "Records", 
      "Magazines", 
      "Marble trivets", 
      "Game board", 
      "Decorative bowl or plate", 
      "Juju hat", 
      "Globe", 
      "Cloche", 
      "Coasters"
    ],
    "Soft Furnishings": [
      "Cushions", 
      "Rugs", 
      "Sheepskins", 
      "Throw rugs", 
      "Floor runner"
    ],
    "Furniture": [
      "Stool", 
      "Side tables", 
      "Occasional chairs", 
      "Timber decor"
    ],
    "Storage & Organization": [
      "Baskets", 
      "Hooks", 
      "Pinboards", 
      "Canisters", 
      "Trays", 
      "Box"
    ],
    "Lighting": [
      "Floor lamps", 
      "Candles", 
      "Oil burners", 
      "Candle sticks"
    ],
    "Plants & Natural Elements": [
      "Indoor plants", 
      "Dried flowers", 
      "Coral", 
      "Pot stand", 
      "Watering can"
    ],
    "Textiles & Accessories": [
      "Vases", 
      "Macrame", 
      "Cowhide", 
      "Hourglass", 
      "Wick trimmer"
    ],
    "Tiles": [
      "Ceramic tiles", 
      "Porcelain tiles", 
      "Mosaic tiles", 
      "Subway tiles", 
      "Terrazzo tiles", 
      "Marble tiles", 
      "Glass tiles", 
      "Patterned tiles", 
      "Encaustic cement tiles", 
      "Hexagonal tiles", 
      "Wood-look tiles", 
      "Natural stone tiles", 
      "Metallic tiles", 
      "3D tiles"
    ],
    "Paints": [
      "Matte paint", 
      "Satin paint", 
      "Gloss paint", 
      "Eggshell paint", 
      "Chalk paint", 
      "Textured paint", 
      "Metallic paint", 
      "Eco-friendly paint", 
      "Accent wall paint", 
      "Pastel paint", 
      "Ombre paint", 
      "Magnetic paint", 
      "Chalkboard paint", 
      "Ceiling paint", 
      "Glow-in-the-dark paint"
    ],
    "False Ceiling (Parceiling) Products": [
      "Gypsum ceiling", 
      "POP ceiling", 
      "Wooden ceiling panels", 
      "PVC ceiling panels", 
      "Metal ceiling panels", 
      "Glass ceiling panels", 
      "Fabric ceilings", 
      "Coffered ceilings", 
      "Acoustic ceiling tiles", 
      "Stretch ceiling", 
      "Plastic ceilings", 
      "Mineral fiber ceilings", 
      "LED light ceiling panels", 
      "Tin ceiling tiles", 
      "Mirror ceiling panels"
    ],
    "Bathroom Products": [
      "Wash basin", 
      "Bathtub", 
      "Shower head", 
      "Toilet", 
      "Bathroom vanity", 
      "Towel rack", 
      "Soap dispenser", 
      "Toilet paper holder", 
      "Bathroom mirror", 
      "Shower curtain", 
      "Bath mat", 
      "Shower caddy", 
      "Towel hooks", 
      "Toothbrush holder", 
      "Bathroom storage cabinet"
    ],
    "Kitchen Products": [
      "Kitchen sink", 
      "Cookware", 
      "Cutlery", 
      "Dinnerware", 
      "Kitchen cabinets", 
      "Chopping board", 
      "Dish rack", 
      "Spice rack", 
      "Oven", 
      "Microwave", 
      "Refrigerator", 
      "Kitchen island", 
      "Range hood", 
      "Blender", 
      "Coffee maker", 
      "Toaster", 
      "Utensil holder", 
      "Kitchen towels", 
      "Pantry storage jars", 
      "Knife set", 
      "Measuring cups", 
      "Mixing bowls"
    ]
  };
  
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      products: "", // Reset products when category changes
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const newImages = prevData.images.filter((_, i) => i !== index);
      return {
        ...prevData,
        images: newImages,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData[key].forEach((file) => {
          formDataToSend.append("images", file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(`${config.apiURL}/interiorRoute/interior`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSnackbarMessage("Form submitted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        sellerAddress: "",
        category: "",
        products: "",
        price: "",
        images: [],
        description: "",
      
      }); 
     
    } catch (error) {
      setSnackbarMessage("Error submitting form");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <h2>Interior Products Seller</h2>
      <form onSubmit={handleSubmit}>
        {/* Your form fields here */}
        <div className="form-group">
          <label>
            Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Email ID: <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Phone Number: <span className="required">*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Seller Address: <span className="required">*</span>
          </label>
          <textarea
            name="sellerAddress"
            value={formData.sellerAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Categories: <span className="required">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            required
          >
            {[
              "select a Category",
              "Wall & Table Decor",
              "Soft Furnishings",
              "Furniture",
              "Storage & Organization",
              "Lighting",
              "Plants & Natural Elements",
              "Textiles & Accessories",
              "Tiles",
              "False Ceiling (Parceiling) Products",
              "Bathroom Products",
              "Kitchen Products",
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Products:</label>
          <select
            name="products"
            value={formData.products}
            onChange={handleChange}
            required
          >
            <option value="">Select a Product</option>
            {(categoryProductsMap[formData.category] || []).map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>
            Price: <span className="required">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            Upload Images: <span className="required">*</span>
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
        </div>
        <div className="image-preview">
          {formData.images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="image-preview-item"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="remove-image-button"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>
            Description: <span className="required">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InteriorpostForm;