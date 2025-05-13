import React, { useState } from "react";

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Fetch order status from backend using trackingNumber
    setOrderStatus("In Transit"); // Placeholder status
  };

  return (
    <div>
      <h1>Track Your Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tracking Number:</label>
          <input
            type="text"
            value={trackingNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Track</button>
      </form>
      {orderStatus && (
        <div>
          <h2>Order Status:</h2>
          <p>{orderStatus}</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
