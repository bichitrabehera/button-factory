import React, { useState } from "react";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    customDesignFile: null,
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "customDesignFile") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement order submission logic
    alert("Order submitted: " + JSON.stringify(formData));
  };

  return (
    <div>
      <h1>Place an Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Custom Design File (optional):</label>
          <input
            type="file"
            name="customDesignFile"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Shipping Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
