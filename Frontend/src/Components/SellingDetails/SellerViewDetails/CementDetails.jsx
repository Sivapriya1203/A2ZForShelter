import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../../config";
import "./productview.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SellerCementView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cement, setCement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchCement = async () => {
      try {
        const response = await axios.get(
          `${config.apiURL}/cementRoutes/cement/${id}`
        );
        setCement(response.data);
        setEditData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCement();
  }, [id]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(cement); // Reset to original data
  };

  const handleSaveEdit = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${config.apiURL}/cementRoutes/cement/${id}`, editData);
      setCement(editData); // Update the view with the new data
      setIsEditing(false);
      setSnackbarMessage("Cement updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage("Failed to update cement.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setIsProcessing(true);
    try {
      await axios.delete(`${config.apiURL}/cementRoutes/cement/${id}`);
      setOpenDeleteDialog(false);
      setSnackbarMessage("Cement deleted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/cement"); // Redirect after deletion
    } catch (err) {
      setSnackbarMessage("Failed to delete cement.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Close the snackbar after a few seconds
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;
  if (!cement) return <p>Cement not found</p>;

  return (
    <>
      <Navbar />
      <div className="product-view-container">
        <div className="product-card">
          <div className="product-images-section">
            {cement.images && cement.images.length > 0 ? (
              <div className="product-image-grid">
                {cement.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${config.apiURL}/${image}`}
                    alt={`Cement Image ${index + 1}`}
                    className="product-image-item"
                    onClick={() =>
                      handleImageClick(`${config.apiURL}/${image}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          <div className="product-details-section">
            {isEditing ? (
              <>
                <label htmlFor="Brand">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  value={editData.brand || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editData.name || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">CementType</label>
                <input
                  type="text"
                  name="cementType"
                  value={editData.cementType || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editData.quantity || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editData.price || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editData.description || ""}
                  onChange={handleFieldChange}
                />
                <label htmlFor="">ShopAddress</label>
                <input
                  type="text"
                  name="shopAddress"
                  value={editData.shopAddress || ""}
                  onChange={handleFieldChange}
                />
              </>
            ) : (
              <>
                <h2 className="product-title">{cement.brand || "N/A"}</h2>
                <p>
                  <strong>Name:</strong> {cement.name || "N/A"}
                </p>
                <p>
                  <strong>Type:</strong> {cement.cementType || "N/A"}
                </p>
                <p>
                  <strong>Quantity:</strong> {cement.quantity || "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> {cement.price || "N/A"} RPS
                </p>
                <p>
                  <strong>Description:</strong> {cement.description || "N/A"}
                </p>
                <p>
                  <strong>Shop Address:</strong> {cement.shopAddress || "N/A"}
                </p>
              </>
            )}

            <div className="action-buttons">
              {isEditing ? (
                <>
                  <IconButton onClick={handleSaveEdit} disabled={isProcessing}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleCancelEdit}
                    disabled={isProcessing}
                  >
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Modal for showing larger image */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content">
              <span className="close-button" onClick={handleCloseModal}>
                X
              </span>
              <img
                src={selectedImage}
                alt="Enlarged View"
                className="modal-image"
              />
            </div>
          </div>
        )}

        {/* Dialog for delete confirmation */}
        <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="secondary"
              disabled={isProcessing}
            >
              {isProcessing ? <CircularProgress size={24} /> : "Confirm"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for success/failure messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
      <Footer />
    </>
  );
};

export default SellerCementView;
