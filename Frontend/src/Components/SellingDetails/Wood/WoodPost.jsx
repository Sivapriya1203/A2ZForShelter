import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  Modal,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import config from "../../../config";
import "../SalePost.css"; // Your custom CSS, if needed

const { Title } = Typography;
const { Option } = Select;

const WoodpostForm = () => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    wood: "Plywood", // Default wood type
    thickness: "",
    quantityType: "Piece", // Default quantity type
    quantity: "1 Piece",
    price: "",
    images: [],
    description: "",
  });

  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      axios
        .get(`${config.apiURL}/api/getprofile`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          const { username, email, phoneNumber, _id } = response.data;
          // Update form data
          setFormData((prevData) => ({
            ...prevData,
            userId: _id,
            name: username,
            email,
            phoneNumber,
          }));
          // Set values in the form inputs
          form.setFieldsValue({
            name: username,
            email,
            phoneNumber,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [form]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChange = (changedValues) => {
    setFormData((prevData) => ({
      ...prevData,
      ...changedValues,
    }));
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    setFormData((prevData) => ({
      ...prevData,
      images: fileList.map((file) => file.originFileObj),
    }));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleSubmit = async () => {
    let updatedThickness = formData.thickness;
    if (!updatedThickness.endsWith("mm")) {
      updatedThickness = `${updatedThickness} mm`;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => {
          formDataToSend.append("images", file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${config.apiURL}/woodRoute/wood`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset form after successful submission
      setFormData({
        userId,
        name: "",
        email: "",
        phoneNumber: "",
        sellerAddress: "",
        wood: "Plywood",
        thickness: "",
        quantityType: "Piece",
        quantity: "1 Piece",
        price: "",
        images: [],
        description: "",
      });
      setFileList([]);
    } catch (error) {
      setSnackbarMessage("Error submitting form.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const inputStyle = { height: "50px" }; // Adjust the height if needed

  return (
    <div
      className="container"
      style={{ width: "80%", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Title
        level={1}
        style={{ textAlign: "center", marginBottom: "20px", fontWeight: "700" }}
      >
        Wood Seller
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleChange}
        initialValues={formData}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input style={inputStyle} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email ID"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" style={inputStyle} readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input type="tel" style={inputStyle} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Seller Address"
              name="sellerAddress"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input.TextArea style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Wood"
              name="wood"
              rules={[
                { required: true, message: "Please select the wood type!" },
              ]}
            >
              <Select
                value={formData.wood}
                onChange={(value) => handleChange({ wood: value })}
                style={inputStyle}
              >
                {[
                  "Plywood",
                  "Bamboo",
                  "Redwood",
                  "Pine Wood",
                  "Cedar Wood",
                  "Spruce Wood",
                  "Ash",
                  "Birch",
                  "Poplar",
                  "Firwood",
                  "Hemlock Timber",
                  "Teak Wood",
                  "Oak Wood",
                  "Maple Wood",
                  "Cherry Wood",
                  "Walnut Wood",
                  "Beech Wood",
                  "Mahogany",
                  "Mango Wood",
                  "Sal Wood",
                  "Laminated Veneer Lumber",
                  "Hardboard/High-Density Fiberboard",
                  "Medium-Density Fiberboard (MDF)",
                ].map((wood) => (
                  <Option key={wood} value={wood}>
                    {wood}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Thickness (in mm)"
              name="thickness"
              rules={[
                { required: true, message: "Please input the thickness!" },
              ]}
            >
              <Input type="number" style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Quantity Type"
              name="quantityType"
              rules={[
                { required: true, message: "Please select the quantity type!" },
              ]}
            >
              <Select
                value={formData.quantityType}
                onChange={(value) => handleChange({ quantityType: value })}
                style={inputStyle}
              >
                {["Piece", "Kg", "Sq ft", "Cubic feet", "Tonne"].map(
                  (quantityType) => (
                    <Option key={quantityType} value={quantityType}>
                      {quantityType}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Quantity" name="quantity">
              <Input value={formData.quantity} readOnly style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input type="number" min={1} style={inputStyle} />
        </Form.Item>

        <Form.Item
          label="Upload Images"
          rules={[
            { required: true, message: "Please upload at least one image!" },
          ]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            onPreview={handlePreview}
            beforeUpload={() => false}
            multiple
          >
            {fileList.length >= 8 ? null : (
              <Button icon={<UploadOutlined />}>Upload</Button>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please provide a description!" }]}
        >
          <Input.TextArea style={inputStyle} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default WoodpostForm;
