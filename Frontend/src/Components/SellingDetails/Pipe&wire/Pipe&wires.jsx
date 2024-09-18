import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
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
import "../SalePost.css"; // Custom CSS

const { Title } = Typography;
const { Option } = Select;

const Pipe_wires = () => {
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phoneNumber: "",
    sellerAddress: "",
    Type: "Pipes", // Default Type
    pipeType: "Metalic Pipe",
    pipeBrand: "",
    pipeDiameter: "",
    pipeLength: "",
    wireBrand: "",
    wireType: "Electrical Wire",
    wireDiameter: "",
    wireLength: "",
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
    let updatedPipeDiameter = formData.pipeDiameter;
    let updatedPipeLength = formData.pipeLength;
    let updatedWireDiameter = formData.wireDiameter;
    let updatedWireLength = formData.wireLength;

    // Ensure proper units
    if (!updatedPipeDiameter.endsWith("Inch")) {
      formData.pipeDiameter = `${updatedPipeDiameter} Inch`;
    }
    if (!updatedPipeLength.endsWith("Meter")) {
      formData.pipeLength = `${updatedPipeLength} Meter`;
    }
    if (!updatedWireDiameter.endsWith("mm")) {
      formData.wireDiameter = `${updatedWireDiameter} mm`;
    }
    if (!updatedWireLength.endsWith("Meter")) {
      formData.wireLength = `${updatedWireLength} Meter`;
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
        `${config.apiURL}/pipeWiresRoute/pipewires`,
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

      // Reset the form after submission
      setFormData({
        userId,
        name: "",
        email: "",
        phoneNumber: "",
        sellerAddress: "",
        Type: "Pipes",
        pipeType: "Metalic Pipe",
        pipeBrand: "",
        pipeDiameter: "",
        pipeLength: "",
        wireBrand: "",
        wireType: "Electrical Wire",
        wireDiameter: "",
        wireLength: "",
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

  const inputStyle = { height: "50px" }; // Adjust the height for input fields

  return (
    <div
      className="container"
      style={{ width: "80%", maxWidth: "1200px", margin: "0 auto" }}
    >
      <Title
        level={1}
        style={{ textAlign: "center", marginBottom: "20px", fontWeight: "700" }}
      >
        Pipe & Wire Seller
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
              label="Type"
              name="Type"
              rules={[{ required: true, message: "Please select the type!" }]}
            >
              <Select
                value={formData.Type}
                onChange={(value) => handleChange({ Type: value })}
                style={inputStyle}
              >
                {["Pipes", "Wires"].map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Conditional Section: Pipes */}
        {formData.Type === "Pipes" && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Pipe Type"
                  name="pipeType"
                  rules={[
                    { required: true, message: "Please select the pipe type!" },
                  ]}
                >
                  <Select
                    value={formData.pipeType}
                    onChange={(value) => handleChange({ pipeType: value })}
                    style={inputStyle}
                  >
                    {["Metalic Pipe", "Wiring Pipe", "Plumbing Pipe"].map(
                      (type) => (
                        <Option key={type} value={type}>
                          {type}
                        </Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Pipe Brand"
                  name="pipeBrand"
                  rules={[
                    { required: true, message: "Please input the pipe brand!" },
                  ]}
                >
                  <Input style={inputStyle} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Pipe Diameter (Inch)"
                  name="pipeDiameter"
                  rules={[
                    {
                      required: true,
                      message: "Please input the pipe diameter!",
                    },
                  ]}
                >
                  <Input type="number" style={inputStyle} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Pipe Length (Meter)"
                  name="pipeLength"
                  rules={[
                    {
                      required: true,
                      message: "Please input the pipe length!",
                    },
                  ]}
                >
                  <Input type="number" style={inputStyle} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        {/* Conditional Section: Wires */}
        {formData.Type === "Wires" && (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Wire Type"
                  name="wireType"
                  rules={[
                    { required: true, message: "Please select the wire type!" },
                  ]}
                >
                  <Select
                    value={formData.wireType}
                    onChange={(value) => handleChange({ wireType: value })}
                    style={inputStyle}
                  >
                    {[
                      "Electrical Wire",
                      "NM Cable",
                      "UF Cable",
                      "THHN/THWN Wire",
                      "Low-Voltage Wire",
                      "Phone and Data Wire",
                      "Coaxial Cable",
                      "Speaker Wire",
                      "Armored Cable",
                    ].map((type) => (
                      <Option key={type} value={type}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Wire Brand"
                  name="wireBrand"
                  rules={[
                    { required: true, message: "Please input the wire brand!" },
                  ]}
                >
                  <Input style={inputStyle} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Wire Diameter (mm)"
                  name="wireDiameter"
                  rules={[
                    {
                      required: true,
                      message: "Please input the wire diameter!",
                    },
                  ]}
                >
                  <Input type="number" style={inputStyle} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Wire Length (Meter)"
                  name="wireLength"
                  rules={[
                    {
                      required: true,
                      message: "Please input the wire length!",
                    },
                  ]}
                >
                  <Input type="number" style={inputStyle} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

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

      {/* Modal for Image Preview */}
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      {/* Snackbar for feedback */}
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
  );
};

export default Pipe_wires;
