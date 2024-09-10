import React, { useState } from 'react';


const Loan= () => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    BankDearlerName: '',
    phoneNumber: '',
    Address:'',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Loan Dealers Registration Form</h2>
      
      <label htmlFor="firstName">Name *</label>
      <div className="name-fields">
        <input
          type="text"
          name="Name"
          placeholder=" Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
       
      </div>

      <label htmlFor="email">Email *</label>
      <input
        type="email"
        name="email"
        placeholder="example@example.com"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="companyName">Bank Name</label>
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
      />

      <label htmlFor="phoneNumber">Phone Number *</label>
      <input
        type="tel"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />

      <label htmlFor="productInterest">Describe Bank Loan Details</label>
      <textarea
        name="productInterest"
        value={formData.productInterest}
        onChange={handleChange}
      ></textarea>

      {/* <label htmlFor="file">Upload Profile Photo</label>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
      /> */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Loan;