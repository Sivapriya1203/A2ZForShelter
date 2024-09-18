import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  Slider,
  Modal,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../../config"; // Ensure the config is correctly imported
import { Snackbar, Alert } from "@mui/material";

const { Title } = Typography;
const { Option } = Select;

const CementpostForm = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    shopAddress: "",
    brand: "Ramco Cements", // Default brand
    cementType: "",
    quantity: 1,
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

  const handleQuantityChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      quantity: value,
    }));
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) =>
          formDataToSend.append("images", file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${config.apiURL}/cementRoutes/cement`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Form Data Submitted: ", response.data);

      setSnackbarMessage("Form submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset the form
      setFormData({
        userId,
        name: "",
        email: "",
        phoneNumber: "",
        shopAddress: "",
        brand: "Ramco Cements",
        cementType: "",
        quantity: 1,
        price: "",
        images: [],
        description: "",
      });
      setFileList([]);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSnackbarMessage("Error submitting form. Please try again.");
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

  const inputStyle = { height: "50px" }; // Adjust the height as needed

  return (
    <div
      className="container"
      style={{ width: "80%", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Title
        level={1}
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "700",
        }}
      >
        Cement Seller
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleChange}
        initialValues={formData} // Set initial values for the form
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
              label="Shop Address"
              name="shopAddress"
              rules={[
                { required: true, message: "Please input your shop address!" },
              ]}
            >
              <Input.TextArea style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please select a brand!" }]}
            >
              <Select
                value={formData.brand}
                onChange={(value) => handleChange({ brand: value })}
                style={inputStyle}
              >
                {[
                  "Ramco Cements",
                  "Orient Cement",
                  "HeidelbergCement",
                  "Ambuja Cements",
                  "Dalmia Bharat",
                  "India Cements",
                  "UltraTech Cement",
                  "Tamilnadu Cements",
                  "Zuari Cements",
                  "Dhandapani Cements",
                  "Chettinad Cements",
                  "Shree Cement",
                  "Birla Corporation",
                ].map((brand) => (
                  <Option key={brand} value={brand}>
                    {brand}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Cement Type"
              name="cementType"
              rules={[
                { required: true, message: "Please input the cement type!" },
              ]}
            >
              <Input style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Quantity (Kg)" name="quantity">
              <Slider
                min={1}
                max={1000}
                onChange={handleQuantityChange}
                value={formData.quantity}
                marks={{
                  1: "1 Kg",
                  250: "250 Kg",
                  500: "500 Kg",
                  750: "750 Kg",
                  1000: "1000 Kg",
                }}
                style={{ marginTop: "8px" }} // Adjust the margin as needed
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" min={1} style={inputStyle} />
            </Form.Item>
          </Col>
        </Row>

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

      {/* Modal for Image Preview */}
      <Modal
        open={previewVisible} // Use `open` instead of `visible`
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      {/* Snackbar for feedback messages */}
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

export default CementpostForm;
