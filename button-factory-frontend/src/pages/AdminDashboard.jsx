import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [offers, setOffers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, offersRes, inventoryRes, feedbacksRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
          fetch('/api/offers'),
          fetch('/api/inventory'),
          fetch('/api/feedbacks'),
        ]);

        if (!productsRes.ok) throw new Error('Failed to fetch products');
        if (!ordersRes.ok) throw new Error('Failed to fetch orders');
        if (!offersRes.ok) throw new Error('Failed to fetch offers');
        if (!inventoryRes.ok) throw new Error('Failed to fetch inventory');
        if (!feedbacksRes.ok) throw new Error('Failed to fetch feedbacks');

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        const offersData = await offersRes.json();
        const inventoryData = await inventoryRes.json();
        const feedbacksData = await feedbacksRes.json();

        setProducts(productsData);
        setOrders(ordersData);
        setOffers(offersData);
        setInventory(inventoryData);
        setFeedbacks(feedbacksData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading admin data...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '1rem' }}>
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>{product.name} - ${product.price.toFixed(2)}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              Order #{order._id} - Status: {order.status}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Offers</h2>
        <ul>
          {offers.map((offer) => (
            <li key={offer._id}>{offer.title} - Discount: {offer.discount}%</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Inventory</h2>
        <ul>
          {inventory.map((item) => (
            <li key={item._id}>
              {item.productName} - Stock: {item.stock}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Feedback</h2>
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb._id}>
              {fb.userName}: {fb.comment}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
